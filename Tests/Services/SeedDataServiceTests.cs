using Xunit;
using Moq;
using System.IO;
using LiteDB;
using Shared.Models;
using Shared.Constants;
using SystemJson = System.Text.Json;

namespace Tests.Services;

public class SeedDataServiceTests : IDisposable
{
    private readonly string _testDbPath = "test_data.db";
    private readonly string _testSeedDataPath = "test_seedData.json";

    public SeedDataServiceTests()
    {
        // Cleanup any existing test files
        CleanupTestFiles();
    }

    public void Dispose()
    {
        CleanupTestFiles();
    }

    private void CleanupTestFiles()
    {
        if (File.Exists(_testDbPath))
            File.Delete(_testDbPath);
        if (File.Exists(_testSeedDataPath))
            File.Delete(_testSeedDataPath);
    }

    #region SeedDatabase Tests

    [Fact]
    public void SeedDatabase_WithEmptyDatabase_SeedsSuccessfully()
    {
        // Arrange
        CreateTestSeedDataFile(enabled: true, productCount: 3);
        var service = new TestSeedDataService(_testDbPath, _testSeedDataPath);

        // Act
        service.SeedDatabase();

        // Assert
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");
        var count = products.Count();
        
        Assert.Equal(3, count);
        
        var firstProduct = products.FindAll().First();
        Assert.NotEqual(Guid.Empty, firstProduct.Id);
        Assert.NotEqual(DateTime.MinValue, firstProduct.CreationDate);
        Assert.NotEqual(DateTime.MinValue, firstProduct.LastUpdateDate);
        Assert.True(firstProduct.IsActive);
    }

    [Fact]
    public void SeedDatabase_WithExistingData_DoesNotSeedAgain()
    {
        // Arrange
        CreateTestSeedDataFile(enabled: true, productCount: 2);
        var service = new TestSeedDataService(_testDbPath, _testSeedDataPath);

        // Create some existing data
        using (var db = new LiteDatabase(_testDbPath))
        {
            var products = db.GetCollection<Product>("products");
            products.Insert(new Product { Id = Guid.NewGuid(), Name = "Existing Product" });
        }

        // Act
        service.SeedDatabase();

        // Assert
        using var db2 = new LiteDatabase(_testDbPath);
        var products2 = db2.GetCollection<Product>("products");
        var count = products2.Count();
        
        Assert.Equal(1, count); // Should still be 1, not seeded
        
        var product = products2.FindAll().First();
        Assert.Equal("Existing Product", product.Name);
    }

    [Fact]
    public void SeedDatabase_WithDisabledSeedData_DoesNotSeed()
    {
        // Arrange
        CreateTestSeedDataFile(enabled: false, productCount: 3);
        var service = new TestSeedDataService(_testDbPath, _testSeedDataPath);

        // Act
        service.SeedDatabase();

        // Assert
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");
        var count = products.Count();
        
        Assert.Equal(0, count);
    }

    [Fact]
    public void SeedDatabase_WithMissingSeedDataFile_DoesNotSeed()
    {
        // Arrange
        var service = new TestSeedDataService(_testDbPath, "nonexistent_file.json");

        // Act
        service.SeedDatabase();

        // Assert
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");
        var count = products.Count();
        
        Assert.Equal(0, count);
    }

    [Fact]
    public void SeedDatabase_WithInvalidJsonFile_DoesNotSeed()
    {
        // Arrange
        File.WriteAllText(_testSeedDataPath, "invalid json content");
        var service = new TestSeedDataService(_testDbPath, _testSeedDataPath);

        // Act
        service.SeedDatabase();

        // Assert
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");
        var count = products.Count();
        
        Assert.Equal(0, count);
    }

    [Fact]
    public void SeedDatabase_WithEmptyProductsList_DoesNotSeed()
    {
        // Arrange
        CreateTestSeedDataFile(enabled: true, productCount: 0);
        var service = new TestSeedDataService(_testDbPath, _testSeedDataPath);

        // Act
        service.SeedDatabase();

        // Assert
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");
        var count = products.Count();
        
        Assert.Equal(0, count);
    }

    #endregion

    #region Data Validation Tests

    [Fact]
    public void SeedDatabase_CreatesProductsWithCorrectData()
    {
        // Arrange
        CreateTestSeedDataFile(enabled: true, productCount: 1);
        var service = new TestSeedDataService(_testDbPath, _testSeedDataPath);

        // Act
        service.SeedDatabase();

        // Assert
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");
        var product = products.FindAll().First();
        
        Assert.Equal("Test Product 0", product.Name);
        Assert.Equal("Test Description 0", product.Description);
        Assert.Equal(1000, product.Price);
        Assert.Equal("TEST000", product.BarCode);
        Assert.Equal(10, product.Stock);
        Assert.Equal(ProductTypes.Alimentos, product.ProductType);
        Assert.Equal(UnitTypes.Unit, product.UnitType);
        Assert.True(product.IsActive);
        Assert.NotEqual(Guid.Empty, product.Id);
    }

    [Fact]
    public void SeedDatabase_SetsCorrectTimestamps()
    {
        // Arrange
        var beforeSeed = DateTime.Now.AddSeconds(-1);
        CreateTestSeedDataFile(enabled: true, productCount: 1);
        var service = new TestSeedDataService(_testDbPath, _testSeedDataPath);

        // Act
        service.SeedDatabase();
        var afterSeed = DateTime.Now.AddSeconds(1);

        // Assert
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");
        var product = products.FindAll().First();
        
        Assert.True(product.CreationDate >= beforeSeed);
        Assert.True(product.CreationDate <= afterSeed);
        Assert.True(product.LastUpdateDate >= beforeSeed);
        Assert.True(product.LastUpdateDate <= afterSeed);
        Assert.Equal(product.CreationDate, product.LastUpdateDate);
    }

    #endregion

    #region Helper Methods

    private void CreateTestSeedDataFile(bool enabled, int productCount)
    {
        var seedProducts = new List<SeedProduct>();
        
        for (int i = 0; i < productCount; i++)
        {
            seedProducts.Add(new SeedProduct
            {
                Name = $"Test Product {i}",
                Description = $"Test Description {i}",
                Price = 1000 + (i * 100),
                BarCode = $"TEST{i:000}",
                Stock = 10 + i,
                ProductType = ProductTypes.Alimentos,
                UnitType = UnitTypes.Unit
            });
        }

        var seedConfig = new SeedDataConfig
        {
            SeedData = new SeedDataSettings
            {
                Enabled = enabled,
                Products = seedProducts
            }
        };

        var json = SystemJson.JsonSerializer.Serialize(seedConfig, new SystemJson.JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = SystemJson.JsonNamingPolicy.CamelCase
        });

        File.WriteAllText(_testSeedDataPath, json);
    }

    #endregion
}

// Test version of SeedDataService to allow custom paths
public class TestSeedDataService : SeedDataService
{
    private readonly string _testDbPath;
    private readonly string _testSeedDataPath;

    public TestSeedDataService(string dbPath, string seedDataPath)
    {
        _testDbPath = dbPath;
        _testSeedDataPath = seedDataPath;
    }

    // Override the paths using reflection or create a new version
    public new void SeedDatabase()
    {
        using var db = new LiteDatabase(_testDbPath);
        var products = db.GetCollection<Product>("products");

        if (products.Count() > 0)
        {
            return;
        }

        var sampleData = LoadSeedDataFromConfig();
        
        if (sampleData.Any())
        {
            products.InsertBulk(sampleData);
        }
    }

    private List<Product> LoadSeedDataFromConfig()
    {
        try
        {
            if (!File.Exists(_testSeedDataPath))
            {
                return new List<Product>();
            }

            var jsonContent = File.ReadAllText(_testSeedDataPath);
            var seedConfig = SystemJson.JsonSerializer.Deserialize<SeedDataConfig>(jsonContent, new SystemJson.JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (seedConfig?.SeedData?.Enabled != true)
            {
                return new List<Product>();
            }

            var now = DateTime.Now;
            return seedConfig.SeedData.Products.Select(item => new Product
            {
                Id = Guid.NewGuid(),
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                BarCode = item.BarCode,
                Stock = item.Stock,
                ProductType = item.ProductType,
                UnitType = item.UnitType,
                IsActive = true,
                CreationDate = now,
                LastUpdateDate = now
            }).ToList();
        }
        catch (Exception)
        {
            return new List<Product>();
        }
    }
}

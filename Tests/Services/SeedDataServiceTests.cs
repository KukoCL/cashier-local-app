using Xunit;
using Moq;
using Shared.Models;
using Shared.Constants;
using App.Interfaces;

namespace Tests.Services;

public class SeedDataServiceTests
{
    #region SeedDatabase Tests

    [Fact]
    public void SeedDatabase_WithEmptyDatabase_SeedsSuccessfully()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(false);
        mockFileService.Setup(x => x.Exists("seedData.json")).Returns(true);
        mockFileService.Setup(x => x.ReadAllText("seedData.json")).Returns(GetValidSeedDataJson());
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();

        // Assert
        mockDatabase.Verify(x => x.HasData(), Times.Once);
        mockDatabase.Verify(x => x.InsertProducts(It.Is<IEnumerable<Product>>(p => p.Count() == 2)), Times.Once);
    }

    [Fact]
    public void SeedDatabase_WithExistingData_DoesNotSeedAgain()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(true);
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();

        // Assert
        mockDatabase.Verify(x => x.HasData(), Times.Once);
        mockDatabase.Verify(x => x.InsertProducts(It.IsAny<IEnumerable<Product>>()), Times.Never);
        mockFileService.Verify(x => x.Exists(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public void SeedDatabase_WithMissingSeedDataFile_DoesNotSeed()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(false);
        mockFileService.Setup(x => x.Exists("seedData.json")).Returns(false);
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();

        // Assert
        mockDatabase.Verify(x => x.HasData(), Times.Once);
        mockDatabase.Verify(x => x.InsertProducts(It.IsAny<IEnumerable<Product>>()), Times.Never);
        mockFileService.Verify(x => x.Exists("seedData.json"), Times.Once);
    }

    [Fact]
    public void SeedDatabase_WithDisabledSeedData_DoesNotSeed()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(false);
        mockFileService.Setup(x => x.Exists("seedData.json")).Returns(true);
        mockFileService.Setup(x => x.ReadAllText("seedData.json")).Returns(GetDisabledSeedDataJson());
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();

        // Assert
        mockDatabase.Verify(x => x.HasData(), Times.Once);
        mockDatabase.Verify(x => x.InsertProducts(It.IsAny<IEnumerable<Product>>()), Times.Never);
    }

    [Fact]
    public void SeedDatabase_WithInvalidJsonFile_DoesNotSeed()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(false);
        mockFileService.Setup(x => x.Exists("seedData.json")).Returns(true);
        mockFileService.Setup(x => x.ReadAllText("seedData.json")).Returns("invalid json content");
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();

        // Assert
        mockDatabase.Verify(x => x.HasData(), Times.Once);
        mockDatabase.Verify(x => x.InsertProducts(It.IsAny<IEnumerable<Product>>()), Times.Never);
    }

    [Fact]
    public void SeedDatabase_WithEmptyProductsList_DoesNotSeed()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(false);
        mockFileService.Setup(x => x.Exists("seedData.json")).Returns(true);
        mockFileService.Setup(x => x.ReadAllText("seedData.json")).Returns(GetEmptyProductsSeedDataJson());
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();

        // Assert
        mockDatabase.Verify(x => x.HasData(), Times.Once);
        mockDatabase.Verify(x => x.InsertProducts(It.IsAny<IEnumerable<Product>>()), Times.Never);
    }

    [Fact]
    public void SeedDatabase_CreatesProductsWithCorrectData()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(false);
        mockFileService.Setup(x => x.Exists("seedData.json")).Returns(true);
        mockFileService.Setup(x => x.ReadAllText("seedData.json")).Returns(GetValidSeedDataJson());
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();

        // Assert
        mockDatabase.Verify(x => x.InsertProducts(It.Is<IEnumerable<Product>>(products => 
            products.Any(p => p.Name == "Product 1" && p.Price == 1100 && p.IsActive)
        )), Times.Once);
    }

    [Fact]
    public void SeedDatabase_SetsCorrectTimestamps()
    {
        // Arrange
        var beforeSeeding = DateTime.Now.AddSeconds(-1);
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();
        
        mockDatabase.Setup(x => x.HasData()).Returns(false);
        mockFileService.Setup(x => x.Exists("seedData.json")).Returns(true);
        mockFileService.Setup(x => x.ReadAllText("seedData.json")).Returns(GetValidSeedDataJson());
        
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Act
        service.SeedDatabase();
        var afterSeeding = DateTime.Now.AddSeconds(1);

        // Assert
        mockDatabase.Verify(x => x.InsertProducts(It.Is<IEnumerable<Product>>(products => 
            products.All(p => p.CreationDate >= beforeSeeding && p.CreationDate <= afterSeeding &&
                             p.LastUpdateDate >= beforeSeeding && p.LastUpdateDate <= afterSeeding)
        )), Times.Once);
    }

    #endregion

    #region Constructor Tests

    [Fact]
    public void Constructor_WithNullDatabaseService_ThrowsArgumentNullException()
    {
        // Arrange
        var mockFileService = new Mock<IFileService>();

        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => new SeedDataService(null!, mockFileService.Object));
    }

    [Fact]
    public void Constructor_WithNullFileService_ThrowsArgumentNullException()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();

        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => new SeedDataService(mockDatabase.Object, null!));
    }

    [Fact]
    public void Constructor_WithValidDependencies_CreatesInstance()
    {
        // Arrange
        var mockDatabase = new Mock<IDatabaseService>();
        var mockFileService = new Mock<IFileService>();

        // Act
        var service = new SeedDataService(mockDatabase.Object, mockFileService.Object);

        // Assert
        Assert.NotNull(service);
    }

    #endregion

    #region Configuration Classes Tests

    [Fact]
    public void SeedDataConfig_DefaultValues_ShouldBeCorrect()
    {
        // Act
        var config = new SeedDataConfig();

        // Assert
        Assert.NotNull(config.SeedData);
        Assert.False(config.SeedData.Enabled);
        Assert.Empty(config.SeedData.Products);
    }

    [Fact]
    public void SeedDataSettings_DefaultValues_ShouldBeCorrect()
    {
        // Act
        var settings = new SeedDataSettings();

        // Assert
        Assert.False(settings.Enabled);
        Assert.NotNull(settings.Products);
        Assert.Empty(settings.Products);
    }

    [Fact]
    public void SeedProduct_DefaultValues_ShouldBeCorrect()
    {
        // Act
        var seedProduct = new SeedProduct();

        // Assert
        Assert.Equal(string.Empty, seedProduct.Name);
        Assert.Equal(string.Empty, seedProduct.Description);
        Assert.Equal(0, seedProduct.Price);
        Assert.Equal(string.Empty, seedProduct.BarCode);
        Assert.Equal(0, seedProduct.Stock);
        Assert.Equal(string.Empty, seedProduct.ProductType);
        Assert.Equal(string.Empty, seedProduct.UnitType);
    }

    [Fact]
    public void SeedProduct_PropertySetters_ShouldWork()
    {
        // Arrange
        var seedProduct = new SeedProduct();
        
        // Act
        seedProduct.Name = "Test Product";
        seedProduct.Description = "Test Description";
        seedProduct.Price = 1500;
        seedProduct.BarCode = "TEST123";
        seedProduct.Stock = 100;
        seedProduct.ProductType = ProductTypes.Alimentos;
        seedProduct.UnitType = UnitTypes.Unit;

        // Assert
        Assert.Equal("Test Product", seedProduct.Name);
        Assert.Equal("Test Description", seedProduct.Description);
        Assert.Equal(1500, seedProduct.Price);
        Assert.Equal("TEST123", seedProduct.BarCode);
        Assert.Equal(100, seedProduct.Stock);
        Assert.Equal(ProductTypes.Alimentos, seedProduct.ProductType);
        Assert.Equal(UnitTypes.Unit, seedProduct.UnitType);
    }

    #endregion

    #region Helper Methods

    private static string GetValidSeedDataJson()
    {
        return @"{
            ""seedData"": {
                ""enabled"": true,
                ""products"": [
                    {
                        ""name"": ""Product 1"",
                        ""description"": ""Description for Product 1"",
                        ""price"": 1100,
                        ""barCode"": ""BC001"",
                        ""stock"": 11,
                        ""productType"": ""Alimentos"",
                        ""unitType"": ""Unidad""
                    },
                    {
                        ""name"": ""Product 2"",
                        ""description"": ""Description for Product 2"",
                        ""price"": 1200,
                        ""barCode"": ""BC002"",
                        ""stock"": 12,
                        ""productType"": ""Bebidas"",
                        ""unitType"": ""Caja""
                    }
                ]
            }
        }";
    }

    private static string GetDisabledSeedDataJson()
    {
        return @"{
            ""seedData"": {
                ""enabled"": false,
                ""products"": [
                    {
                        ""name"": ""Product 1"",
                        ""description"": ""Description for Product 1"",
                        ""price"": 1100,
                        ""barCode"": ""BC001"",
                        ""stock"": 11,
                        ""productType"": ""Alimentos"",
                        ""unitType"": ""Unidad""
                    }
                ]
            }
        }";
    }

    private static string GetEmptyProductsSeedDataJson()
    {
        return @"{
            ""seedData"": {
                ""enabled"": true,
                ""products"": []
            }
        }";
    }

    #endregion
}

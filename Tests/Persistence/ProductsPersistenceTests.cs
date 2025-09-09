using Persistence;
using Shared.Models;
using Shared.Constants;

namespace Tests.Persistence;

public class ProductsPersistenceTests : IDisposable
{
    private readonly string _testDbPath;
    private readonly ProductsPersistence _persistence;

    public ProductsPersistenceTests()
    {
        // Use a unique temporary database file for each test
        _testDbPath = Path.Combine(Path.GetTempPath(), $"test_db_{Guid.NewGuid()}.db");
        _persistence = new ProductsPersistence(_testDbPath);
    }

    public void Dispose()
    {
        // Clean up test database
        if (File.Exists(_testDbPath))
        {
            File.Delete(_testDbPath);
        }
    }

    private static Product CreateTestProduct(string name, string barcode)
    {
        return new Product
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = "Test Description",
            Price = 1000,
            Stock = 50,
            BarCode = barcode,
            IsActive = true,
            ProductType = ProductTypes.Alimentos,
            UnitType = UnitTypes.Unit,
            CreationDate = DateTime.Now,
            LastUpdateDate = DateTime.Now
        };
    }

    #region GetProducts Tests

    [Fact]
    public void GetProducts_EmptyDatabase_ReturnsEmptyList()
    {
        // Act
        var result = _persistence.GetProducts();

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public void GetProducts_WithActiveProducts_ReturnsOnlyActiveProducts()
    {
        // Arrange
        var activeProduct = CreateTestProduct("Active Product", "123456");
        var inactiveProduct = CreateTestProduct("Inactive Product", "789012");
        inactiveProduct.IsActive = false;

        _persistence.SaveProduct(activeProduct);
        _persistence.SaveProduct(inactiveProduct);

        // Act
        var result = _persistence.GetProducts();

        // Assert
        Assert.Single(result);
        Assert.Equal(activeProduct.Id, result[0].Id);
        Assert.Equal(activeProduct.Name, result[0].Name);
    }

    [Fact]
    public void GetProducts_ReturnsProductsOrderedByName()
    {
        // Arrange
        var productB = CreateTestProduct("B Product", "111111");
        var productA = CreateTestProduct("A Product", "222222");
        var productC = CreateTestProduct("C Product", "333333");

        _persistence.SaveProduct(productB);
        _persistence.SaveProduct(productA);
        _persistence.SaveProduct(productC);

        // Act
        var result = _persistence.GetProducts();

        // Assert
        Assert.Equal(3, result.Count);
        Assert.Equal("A Product", result[0].Name);
        Assert.Equal("B Product", result[1].Name);
        Assert.Equal("C Product", result[2].Name);
    }

    #endregion

    #region GetProductById Tests

    [Fact]
    public void GetProductById_ExistingProduct_ReturnsProduct()
    {
        // Arrange
        var product = CreateTestProduct("Test Product", "123456");
        _persistence.SaveProduct(product);

        // Act
        var result = _persistence.GetProductById(product.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(product.Id, result.Id);
        Assert.Equal(product.Name, result.Name);
        Assert.Equal(product.BarCode, result.BarCode);
    }

    [Fact]
    public void GetProductById_NonExistingProduct_ReturnsNull()
    {
        // Arrange
        var nonExistingId = Guid.NewGuid();

        // Act
        var result = _persistence.GetProductById(nonExistingId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void GetProductById_InactiveProduct_ReturnsProduct()
    {
        // Arrange
        var product = CreateTestProduct("Inactive Product", "123456");
        product.IsActive = false;
        _persistence.SaveProduct(product);

        // Act
        var result = _persistence.GetProductById(product.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(product.Id, result.Id);
        Assert.False(result.IsActive);
    }

    #endregion

    #region GetProductByBarcode Tests

    [Fact]
    public void GetProductByBarcode_ExistingActiveProduct_ReturnsProduct()
    {
        // Arrange
        var product = CreateTestProduct("Test Product", "123456");
        _persistence.SaveProduct(product);

        // Act
        var result = _persistence.GetProductByBarcode("123456");

        // Assert
        Assert.NotNull(result);
        Assert.Equal(product.Id, result.Id);
        Assert.Equal(product.BarCode, result.BarCode);
    }

    [Fact]
    public void GetProductByBarcode_NonExistingBarcode_ReturnsNull()
    {
        // Arrange
        var product = CreateTestProduct("Test Product", "123456");
        _persistence.SaveProduct(product);

        // Act
        var result = _persistence.GetProductByBarcode("999999");

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void GetProductByBarcode_InactiveProduct_ReturnsNull()
    {
        // Arrange
        var product = CreateTestProduct("Inactive Product", "123456");
        product.IsActive = false;
        _persistence.SaveProduct(product);

        // Act
        var result = _persistence.GetProductByBarcode("123456");

        // Assert
        Assert.Null(result);
    }

    #endregion

    #region SaveProduct Tests

    [Fact]
    public void SaveProduct_ValidProduct_SavesSuccessfully()
    {
        // Arrange
        var product = CreateTestProduct("New Product", "123456");

        // Act
        _persistence.SaveProduct(product);

        // Assert
        var savedProduct = _persistence.GetProductById(product.Id);
        Assert.NotNull(savedProduct);
        Assert.Equal(product.Name, savedProduct.Name);
        Assert.Equal(product.BarCode, savedProduct.BarCode);
    }

    [Fact]
    public void SaveProduct_MultipleProducts_SavesAll()
    {
        // Arrange
        var product1 = CreateTestProduct("Product 1", "111111");
        var product2 = CreateTestProduct("Product 2", "222222");

        // Act
        _persistence.SaveProduct(product1);
        _persistence.SaveProduct(product2);

        // Assert
        var allProducts = _persistence.GetProducts();
        Assert.Equal(2, allProducts.Count);
    }

    #endregion

    #region UpdateProduct Tests

    [Fact]
    public void UpdateProduct_ExistingProduct_UpdatesSuccessfully()
    {
        // Arrange
        var product = CreateTestProduct("Original Name", "123456");
        _persistence.SaveProduct(product);

        product.Name = "Updated Name";
        product.Price = 99;

        // Act
        _persistence.UpdateProduct(product);

        // Assert
        var updatedProduct = _persistence.GetProductById(product.Id);
        Assert.NotNull(updatedProduct);
        Assert.Equal("Updated Name", updatedProduct.Name);
        Assert.Equal(99, updatedProduct.Price);
    }

    #endregion

    #region UpdateProductStock Tests

    [Fact]
    public void UpdateProductStock_ExistingProduct_UpdatesStockAndDate()
    {
        // Arrange
        var product = CreateTestProduct("Test Product", "123456");
        product.Stock = 10;
        var originalDate = product.LastUpdateDate;
        _persistence.SaveProduct(product);

        // Wait a moment to ensure time difference
        Thread.Sleep(10);

        // Act
        _persistence.UpdateProductStock(product.Id, 50);

        // Assert
        var updatedProduct = _persistence.GetProductById(product.Id);
        Assert.NotNull(updatedProduct);
        Assert.Equal(50, updatedProduct.Stock);
        Assert.True(updatedProduct.LastUpdateDate > originalDate);
    }

    [Fact]
    public void UpdateProductStock_NonExistingProduct_DoesNotThrow()
    {
        // Arrange
        var nonExistingId = Guid.NewGuid();

        // Act & Assert
        var exception = Record.Exception(() => _persistence.UpdateProductStock(nonExistingId, 100));
        Assert.Null(exception);
    }

    [Fact]
    public void UpdateProductStock_ZeroStock_UpdatesSuccessfully()
    {
        // Arrange
        var product = CreateTestProduct("Test Product", "123456");
        product.Stock = 100;
        _persistence.SaveProduct(product);

        // Act
        _persistence.UpdateProductStock(product.Id, 0);

        // Assert
        var updatedProduct = _persistence.GetProductById(product.Id);
        Assert.NotNull(updatedProduct);
        Assert.Equal(0, updatedProduct.Stock);
    }

    #endregion

    #region DeleteProduct Tests

    [Fact]
    public void DeleteProduct_ExistingProduct_MarksAsInactiveAndUpdatesDate()
    {
        // Arrange
        var product = CreateTestProduct("Test Product", "123456");
        var originalDate = product.LastUpdateDate;
        _persistence.SaveProduct(product);

        // Wait a moment to ensure time difference
        Thread.Sleep(10);

        // Act
        _persistence.DeleteProduct(product.Id);

        // Assert
        var deletedProduct = _persistence.GetProductById(product.Id);
        Assert.NotNull(deletedProduct);
        Assert.False(deletedProduct.IsActive);
        Assert.True(deletedProduct.LastUpdateDate > originalDate);

        // Verify it doesn't appear in GetProducts (active products only)
        var activeProducts = _persistence.GetProducts();
        Assert.DoesNotContain(activeProducts, p => p.Id == product.Id);
    }

    [Fact]
    public void DeleteProduct_NonExistingProduct_DoesNotThrow()
    {
        // Arrange
        var nonExistingId = Guid.NewGuid();

        // Act & Assert
        var exception = Record.Exception(() => _persistence.DeleteProduct(nonExistingId));
        Assert.Null(exception);
    }

    #endregion

    #region Constructor Tests

    [Fact]
    public void Constructor_WithCustomDbPath_UsesCustomPath()
    {
        // Arrange
        var customPath = Path.Combine(Path.GetTempPath(), "custom_test.db");

        // Act
        var persistence = new ProductsPersistence(customPath);

        // Assert
        Assert.NotNull(persistence);
        
        // Clean up
        if (File.Exists(customPath))
        {
            File.Delete(customPath);
        }
    }

    [Fact]
    public void Constructor_WithNullDbPath_UsesDefaultPath()
    {
        // Act
        var persistence = new ProductsPersistence(null);

        // Assert
        Assert.NotNull(persistence);
    }

    #endregion
}

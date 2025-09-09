using Logic;
using Logic.Interfaces;
using Persistence.Interfaces;
using Shared.Models;
using Shared.Constants;

namespace Tests.Logic;

public class ProductsLogicTests
{
    private readonly Mock<IProductsPersistence> _mockPersistence;
    private readonly ProductsLogic _logic;

    public ProductsLogicTests()
    {
        _mockPersistence = new Mock<IProductsPersistence>();
        _logic = new ProductsLogic(_mockPersistence.Object);
    }

    #region GetProducts Tests

    [Fact]
    public void GetProducts_CallsPersistenceLayer()
    {
        // Arrange
        var expectedProducts = new List<Product>
        {
            new Product { Id = Guid.NewGuid(), Name = "Product 1" },
            new Product { Id = Guid.NewGuid(), Name = "Product 2" }
        };
        _mockPersistence.Setup(x => x.GetProducts()).Returns(expectedProducts);

        // Act
        var result = _logic.GetProducts();

        // Assert
        Assert.Equal(expectedProducts, result);
        _mockPersistence.Verify(x => x.GetProducts(), Times.Once);
    }

    [Fact]
    public void GetProducts_ReturnsEmptyList_WhenNoProducts()
    {
        // Arrange
        _mockPersistence.Setup(x => x.GetProducts()).Returns(new List<Product>());

        // Act
        var result = _logic.GetProducts();

        // Assert
        Assert.Empty(result);
        _mockPersistence.Verify(x => x.GetProducts(), Times.Once);
    }

    #endregion

    #region GetProductById Tests

    [Fact]
    public void GetProductById_ValidId_ReturnsProduct()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var expectedProduct = new Product { Id = productId, Name = "Test Product" };
        _mockPersistence.Setup(x => x.GetProductById(productId)).Returns(expectedProduct);

        // Act
        var result = _logic.GetProductById(productId);

        // Assert
        Assert.Equal(expectedProduct, result);
        _mockPersistence.Verify(x => x.GetProductById(productId), Times.Once);
    }

    [Fact]
    public void GetProductById_NonExistentId_ReturnsNull()
    {
        // Arrange
        var productId = Guid.NewGuid();
        _mockPersistence.Setup(x => x.GetProductById(productId)).Returns((Product?)null);

        // Act
        var result = _logic.GetProductById(productId);

        // Assert
        Assert.Null(result);
        _mockPersistence.Verify(x => x.GetProductById(productId), Times.Once);
    }

    #endregion

    #region GetProductByBarcode Tests

    [Fact]
    public void GetProductByBarcode_ValidBarcode_ReturnsProduct()
    {
        // Arrange
        var barcode = "123456789";
        var expectedProduct = new Product { BarCode = barcode, Name = "Test Product" };
        _mockPersistence.Setup(x => x.GetProductByBarcode(barcode)).Returns(expectedProduct);

        // Act
        var result = _logic.GetProductByBarcode(barcode);

        // Assert
        Assert.Equal(expectedProduct, result);
        _mockPersistence.Verify(x => x.GetProductByBarcode(barcode), Times.Once);
    }

    [Fact]
    public void GetProductByBarcode_EmptyBarcode_ThrowsArgumentException()
    {
        // Arrange
        var emptyBarcode = "";

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.GetProductByBarcode(emptyBarcode));
        Assert.Equal("Barcode cannot be empty (Parameter 'barcode')", exception.Message);
        _mockPersistence.Verify(x => x.GetProductByBarcode(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public void GetProductByBarcode_NullBarcode_ThrowsArgumentException()
    {
        // Arrange
        string? nullBarcode = null;

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.GetProductByBarcode(nullBarcode!));
        Assert.Equal("Barcode cannot be empty (Parameter 'barcode')", exception.Message);
        _mockPersistence.Verify(x => x.GetProductByBarcode(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public void GetProductByBarcode_WhitespaceBarcode_ThrowsArgumentException()
    {
        // Arrange
        var whitespaceBarcode = "   ";

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.GetProductByBarcode(whitespaceBarcode));
        Assert.Equal("Barcode cannot be empty (Parameter 'barcode')", exception.Message);
        _mockPersistence.Verify(x => x.GetProductByBarcode(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public void GetProductByBarcode_NonExistentBarcode_ReturnsNull()
    {
        // Arrange
        var barcode = "nonexistent";
        _mockPersistence.Setup(x => x.GetProductByBarcode(barcode)).Returns((Product?)null);

        // Act
        var result = _logic.GetProductByBarcode(barcode);

        // Assert
        Assert.Null(result);
        _mockPersistence.Verify(x => x.GetProductByBarcode(barcode), Times.Once);
    }

    #endregion

    #region SaveProduct Tests

    [Fact]
    public void SaveProduct_ValidProduct_SavesSuccessfully()
    {
        // Arrange
        var product = new Product
        {
            Name = "Test Product",
            Description = "Test Description",
            Price = 1000,
            BarCode = "123456",
            Stock = 10
        };

        // Act
        _logic.SaveProduct(product);

        // Assert
        Assert.NotEqual(Guid.Empty, product.Id);
        Assert.NotEqual(DateTime.MinValue, product.CreationDate);
        Assert.NotEqual(DateTime.MinValue, product.LastUpdateDate);
        // Allow small time difference due to execution time
        var timeDifference = Math.Abs((product.CreationDate - product.LastUpdateDate).TotalMilliseconds);
        Assert.True(timeDifference < 100, "Creation date and last update date should be very close");
        _mockPersistence.Verify(x => x.SaveProduct(product), Times.Once);
    }

    [Fact]
    public void SaveProduct_NullProduct_ThrowsArgumentNullException()
    {
        // Arrange
        Product? nullProduct = null;

        // Act & Assert
        var exception = Assert.Throws<ArgumentNullException>(() => _logic.SaveProduct(nullProduct!));
        Assert.Equal("product", exception.ParamName);
        _mockPersistence.Verify(x => x.SaveProduct(It.IsAny<Product>()), Times.Never);
    }

    [Fact]
    public void SaveProduct_EmptyName_ThrowsArgumentException()
    {
        // Arrange
        var product = new Product { Name = "", Price = 1000 };

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.SaveProduct(product));
        Assert.Equal("Product name cannot be empty (Parameter 'product')", exception.Message);
        _mockPersistence.Verify(x => x.SaveProduct(It.IsAny<Product>()), Times.Never);
    }

    [Fact]
    public void SaveProduct_NullName_ThrowsArgumentException()
    {
        // Arrange
        var product = new Product { Name = null!, Price = 1000 };

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.SaveProduct(product));
        Assert.Equal("Product name cannot be empty (Parameter 'product')", exception.Message);
        _mockPersistence.Verify(x => x.SaveProduct(It.IsAny<Product>()), Times.Never);
    }

    [Fact]
    public void SaveProduct_WhitespaceName_ThrowsArgumentException()
    {
        // Arrange
        var product = new Product { Name = "   ", Price = 1000 };

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.SaveProduct(product));
        Assert.Equal("Product name cannot be empty (Parameter 'product')", exception.Message);
        _mockPersistence.Verify(x => x.SaveProduct(It.IsAny<Product>()), Times.Never);
    }

    [Fact]
    public void SaveProduct_NegativePrice_ThrowsArgumentException()
    {
        // Arrange
        var product = new Product { Name = "Test Product", Price = -100 };

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.SaveProduct(product));
        Assert.Equal("Product price cannot be negative (Parameter 'product')", exception.Message);
        _mockPersistence.Verify(x => x.SaveProduct(It.IsAny<Product>()), Times.Never);
    }

    [Fact]
    public void SaveProduct_ZeroPrice_SavesSuccessfully()
    {
        // Arrange
        var product = new Product { Name = "Free Product", Price = 0 };

        // Act
        _logic.SaveProduct(product);

        // Assert
        _mockPersistence.Verify(x => x.SaveProduct(product), Times.Once);
    }

    #endregion

    #region UpdateProduct Tests

    [Fact]
    public void UpdateProduct_ValidProduct_UpdatesSuccessfully()
    {
        // Arrange
        var originalDate = DateTime.Now.AddDays(-1);
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = "Updated Product",
            Price = 1500,
            CreationDate = originalDate,
            LastUpdateDate = originalDate
        };

        // Act
        _logic.UpdateProduct(product);

        // Assert
        Assert.True(product.LastUpdateDate > originalDate);
        Assert.Equal(originalDate, product.CreationDate); // Creation date should not change
        _mockPersistence.Verify(x => x.UpdateProduct(product), Times.Once);
    }

    [Fact]
    public void UpdateProduct_NullProduct_ThrowsArgumentNullException()
    {
        // Arrange
        Product? nullProduct = null;

        // Act & Assert
        var exception = Assert.Throws<ArgumentNullException>(() => _logic.UpdateProduct(nullProduct!));
        Assert.Equal("product", exception.ParamName);
        _mockPersistence.Verify(x => x.UpdateProduct(It.IsAny<Product>()), Times.Never);
    }

    [Fact]
    public void UpdateProduct_EmptyName_ThrowsArgumentException()
    {
        // Arrange
        var product = new Product { Id = Guid.NewGuid(), Name = "", Price = 1000 };

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.UpdateProduct(product));
        Assert.Equal("Product name cannot be empty (Parameter 'product')", exception.Message);
        _mockPersistence.Verify(x => x.UpdateProduct(It.IsAny<Product>()), Times.Never);
    }

    [Fact]
    public void UpdateProduct_NegativePrice_ThrowsArgumentException()
    {
        // Arrange
        var product = new Product { Id = Guid.NewGuid(), Name = "Test Product", Price = -100 };

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.UpdateProduct(product));
        Assert.Equal("Product price cannot be negative (Parameter 'product')", exception.Message);
        _mockPersistence.Verify(x => x.UpdateProduct(It.IsAny<Product>()), Times.Never);
    }

    #endregion

    #region DeleteProduct Tests

    [Fact]
    public void DeleteProduct_ValidId_DeletesSuccessfully()
    {
        // Arrange
        var productId = Guid.NewGuid();

        // Act
        _logic.DeleteProduct(productId);

        // Assert
        _mockPersistence.Verify(x => x.DeleteProduct(productId), Times.Once);
    }

    [Fact]
    public void DeleteProduct_EmptyGuid_StillCallsPersistence()
    {
        // Arrange
        var emptyId = Guid.Empty;

        // Act
        _logic.DeleteProduct(emptyId);

        // Assert
        _mockPersistence.Verify(x => x.DeleteProduct(emptyId), Times.Once);
    }

    #endregion

    #region UpdateProductStock Tests

    [Fact]
    public void UpdateProductStock_ValidRequest_CallsPersistence()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var newStock = 100;
        var existingProduct = new Product { Id = productId, Name = "Test Product" };
        
        _mockPersistence.Setup(x => x.GetProductById(productId)).Returns(existingProduct);
        _mockPersistence.Setup(x => x.UpdateProductStock(productId, newStock));

        // Act
        _logic.UpdateProductStock(productId, newStock);

        // Assert
        _mockPersistence.Verify(x => x.GetProductById(productId), Times.Once);
        _mockPersistence.Verify(x => x.UpdateProductStock(productId, newStock), Times.Once);
    }

    [Fact]
    public void UpdateProductStock_NegativeStock_ThrowsArgumentException()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var invalidStock = -1;

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.UpdateProductStock(productId, invalidStock));
        Assert.Contains("Stock cannot be negative", exception.Message);
        _mockPersistence.Verify(x => x.UpdateProductStock(It.IsAny<Guid>(), It.IsAny<int>()), Times.Never);
    }

    [Fact]
    public void UpdateProductStock_EmptyGuid_ThrowsArgumentException()
    {
        // Arrange
        var emptyGuid = Guid.Empty;
        var validStock = 50;
        _mockPersistence.Setup(x => x.GetProductById(emptyGuid)).Returns((Product?)null);

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.UpdateProductStock(emptyGuid, validStock));
        Assert.Contains("Product not found", exception.Message);
        _mockPersistence.Verify(x => x.GetProductById(emptyGuid), Times.Once);
        _mockPersistence.Verify(x => x.UpdateProductStock(It.IsAny<Guid>(), It.IsAny<int>()), Times.Never);
    }

    [Fact]
    public void UpdateProductStock_ProductNotFound_ThrowsArgumentException()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var newStock = 75;
        _mockPersistence.Setup(x => x.GetProductById(productId)).Returns((Product?)null);

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => _logic.UpdateProductStock(productId, newStock));
        Assert.Contains("Product not found", exception.Message);
        _mockPersistence.Verify(x => x.GetProductById(productId), Times.Once);
        _mockPersistence.Verify(x => x.UpdateProductStock(It.IsAny<Guid>(), It.IsAny<int>()), Times.Never);
    }

    [Fact]
    public void UpdateProductStock_PersistenceThrowsException_PropagatesException()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var newStock = 75;
        var existingProduct = new Product { Id = productId, Name = "Test Product" };
        
        _mockPersistence.Setup(x => x.GetProductById(productId)).Returns(existingProduct);
        _mockPersistence.Setup(x => x.UpdateProductStock(productId, newStock))
            .Throws(new Exception("Database error"));

        // Act & Assert
        var exception = Assert.Throws<Exception>(() => _logic.UpdateProductStock(productId, newStock));
        Assert.Equal("Database error", exception.Message);
        _mockPersistence.Verify(x => x.GetProductById(productId), Times.Once);
        _mockPersistence.Verify(x => x.UpdateProductStock(productId, newStock), Times.Once);
    }

    #endregion

    #region Constructor Tests

    [Fact]
    public void Constructor_WithValidPersistence_CreatesLogic()
    {
        // Arrange & Act
        var logic = new ProductsLogic(_mockPersistence.Object);

        // Assert
        Assert.NotNull(logic);
    }

    #endregion
}

using App.Controllers;
using Logic.Interfaces;
using Shared.Models;
using Shared.Constants;

namespace Tests.Controllers;

public class ProductsControllerTests
{
    private readonly Mock<IProductsLogic> _mockProductsLogic;
    private readonly ProductsController _controller;

    public ProductsControllerTests()
    {
        _mockProductsLogic = new Mock<IProductsLogic>();
        _controller = new ProductsController(_mockProductsLogic.Object);
    }

    #region GetProducts Tests

    [Fact]
    public void GetProducts_ReturnsOkResult_WithListOfProducts()
    {
        // Arrange
        var expectedProducts = new List<Product>
        {
            new Product { Id = Guid.NewGuid(), Name = "Product 1", BarCode = "123456" },
            new Product { Id = Guid.NewGuid(), Name = "Product 2", BarCode = "789012" }
        };
        _mockProductsLogic.Setup(x => x.GetProducts()).Returns(expectedProducts);

        // Act
        var result = _controller.GetProducts();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var actualProducts = Assert.IsType<List<Product>>(okResult.Value);
        Assert.Equal(expectedProducts.Count, actualProducts.Count);
        _mockProductsLogic.Verify(x => x.GetProducts(), Times.Once);
    }

    [Fact]
    public void GetProducts_ThrowsException_ReturnsInternalServerError()
    {
        // Arrange
        _mockProductsLogic.Setup(x => x.GetProducts()).Throws(new Exception("Database error"));

        // Act
        var result = _controller.GetProducts();

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        _mockProductsLogic.Verify(x => x.GetProducts(), Times.Once);
    }

    #endregion

    #region GetProduct Tests

    [Fact]
    public void GetProduct_ValidId_ReturnsOkResult_WithProduct()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var expectedProduct = new Product { Id = productId, Name = "Test Product", BarCode = "123456" };
        _mockProductsLogic.Setup(x => x.GetProductById(productId)).Returns(expectedProduct);

        // Act
        var result = _controller.GetProduct(productId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var actualProduct = Assert.IsType<Product>(okResult.Value);
        Assert.Equal(expectedProduct.Id, actualProduct.Id);
        Assert.Equal(expectedProduct.Name, actualProduct.Name);
        _mockProductsLogic.Verify(x => x.GetProductById(productId), Times.Once);
    }

    [Fact]
    public void GetProduct_ProductNotFound_ReturnsNotFound()
    {
        // Arrange
        var productId = Guid.NewGuid();
        _mockProductsLogic.Setup(x => x.GetProductById(productId)).Returns((Product?)null);

        // Act
        var result = _controller.GetProduct(productId);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.NotNull(notFoundResult.Value);
        _mockProductsLogic.Verify(x => x.GetProductById(productId), Times.Once);
    }

    [Fact]
    public void GetProduct_ThrowsException_ReturnsInternalServerError()
    {
        // Arrange
        var productId = Guid.NewGuid();
        _mockProductsLogic.Setup(x => x.GetProductById(productId)).Throws(new Exception("Database error"));

        // Act
        var result = _controller.GetProduct(productId);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        _mockProductsLogic.Verify(x => x.GetProductById(productId), Times.Once);
    }

    #endregion

    #region GetProductByBarcode Tests

    [Fact]
    public void GetProductByBarcode_ValidBarcode_ReturnsOkResult_WithProduct()
    {
        // Arrange
        var barcode = "123456789";
        var expectedProduct = new Product { Id = Guid.NewGuid(), Name = "Test Product", BarCode = barcode };
        _mockProductsLogic.Setup(x => x.GetProductByBarcode(barcode)).Returns(expectedProduct);

        // Act
        var result = _controller.GetProductByBarcode(barcode);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var actualProduct = Assert.IsType<Product>(okResult.Value);
        Assert.Equal(expectedProduct.BarCode, actualProduct.BarCode);
        _mockProductsLogic.Verify(x => x.GetProductByBarcode(barcode), Times.Once);
    }

    [Fact]
    public void GetProductByBarcode_ProductNotFound_ReturnsNotFound()
    {
        // Arrange
        var barcode = "nonexistent";
        _mockProductsLogic.Setup(x => x.GetProductByBarcode(barcode)).Returns((Product?)null);

        // Act
        var result = _controller.GetProductByBarcode(barcode);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.NotNull(notFoundResult.Value);
        _mockProductsLogic.Verify(x => x.GetProductByBarcode(barcode), Times.Once);
    }

    [Fact]
    public void GetProductByBarcode_ArgumentException_ReturnsBadRequest()
    {
        // Arrange
        var barcode = "invalid";
        _mockProductsLogic.Setup(x => x.GetProductByBarcode(barcode)).Throws(new ArgumentException("Invalid barcode"));

        // Act
        var result = _controller.GetProductByBarcode(barcode);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
        Assert.NotNull(badRequestResult.Value);
        _mockProductsLogic.Verify(x => x.GetProductByBarcode(barcode), Times.Once);
    }

    [Fact]
    public void GetProductByBarcode_GeneralException_ReturnsInternalServerError()
    {
        // Arrange
        var barcode = "123456";
        _mockProductsLogic.Setup(x => x.GetProductByBarcode(barcode)).Throws(new Exception("Database error"));

        // Act
        var result = _controller.GetProductByBarcode(barcode);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        _mockProductsLogic.Verify(x => x.GetProductByBarcode(barcode), Times.Once);
    }

    #endregion

    #region SaveProduct Tests

    [Fact]
    public void SaveProduct_ValidProduct_ReturnsOkResult()
    {
        // Arrange
        var product = new Product 
        { 
            Id = Guid.NewGuid(), 
            Name = "New Product", 
            BarCode = "123456",
            Price = 1000,
            Stock = 10
        };
        _mockProductsLogic.Setup(x => x.SaveProduct(It.IsAny<Product>()));

        // Act
        var result = _controller.SaveProduct(product);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
        _mockProductsLogic.Verify(x => x.SaveProduct(product), Times.Once);
    }

    [Fact]
    public void SaveProduct_ArgumentException_ReturnsBadRequest()
    {
        // Arrange
        var product = new Product { Name = "Invalid Product" };
        _mockProductsLogic.Setup(x => x.SaveProduct(It.IsAny<Product>())).Throws(new ArgumentException("Invalid product data"));

        // Act
        var result = _controller.SaveProduct(product);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.NotNull(badRequestResult.Value);
        _mockProductsLogic.Verify(x => x.SaveProduct(product), Times.Once);
    }

    [Fact]
    public void SaveProduct_GeneralException_ReturnsInternalServerError()
    {
        // Arrange
        var product = new Product { Name = "Test Product" };
        _mockProductsLogic.Setup(x => x.SaveProduct(It.IsAny<Product>())).Throws(new Exception("Database error"));

        // Act
        var result = _controller.SaveProduct(product);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        _mockProductsLogic.Verify(x => x.SaveProduct(product), Times.Once);
    }

    #endregion

    #region UpdateProduct Tests

    [Fact]
    public void UpdateProduct_ValidProduct_ReturnsOkResult()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = new Product 
        { 
            Name = "Updated Product", 
            BarCode = "123456",
            Price = 1500,
            Stock = 15
        };
        _mockProductsLogic.Setup(x => x.UpdateProduct(It.IsAny<Product>()));

        // Act
        var result = _controller.UpdateProduct(productId, product);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
        Assert.Equal(productId, product.Id);
        _mockProductsLogic.Verify(x => x.UpdateProduct(It.Is<Product>(p => p.Id == productId)), Times.Once);
    }

    [Fact]
    public void UpdateProduct_ArgumentException_ReturnsBadRequest()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = new Product { Name = "Invalid Product" };
        _mockProductsLogic.Setup(x => x.UpdateProduct(It.IsAny<Product>())).Throws(new ArgumentException("Invalid product data"));

        // Act
        var result = _controller.UpdateProduct(productId, product);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.NotNull(badRequestResult.Value);
        _mockProductsLogic.Verify(x => x.UpdateProduct(It.IsAny<Product>()), Times.Once);
    }

    [Fact]
    public void UpdateProduct_GeneralException_ReturnsInternalServerError()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = new Product { Name = "Test Product" };
        _mockProductsLogic.Setup(x => x.UpdateProduct(It.IsAny<Product>())).Throws(new Exception("Database error"));

        // Act
        var result = _controller.UpdateProduct(productId, product);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        _mockProductsLogic.Verify(x => x.UpdateProduct(It.IsAny<Product>()), Times.Once);
    }

    #endregion

    #region DeleteProduct Tests

    [Fact]
    public void DeleteProduct_ValidId_ReturnsOkResult()
    {
        // Arrange
        var productId = Guid.NewGuid();
        _mockProductsLogic.Setup(x => x.DeleteProduct(productId));

        // Act
        var result = _controller.DeleteProduct(productId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
        _mockProductsLogic.Verify(x => x.DeleteProduct(productId), Times.Once);
    }

    [Fact]
    public void DeleteProduct_Exception_ReturnsInternalServerError()
    {
        // Arrange
        var productId = Guid.NewGuid();
        _mockProductsLogic.Setup(x => x.DeleteProduct(productId)).Throws(new Exception("Database error"));

        // Act
        var result = _controller.DeleteProduct(productId);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        _mockProductsLogic.Verify(x => x.DeleteProduct(productId), Times.Once);
    }

    #endregion

    #region Constructor Tests

    [Fact]
    public void Constructor_WithValidProductsLogic_CreatesController()
    {
        // Arrange & Act
        var controller = new ProductsController(_mockProductsLogic.Object);

        // Assert
        Assert.NotNull(controller);
    }

    #endregion
}

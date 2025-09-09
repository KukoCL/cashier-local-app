using App.Controllers;
using Shared.Constants;

namespace Tests.Controllers;

public class ProductTypesControllerTests
{
    private readonly ProductTypesController _controller;

    public ProductTypesControllerTests()
    {
        _controller = new ProductTypesController();
    }

    [Fact]
    public void GetProductTypes_ReturnsOkResult_WithAllProductTypes()
    {
        // Act
        var result = _controller.GetProductTypes();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var productTypes = Assert.IsType<string[]>(okResult.Value);
        
        Assert.Equal(ProductTypes.AllTypes.Length, productTypes.Length);
        Assert.Equal(ProductTypes.AllTypes, productTypes);
        
        // Verify specific types are included
        Assert.Contains(ProductTypes.ArticulosDeAseo, productTypes);
        Assert.Contains(ProductTypes.Alimentos, productTypes);
        Assert.Contains(ProductTypes.Bebidas, productTypes);
    }

    [Fact]
    public void Constructor_CreatesController_Successfully()
    {
        // Act
        var controller = new ProductTypesController();

        // Assert
        Assert.NotNull(controller);
    }
}

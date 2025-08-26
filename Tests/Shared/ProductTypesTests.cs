using Shared.Constants;

namespace Tests.Shared;

/// <summary>
/// Pruebas para las constantes del proyecto Shared
/// </summary>
public class ProductTypesTests
{
    [Fact]
    public void ProductTypes_Constants_ShouldHaveCorrectValues()
    {
        // Assert
        Assert.Equal("Articulos de aseo", ProductTypes.ArticulosDeAseo);
        Assert.Equal("Alimentos", ProductTypes.Alimentos);
        Assert.Equal("Bebidas", ProductTypes.Bebidas);
    }

    [Fact]
    public void ProductTypes_AllTypes_ShouldContainAllProductTypes()
    {
        // Act
        var allTypes = ProductTypes.AllTypes;

        // Assert
        Assert.NotNull(allTypes);
        Assert.Equal(3, allTypes.Length);
        Assert.Contains(ProductTypes.ArticulosDeAseo, allTypes);
        Assert.Contains(ProductTypes.Alimentos, allTypes);
        Assert.Contains(ProductTypes.Bebidas, allTypes);
    }

    [Fact]
    public void ProductTypes_AllTypes_ShouldBeInCorrectOrder()
    {
        // Act
        var allTypes = ProductTypes.AllTypes;

        // Assert
        Assert.Equal(ProductTypes.ArticulosDeAseo, allTypes[0]);
        Assert.Equal(ProductTypes.Alimentos, allTypes[1]);
        Assert.Equal(ProductTypes.Bebidas, allTypes[2]);
    }

    [Fact]
    public void ProductTypes_AllTypes_ShouldNotBeEmpty()
    {
        // Act
        var allTypes = ProductTypes.AllTypes;

        // Assert
        Assert.NotEmpty(allTypes);
        Assert.All(allTypes, type => Assert.False(string.IsNullOrWhiteSpace(type)));
    }
}

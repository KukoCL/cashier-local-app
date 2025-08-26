using Shared.Constants;

namespace Tests.Shared;

/// <summary>
/// Pruebas para las constantes de tipos de unidades
/// </summary>
public class UnitTypesTests
{
    [Fact]
    public void UnitTypes_Constants_ShouldHaveCorrectValues()
    {
        // Assert
        Assert.Equal("Unidad", UnitTypes.Unit);
        Assert.Equal("Caja", UnitTypes.Box);
        Assert.Equal("Gramos", UnitTypes.Grams);
    }

    [Fact]
    public void UnitTypes_Constants_ShouldNotBeNullOrEmpty()
    {
        // Assert
        Assert.False(string.IsNullOrWhiteSpace(UnitTypes.Unit));
        Assert.False(string.IsNullOrWhiteSpace(UnitTypes.Box));
        Assert.False(string.IsNullOrWhiteSpace(UnitTypes.Grams));
    }

    [Theory]
    [InlineData("Unit")]
    [InlineData("Box")]
    [InlineData("Grams")]
    public void UnitTypes_PropertyAccess_ShouldReturnValidStrings(string propertyName)
    {
        // Act
        var value = propertyName switch
        {
            "Unit" => UnitTypes.Unit,
            "Box" => UnitTypes.Box,
            "Grams" => UnitTypes.Grams,
            _ => throw new ArgumentException($"Unknown property: {propertyName}")
        };

        // Assert
        Assert.NotNull(value);
        Assert.NotEmpty(value);
    }
}

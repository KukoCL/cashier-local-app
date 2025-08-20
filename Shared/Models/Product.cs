using Shared.Constants;

namespace Shared.Models;

public class Product
{
    public Guid Id { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public string BarCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Price { get; set; }
    public int Stock { get; set; }
    public string ProductType { get; set; } = ProductTypes.Alimentos;
    public string UnitType { get; set; } = UnitTypes.Unit;
    public bool IsActive { get; set; } = true;
}

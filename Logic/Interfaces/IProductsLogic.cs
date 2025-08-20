using Shared.Models;

namespace Logic.Interfaces;

public interface IProductsLogic
{
    List<Product> GetProducts();
    Product? GetProductById(Guid id);
    Product? GetProductByBarcode(string barcode);
    void SaveProduct(Product product);
    void UpdateProduct(Product product);
    void DeleteProduct(Guid id);
}

using Shared.Models;

namespace Persistence.Interfaces;

public interface IProductsPersistence
{
    List<Product> GetProducts();
    Product? GetProductById(Guid id);
    Product? GetProductByBarcode(string barcode);
    void SaveProduct(Product product);
    void UpdateProduct(Product product);
    void UpdateProductStock(Guid productId, int newStock);
    void DeleteProduct(Guid id);
}

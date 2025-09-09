using Persistence.Interfaces;
using Shared.Models;
using Logic.Interfaces;

namespace Logic;

public class ProductsLogic : IProductsLogic
{
    private readonly IProductsPersistence _productsPersistence;

    public ProductsLogic(IProductsPersistence productsPersistence)
    {
        _productsPersistence = productsPersistence;
    }

    public List<Product> GetProducts()
    {
        return _productsPersistence.GetProducts();
    }

    public Product? GetProductById(Guid id)
    {
        return _productsPersistence.GetProductById(id);
    }

    public Product? GetProductByBarcode(string barcode)
    {
        if (string.IsNullOrWhiteSpace(barcode))
        {
            throw new ArgumentException("Barcode cannot be empty", nameof(barcode));
        }

        return _productsPersistence.GetProductByBarcode(barcode);
    }

    public void SaveProduct(Product product)
    {
        if (product == null)
        {
            throw new ArgumentNullException(nameof(product));
        }

        if (string.IsNullOrWhiteSpace(product.Name))
        {
            throw new ArgumentException("Product name cannot be empty", nameof(product));
        }

        if (product.Price < 0)
        {
            throw new ArgumentException("Product price cannot be negative", nameof(product));
        }

        product.Id = Guid.NewGuid();
        product.CreationDate = DateTime.Now;
        product.LastUpdateDate = DateTime.Now;

        _productsPersistence.SaveProduct(product);
    }

    public void UpdateProduct(Product product)
    {
        if (product == null)
        {
            throw new ArgumentNullException(nameof(product));
        }

        if (string.IsNullOrWhiteSpace(product.Name))
        {
            throw new ArgumentException("Product name cannot be empty", nameof(product));
        }

        if (product.Price < 0)
        {
            throw new ArgumentException("Product price cannot be negative", nameof(product));
        }

        product.LastUpdateDate = DateTime.Now;
        _productsPersistence.UpdateProduct(product);
    }

    public void UpdateProductStock(Guid productId, int newStock)
    {
        if (newStock < 0)
        {
            throw new ArgumentException("Stock cannot be negative", nameof(newStock));
        }

        var product = _productsPersistence.GetProductById(productId);
        if (product == null)
        {
            throw new ArgumentException("Product not found", nameof(productId));
        }

        _productsPersistence.UpdateProductStock(productId, newStock);
    }

    public void DeleteProduct(Guid id)
    {
        _productsPersistence.DeleteProduct(id);
    }
}

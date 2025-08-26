using LiteDB;
using Shared.Models;
using Persistence.Interfaces;

namespace Persistence;

public class ProductsPersistence : IProductsPersistence
{
    private readonly string _dbPath;

    public ProductsPersistence(string? dbPath = null)
    {
        _dbPath = dbPath ?? "data.db";
    }

    public List<Product> GetProducts()
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");
        return products.FindAll().Where(p => p.IsActive).OrderBy(p => p.Name).ToList();
    }

    public Product? GetProductById(Guid id)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");
        return products.FindById(id);
    }

    public Product? GetProductByBarcode(string barcode)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");
        return products.FindOne(p => p.BarCode == barcode && p.IsActive);
    }

    public void SaveProduct(Product product)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");
        products.Insert(product);
    }

    public void UpdateProduct(Product product)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");
        products.Update(product);
    }

    public void DeleteProduct(Guid id)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");
        var product = products.FindById(id);
        if (product != null)
        {
            product.IsActive = false;
            product.LastUpdateDate = DateTime.Now;
            products.Update(product);
        }
    }
}

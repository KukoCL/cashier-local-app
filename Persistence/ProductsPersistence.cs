using LiteDB;
using Shared.Models;
using Shared.Constants;
using Persistence.Interfaces;

namespace Persistence;

public class ProductsPersistence : IProductsPersistence
{
    private readonly string _dbPath;

    public ProductsPersistence(string? dbPath = null)
    {
        _dbPath = dbPath ?? DatabaseConstants.DefaultDatabaseFileName;
    }

    public List<Product> GetProducts()
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>(DatabaseConstants.ProductsCollectionName);
        
        // Ensure BarCode index exists for better performance
        products.EnsureIndex(x => x.BarCode);
        
        return products.FindAll().Where(p => p.IsActive).OrderBy(p => p.Name).ToList();
    }

    public Product? GetProductById(Guid id)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>(DatabaseConstants.ProductsCollectionName);
        return products.FindById(id);
    }

    public Product? GetProductByBarcode(string barcode)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>(DatabaseConstants.ProductsCollectionName);
        
        // Ensure BarCode index exists for better performance
        products.EnsureIndex(x => x.BarCode);
        
        return products.FindOne(p => p.BarCode == barcode && p.IsActive);
    }

    public void SaveProduct(Product product)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>(DatabaseConstants.ProductsCollectionName);
        
        // Ensure BarCode index exists for better performance
        products.EnsureIndex(x => x.BarCode);
        
        products.Insert(product);
    }

    public void UpdateProduct(Product product)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>(DatabaseConstants.ProductsCollectionName);
        products.Update(product);
    }

    public void DeleteProduct(Guid id)
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>(DatabaseConstants.ProductsCollectionName);
        var product = products.FindById(id);
        if (product != null)
        {
            product.IsActive = false;
            product.LastUpdateDate = DateTime.Now;
            products.Update(product);
        }
    }
}

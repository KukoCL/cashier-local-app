using LiteDB;
using Shared.Models;
using App.Interfaces;

namespace App.Services;

/// <summary>
/// Implementación de IDatabaseService usando LiteDB
/// </summary>
public class LiteDatabaseService : IDatabaseService
{
    private readonly string _dbPath;

    public LiteDatabaseService(string dbPath = "data.db")
    {
        _dbPath = dbPath;
    }

    public int GetProductCount()
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");
        return products.Count();
    }

    public void InsertProducts(IEnumerable<Product> products)
    {
        using var db = new LiteDatabase(_dbPath);
        var collection = db.GetCollection<Product>("products");
        collection.InsertBulk(products);
    }

    public bool HasData()
    {
        return GetProductCount() > 0;
    }
}

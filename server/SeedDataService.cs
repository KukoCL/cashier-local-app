using LiteDB;
using Shared.Models;

public class SeedDataService
{
    private readonly string _dbPath = "data.db";
    private readonly string _seedDataPath = "seedData.json";

    public void SeedDatabase()
    {
        using var db = new LiteDatabase(_dbPath);
        var products = db.GetCollection<Product>("products");

        // Check if database already has data
        if (products.Count() > 0)
        {
            return; // Already seeded
        }

        // Load seed data from configuration
        var sampleData = LoadSeedDataFromConfig();
        
        if (sampleData.Any())
        {
            products.InsertBulk(sampleData);
            Console.WriteLine($"✅ Database seeded with {sampleData.Count} sample products from {_seedDataPath}");
        }
        else
        {
            Console.WriteLine("ℹ️ No seed data found or seed data is disabled");
        }
    }

    private List<Product> LoadSeedDataFromConfig()
    {
        try
        {
            if (!File.Exists(_seedDataPath))
            {
                Console.WriteLine($"⚠️ Seed data file not found: {_seedDataPath}");
                return new List<Product>();
            }

            var jsonContent = File.ReadAllText(_seedDataPath);
            var seedConfig = System.Text.Json.JsonSerializer.Deserialize<SeedDataConfig>(jsonContent, new System.Text.Json.JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (seedConfig?.SeedData?.Enabled != true)
            {
                Console.WriteLine("ℹ️ Seed data is disabled in configuration");
                return new List<Product>();
            }

            var now = DateTime.Now;
            return seedConfig.SeedData.Products.Select(item => new Product
            {
                Id = Guid.NewGuid(),
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                BarCode = item.BarCode,
                Stock = item.Stock,
                ProductType = item.ProductType,
                UnitType = item.UnitType,
                IsActive = true,
                CreationDate = now,
                LastUpdateDate = now
            }).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error loading seed data: {ex.Message}");
            return new List<Product>();
        }
    }
}

public class SeedDataConfig
{
    public SeedDataSettings SeedData { get; set; } = new();
}

public class SeedDataSettings
{
    public bool Enabled { get; set; } = false;
    public List<SeedProduct> Products { get; set; } = new();
}

public class SeedProduct
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Price { get; set; }
    public string BarCode { get; set; } = string.Empty;
    public int Stock { get; set; }
    public string ProductType { get; set; } = string.Empty;
    public string UnitType { get; set; } = string.Empty;
}

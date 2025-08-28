using LiteDB;
using Shared.Models;
using App.Interfaces;

public class SeedDataService
{
    private readonly IDatabaseService _databaseService;
    private readonly IFileService _fileService;
    private readonly string _seedDataPath;

    public SeedDataService(IDatabaseService databaseService, IFileService fileService, string seedDataPath = "seedData.json")
    {
        _databaseService = databaseService ?? throw new ArgumentNullException(nameof(databaseService));
        _fileService = fileService ?? throw new ArgumentNullException(nameof(fileService));
        _seedDataPath = seedDataPath;
    }

    public void SeedDatabase()
    {
        // Check if database already has data
        if (_databaseService.HasData())
        {
            return; // Already seeded
        }

        // Load seed data from configuration
        var sampleData = LoadSeedDataFromConfig();
        
        if (sampleData.Any())
        {
            _databaseService.InsertProducts(sampleData);
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
            if (!_fileService.Exists(_seedDataPath))
            {
                Console.WriteLine($"⚠️ Seed data file not found: {_seedDataPath}");
                return new List<Product>();
            }

            var jsonContent = _fileService.ReadAllText(_seedDataPath);
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

using LiteDB;
using Persistence.Models;

public class SeedDataService
{
    private readonly string _dbPath = "data.db";
    private readonly string _seedDataPath = "seedData.json";

    public void SeedDatabase()
    {
        using var db = new LiteDatabase(_dbPath);
        var messages = db.GetCollection<MessageRecord>("messages");

        // Check if database already has data
        if (messages.Count() > 0)
        {
            return; // Already seeded
        }

        // Load seed data from configuration
        var sampleMessages = LoadSeedDataFromConfig();
        
        if (sampleMessages.Any())
        {
            // Insert sample data
            messages.InsertBulk(sampleMessages);
            Console.WriteLine($"✅ Database seeded with {sampleMessages.Count} sample messages from {_seedDataPath}");
        }
        else
        {
            Console.WriteLine("⚠️ No seed data found or seed data is disabled");
        }
    }

    private List<MessageRecord> LoadSeedDataFromConfig()
    {
        try
        {
            if (!File.Exists(_seedDataPath))
            {
                Console.WriteLine($"⚠️ Seed data file not found: {_seedDataPath}");
                return new List<MessageRecord>();
            }

            var jsonContent = File.ReadAllText(_seedDataPath);
            var seedConfig = System.Text.Json.JsonSerializer.Deserialize<SeedDataConfig>(jsonContent, new System.Text.Json.JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (seedConfig?.SeedData?.Enabled != true)
            {
                Console.WriteLine("ℹ️ Seed data is disabled in configuration");
                return new List<MessageRecord>();
            }

            var now = DateTime.Now;
            return seedConfig.SeedData.Messages.Select(msg => new MessageRecord
            {
                Id = Guid.NewGuid(),
                Message = msg.Message,
                Timestamp = now.AddMinutes(-msg.MinutesAgo)
            }).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error loading seed data: {ex.Message}");
            return new List<MessageRecord>();
        }
    }
}

public class SeedDataConfig
{
    public SeedDataSettings SeedData { get; set; } = new();
}

public class SeedDataSettings
{
    public bool Enabled { get; set; } = true;
    public List<SeedMessage> Messages { get; set; } = new();
}

public class SeedMessage
{
    public string Message { get; set; } = string.Empty;
    public int MinutesAgo { get; set; }
}

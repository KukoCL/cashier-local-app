using ElectronNET.API;
using ElectronNET.API.Entities;
using Logic;
using Logic.Interfaces;
using Persistence;
using Persistence.Interfaces;
using App.Interfaces;
using App.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddSingleton<IProductsPersistence, ProductsPersistence>();
builder.Services.AddSingleton<IProductsLogic, ProductsLogic>();
builder.Services.AddScoped<IDatabaseService, LiteDatabaseService>();
builder.Services.AddSingleton<IFileService, FileSystemService>();
builder.Services.AddSingleton<SeedDataService>();

// Add Electron.NET
builder.WebHost.UseElectron(args);

var app = builder.Build();

// Seed the database with sample data on first run (currently disabled)
var seedService = app.Services.GetRequiredService<SeedDataService>();
seedService.SeedDatabase();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

// Serve index.html for SPA
app.MapFallbackToFile("index.html");

// Start Electron App
if (HybridSupport.IsElectronActive)
{
    CreateWindow();
}

app.Run();

async void CreateWindow()
{
    var window = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
    {
        Width = 1200,
        Height = 800,
        Show = false,
        AutoHideMenuBar = true,
        WebPreferences = new WebPreferences
        {
            NodeIntegration = false,
            ContextIsolation = true
        }
    });

    window.OnReadyToShow += () => window.Show();
    window.OnClosed += () => Electron.App.Quit();
}

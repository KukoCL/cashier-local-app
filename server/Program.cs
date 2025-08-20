using ElectronNET.API;
using ElectronNET.API.Entities;
using Logic;
using Logic.Interfaces;
using Persistence;
using Persistence.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddSingleton<IMessagesPersistence, MessagesPersistence>();
builder.Services.AddSingleton<IMessagesLogic, MessagesLogic>();
builder.Services.AddSingleton<SeedDataService>();

// Add Electron.NET
builder.WebHost.UseElectron(args);

var app = builder.Build();

// Seed the database with sample data on first run
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

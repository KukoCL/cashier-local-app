# Cashier Local App - Electron.NET + Vue 3 + LiteDB

A simple hello world desktop application demonstrating the integration of:

- **Electron.NET** for cross-platform desktop app development
- **Vue 3** for reactive frontend interface
- **LiteDB** for local NoSQL database storage
- **ASP.NET Core** for backend API

## 🚀 Features

- ✅ Desktop application with modern web UI
- ✅ Real-time message storage and retrieval
- ✅ Local database (no external dependencies)
- ✅ RESTful API backend
- ✅ Responsive Vue.js frontend

## �️ Database & Seed Data

The app uses **LiteDB** for local data storage with an automatic seed data system:

### Seed Data System
- **Automatic**: Creates sample data on first run if database is empty
- **Configurable**: Edit `seedData.json` to customize sample messages
- **Optional**: Set `"Enabled": false` in `seedData.json` to disable seeding

### Database File
- **Location**: `data.db` (created automatically)
- **Ignored**: Not tracked in git (each developer starts fresh)
- **Persistent**: Data survives app restarts

### Customizing Seed Data
Edit `seedData.json`:
```json
{
  "SeedData": {
    "Enabled": true,
    "Messages": [
      {
        "message": "Your custom message here",
        "minutesAgo": 30
      }
    ]
  }
}
```

## �🛠 Technology Stack

- **Backend**: ASP.NET Core 9.0 with Electron.NET
- **Frontend**: Vue 3 with Axios for HTTP requests
- **Database**: LiteDB (embedded NoSQL database)
- **Desktop**: Electron.NET for cross-platform desktop deployment

## 📁 Project Structure

```
├── Controllers/
│   └── MessagesController.cs     # API endpoints for messages
├── wwwroot/
│   └── index.html               # Vue 3 frontend application
├── .github/
│   └── copilot-instructions.md  # Project setup instructions
├── Program.cs                   # Main application entry point
├── ElectronApp.csproj          # .NET project file
├── package.json                # NPM dependencies and scripts
├── electron.manifest.json     # Electron configuration
└── README.md                   # This file
```

## 🏃‍♂️ Getting Started

### Prerequisites

- .NET 9.0 SDK
- Node.js and npm
- Electron.NET CLI (installed automatically)

### Installation & Running

1. **Clone and navigate to the project:**
  ```bash
  cd cashier-local-app
  ```

2. **Install dependencies and run the application:**
  ```bash
  npm run install
  npm run start
  ```

3. **Access the app:**
  - The app will open in an Electron window automatically
  - Or visit http://localhost:3001 in your browser

### Building for Production

To build the desktop application for distribution:

```bash
npm run electron:build
```

This creates a distributable Windows executable in the `bin/Desktop` folder.

## 🎯 How to Use

1. **Start the application** using the instructions above
2. **Enter a message** in the text area
3. **Click "Save Message to Database"** to store it in LiteDB
4. **View saved messages** in the list below
5. **Click "Refresh Messages"** to reload from the database

## 🔧 Development

### Available Scripts

- `npm run electron:dev` - Run the app in development mode
- `npm run electron:build` - Build for Windows distribution
- `dotnet run` - Run the .NET application directly
- `dotnet build` - Build the .NET project

### API Endpoints

- `GET /api/messages` - Retrieve all saved messages
- `POST /api/messages` - Save a new message
  ```json
  {
    "message": "Your message text"
  }
  ```

### Database

The app uses LiteDB, which creates a local `data.db` file automatically. No setup required!

## 🏗 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vue 3 Frontend │◄──►│  ASP.NET Core API │◄──►│   LiteDB Storage │
│   (wwwroot/)     │    │  (Controllers/)   │    │   (data.db)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         ▲                        ▲
         │                        │
         └────────────────────────┘
              Electron.NET Host
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

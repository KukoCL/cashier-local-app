# Fennec Cashier App - Desktop Application

A professional point of sale (POS) desktop application built with modern technologies:

- **Electron.NET** for a robust cross-platform desktop experience
- **Vue 3** for a responsive and dynamic user interface
- **LiteDB** for efficient local data storage
- **ASP.NET Core** for a powerful backend API

This application is designed to help businesses manage their sales, inventory, and basic operations efficiently in a desktop environment.

## 🚀 Features

- ✅ Modern and intuitive desktop interface
- ✅ Local database for reliable data storage
- ✅ Product management and inventory tracking
- ✅ Customizable application icon
- ✅ Responsive Vue.js frontend with component-based architecture
- ✅ Secure local data storage with LiteDB
- ✅ Offline-first architecture
- ✅ Fast and efficient performance

## 💾 Data Management

The application uses **LiteDB** as its database engine, providing robust local data storage:

### Database Configuration
- **Database File**: `data.db` (created automatically)
- **Location**: Generated in the application directory
- **Persistence**: Data is preserved between application sessions
- **Git Status**: Not tracked in version control for clean development environments

### Initial Data Setup
- **Automatic Seeding**: First-run initialization with sample data
- **Configuration**: Customizable through `seedData.json`
- **Products Data**: Initial product catalog can be configured
- **Optional**: Seeding can be disabled by setting `"Enabled": false`

### Data Security
- **Local Storage**: All data stays on the local machine
- **No External Dependencies**: Works completely offline
- **Data Integrity**: Built-in LiteDB data protection

## 🛠 Technology Stack

### Backend
- **Framework**: ASP.NET Core 9.0
- **Desktop Runtime**: Electron.NET
- **Architecture**: Clean Architecture with separate Logic and Persistence layers
- **API**: RESTful endpoints with ASP.NET Core controllers

### Frontend
- **Framework**: Vue 3 with Composition API
- **State Management**: Vue stores
- **HTTP Client**: Axios for API communication
- **Build Tool**: Vite for fast development and optimized production builds

### Database
- **Engine**: LiteDB (embedded NoSQL)
- **Features**: 
  - Document-based storage
  - ACID compliance
  - Zero configuration
  - Single file database

## 📁 Project Structure

```
├── Logic/                      # Business logic layer
│   ├── Interfaces/            # Logic interfaces
│   └── ProductsLogic.cs       # Products business logic
├── Persistence/               # Data access layer
│   ├── Interfaces/           # Persistence interfaces
│   └── ProductsPersistence.cs # Data access for products
├── server/                    # Main application
│   ├── assets/               # Application assets
│   │   └── fennecIcon.ico    # Custom application icon
│   ├── Controllers/          # API controllers
│   │   └── ProductsController.cs
│   ├── Program.cs            # Application entry point
│   ├── App.csproj           # Main project file
│   ├── electron.manifest.json # Electron configuration
│   ├── seedData.json        # Initial data configuration
│   └── wwwroot/             # Built frontend assets
├── Shared/                   # Shared components
│   ├── Constants/           # Application constants
│   ├── Models/              # Data models
│   └── Enums/              # Shared enumerations
├── src/                     # Frontend source code
│   ├── components/         # Vue components
│   │   └── products/      # Product-related components
│   ├── composables/       # Vue composables
│   ├── stores/           # State management
│   ├── views/           # Page components
│   └── App.vue          # Root component
├── .github/
│   └── copilot-instructions.md
├── vite.config.ts          # Frontend build configuration
├── package.json            # NPM configuration
└── README.md              # Documentation
```

## 🏃‍♂️ Development Guide

### Prerequisites

- **.NET SDK**: Version 9.0 or later
- **Node.js**: Latest LTS version recommended
- **npm**: Included with Node.js
- **IDE**: Visual Studio 2022 or VS Code recommended

### Setup & Development

1. **Clone the repository and install dependencies:**
   ```bash
   git clone https://github.com/KukoCL/cashier-local-app.git
   cd cashier-local-app
   npm install
   ```

2. **Development Mode:**
   ```bash
   npm run start
   ```
   This will:
   - Start the development server
   - Open the Electron window
   - Enable hot-reload for frontend changes

3. **Development Options:**
   - Electron window opens automatically
   - Access http://localhost:3001 for browser debugging
   - Use Vue DevTools for component inspection

### Building for Distribution

1. **Create production build:**
   ```bash
   npm run electron:build
   ```

2. **Output Location:**
   - Windows: `server/bin/Desktop/Fennec Cashier App Setup 1.0.0.exe`
   - Includes custom application icon
   - Ready for distribution to end users

### Additional Scripts

- `npm run build`: Build frontend assets only
- `npm run dev`: Run frontend in development mode
- `npm test`: Run unit tests

This creates a distributable Windows executable in the `bin/Desktop` folder.

## 🔧 Development

### Available Scripts

- `npm run install` - Install all dependencies and setup the project
- `npm run start` - Start the application in development mode
- `npm run dev` - Start the frontend in development mode (Vue 3 + Vite)
- `npm run electron:build` - Build the desktop application for Windows distribution
- `dotnet run --project ./server/ElectronApp.csproj` - Run the .NET application directly (backend only)
- `dotnet build ./server/ElectronApp.csproj` - Build the .NET project

### API Endpoints

Currently no API endpoints implemented. Add your endpoints here:

```
// Example:
// - `GET /api/products` - Retrieve all products
// - `POST /api/products` - Create a new product
//   {
//     "name": "Product Name",
//     "price": 29.99
//   }
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

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
- ✅ **Application activation system with AWS integration**

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

## 🔐 Activation System

The application includes a robust activation system that validates users through a unique activation key. Here's how it works:

### How Activation Works

1. **First Launch**: When users first open the application, they're prompted to enter an activation key
2. **Computer Fingerprinting**: The system generates a unique fingerprint based on the user's computer characteristics
3. **AWS Validation**: The activation key and fingerprint are sent to an AWS Lambda function for validation
4. **Local Storage**: Upon successful activation, the status is stored locally for future sessions
5. **Router Protection**: All application routes are protected and require valid activation

### Activation Features

- **Unique Computer Fingerprinting**: Uses browser/system characteristics to create a unique identifier
- **AWS Lambda Integration**: Secure validation through cloud infrastructure
- **DynamoDB Storage**: Activation records are stored in AWS DynamoDB
- **Local Persistence**: Activation status is cached locally for offline use
- **Route Protection**: Navigation guards prevent access without valid activation
- **Error Handling**: Comprehensive error messaging for network and validation issues

### AWS Setup for Activation

#### Required AWS Resources

1. **AWS Lambda Function** for activation validation
2. **DynamoDB Table** for storing activation records
3. **IAM Roles** with appropriate permissions

#### Environment Configuration

Create a `.env` file in the project root with your AWS configuration:

```bash
# Copy from .env.example
cp .env.example .env
```

Update the values in `.env`:

```bash
VITE_AWS_LAMBDA_ENDPOINT=https://your-lambda-endpoint.amazonaws.com/activate
VITE_AWS_REGION=us-east-1
```

#### DynamoDB Table Schema

Create a DynamoDB table with the following structure:

```json
{
  "TableName": "CashierAppActivations",
  "KeySchema": [
    {
      "AttributeName": "activationKey",
      "KeyType": "HASH"
    }
  ],
  "AttributeDefinitions": [
    {
      "AttributeName": "activationKey",
      "AttributeType": "S"
    }
  ],
  "BillingMode": "PAY_PER_REQUEST"
}
```

#### Lambda Function Example

Here's a basic AWS Lambda function structure for handling activation:

```javascript
exports.handler = async (event) => {
    const { activationKey, computerFingerprint } = JSON.parse(event.body);
    
    // Validate activation key against DynamoDB
    // Store computer fingerprint
    // Return success/failure response
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            success: true,
            message: 'Activation successful',
            activatedAt: new Date().toISOString()
        })
    };
};
```

#### IAM Permissions

The Lambda function needs the following IAM permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem",
                "dynamodb:Query"
            ],
            "Resource": "arn:aws:dynamodb:region:account:table/CashierAppActivations"
        }
    ]
}
```

### Development Mode

For development and testing, you can temporarily bypass activation by:

1. Setting a development flag in the router guard
2. Using mock activation endpoints
3. Pre-populating localStorage with activation status

### Security Considerations

- Activation keys should be generated securely and be unique
- Computer fingerprints provide additional security but aren't foolproof
- Consider implementing activation limits per key
- Use HTTPS for all AWS communications
- Regularly rotate AWS credentials and keys

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

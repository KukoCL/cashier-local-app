# Pruebas Unitarias Backend - Cashier Local App

Este proyecto contiene pruebas unitarias completas para el backend con arquitectura basada en inyección de dependencias, cobertura de código y reportes automatizados.

## 🚀 Ejecutar Pruebas

### Opción 1: Comando npm (Recomendado)
```bash
npm run test:backend
```

### Opción 2: Script PowerShell directo
```bash
powershell -ExecutionPolicy Bypass -File .\test-coverage-backend.ps1
```

### Opción 3: Comando dotnet básico
```bash
dotnet test Tests/Tests.csproj
```

## 📊 Métricas de Cobertura Actuales

Última actualización: 25 de agosto de 2025

| Métrica | Valor | Umbral | Estado |
|---------|-------|--------|--------|
| **Line Coverage** | 100% | 80% | ✅ PASS |
| **Branch Coverage** | 100% | 80% | ✅ PASS |
| **Method Coverage** | 100% | 80% | ✅ PASS |
| **Full Method Coverage** | 100% | 80% | ✅ PASS |

**Total de Pruebas: 65**
- ✅ **65 pruebas exitosas**
- ❌ **0 pruebas fallidas**  
- ⏭️ **0 pruebas omitidas**

### Ejemplo de Salida

```
=== Ejecutando pruebas unitarias del backend ===

Ejecutando pruebas con cobertura...

=== RESUMEN DE COBERTURA ===

Metricas de Cobertura:
    Line coverage: 100%
    PASS Line coverage
    Branch coverage: 100% (14 of 14)
    PASS Branch coverage
    Method coverage: 100% (8 of 8)
    PASS Method coverage
    Full method coverage: 100% (8 of 8)
    PASS Full method coverage

Threshold requerido: 80%

Reporte HTML: TestResults/Coverage/index.html

=== Pruebas de backend completadas ===
```

## 🧪 Cobertura por Componentes

### Componentes con Pruebas Completadas
- ✅ **ProductsController** - 14 pruebas - 100% cobertura
- ✅ **ProductsLogic** - 24 pruebas - 100% cobertura
- ✅ **SeedDataService** - 15 pruebas - 100% cobertura (con inyección de dependencias)
- ✅ **Shared.Constants** - 7 pruebas - 100% cobertura
- ✅ **ProductTypes** - 4 pruebas - Validación de constantes
- ✅ **UnitTypes** - 5 pruebas - Validación de constantes

### Distribución de Pruebas por Capa
- **Controllers**: 14 pruebas (Web API)
- **Logic**: 24 pruebas (Lógica de negocio)
- **Services**: 15 pruebas (Servicios con mocks)
- **Shared**: 7 pruebas (Constantes y modelos)
- **Helpers**: 5 pruebas (Utilidades)

## 🛠️ Tecnologías y Herramientas

### Framework de Pruebas
- **xUnit** - Framework de pruebas .NET
- **Moq** - Framework de mocking para aislar dependencias
- **Microsoft.AspNetCore.Mvc.Testing** - Testing de controladores ASP.NET Core

### Cobertura de Código
- **Coverlet** - Herramienta de cobertura de código .NET
- **ReportGenerator** - Generación de reportes HTML interactivos
- **Threshold automático**: 80% para líneas, ramas y métodos

### Arquitectura de Dependencias
- **Inyección de Dependencias**: Interfaces para testabilidad
- **IDatabaseService**: Abstracción para operaciones de base de datos
- **IFileService**: Abstracción para operaciones de sistema de archivos

## 📁 Estructura de Pruebas

```
Tests/
├── Tests.csproj                     # Configuración del proyecto
├── GlobalUsings.cs                  # Imports globales (xUnit, Moq, etc.)
├── coverlet.runsettings            # Configuración de cobertura
├── Constants/
│   └── TestConstants.cs            # Constantes compartidas para pruebas
├── Controllers/
│   └── ProductsControllerTests.cs  # 14 pruebas del ProductsController
├── Logic/
│   └── ProductsLogicTests.cs       # 24 pruebas de ProductsLogic
├── Services/
│   └── SeedDataServiceTests.cs     # 15 pruebas con inyección de dependencias
├── Shared/
│   ├── ProductTypesTests.cs        # 4 pruebas de constantes ProductTypes
│   └── UnitTypesTests.cs           # 5 pruebas de constantes UnitTypes
├── Helpers/
│   └── TestDataBuilder.cs          # Builder fluido para datos de prueba
└── Mocks/
    └── MockFactory.cs              # Factory para mocks configurados
```
## 🔧 Utilidades de Testing Personalizadas

### TestDataBuilder
Builder pattern fluido para crear objetos de prueba consistentes:
```csharp
// Crear producto con valores por defecto
var product = TestDataBuilder.CreateProduct().Build();

// Crear con propiedades específicas usando método fluido
var product = TestDataBuilder.CreateProduct()
    .WithName("Mi Producto")
    .WithPrice(1500)
    .WithBarcode("123456789")
    .WithIsActive(true)
    .Build();

// Uso directo para casos simples
var validProduct = TestDataBuilder.CreateProduct().Build();
```

### MockFactory
Factory centralizado para crear mocks configurados:
```csharp
// Mock básico de IProductsPersistence
var mockPersistence = MockFactory.CreateProductsPersistence();

// Mock de IDatabaseService para SeedDataService
var mockDatabase = MockFactory.CreateDatabaseService();
var mockFileService = MockFactory.CreateFileService();

// Configuración personalizada con verificaciones
mockPersistence.Setup(x => x.GetProducts()).Returns(productList);
```

### TestConstants
Constantes centralizadas para mantener consistencia:
```csharp
// Usar constantes en lugar de valores hardcodeados
var price = TestConstants.Products.VALID_PRICE;
var invalidGuid = TestConstants.TestData.NON_EXISTENT_GUID;
var testBarcode = TestConstants.Products.TEST_BARCODE;
```

## 🧪 Patrones de Pruebas Implementados

### Arquitectura de Inyección de Dependencias
- **SeedDataService**: Refactorizado para usar `IDatabaseService` e `IFileService`
- **Pruebas con Mocks**: Sin dependencias de archivos o bases de datos reales
- **Aislamiento completo**: Cada prueba es independiente y rápida

### Patrón AAA (Arrange, Act, Assert)
Todas las pruebas siguen este patrón estricto:

```csharp
[Fact]
public void GetProduct_ValidId_ReturnsOkResult_WithProduct()
{
    // Arrange
    var productId = Guid.NewGuid();
    var expectedProduct = TestDataBuilder.CreateProduct().WithId(productId).Build();
    _mockLogic.Setup(x => x.GetProductById(productId)).Returns(expectedProduct);

    // Act
    var result = _controller.GetProduct(productId);

    // Assert
    var okResult = Assert.IsType<OkObjectResult>(result);
    var returnedProduct = Assert.IsType<Product>(okResult.Value);
    Assert.Equal(expectedProduct.Id, returnedProduct.Id);
}
```

## 📋 Comandos Útiles

### Ejecutar todas las pruebas
```bash
dotnet test Tests/Tests.csproj
```

### Ejecutar pruebas con verbosidad detallada

```bash
dotnet test Tests/Tests.csproj --verbosity normal
```

### Ejecutar pruebas con cobertura personalizada
```bash
dotnet test Tests/Tests.csproj /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura /p:CoverletOutput=../coverage/
```

### Ejecutar solo pruebas de un componente específico
```bash
# Solo ProductsController
dotnet test --filter "FullyQualifiedName~ProductsControllerTests"

# Solo ProductsLogic
dotnet test --filter "FullyQualifiedName~ProductsLogicTests"

# Solo SeedDataService
dotnet test --filter "FullyQualifiedName~SeedDataServiceTests"
```

### Generar reporte HTML de cobertura
```bash
reportgenerator -reports:"coverage/coverage.cobertura.xml" -targetdir:"coverage/report" -reporttypes:Html
```

## 📊 Cobertura Detallada por Componente

### ProductsController (14 pruebas)
Cubre todos los endpoints del Web API:

- ✅ **GetProducts()** - Obtener todos los productos
  - Caso exitoso con lista de productos
  - Manejo de excepciones internas
  
- ✅ **GetProduct(id)** - Obtener producto por ID
  - Caso exitoso con producto existente
  - Producto no encontrado (404)
  - Manejo de excepciones

- ✅ **GetProductByBarcode(barcode)** - Búsqueda por código de barras
  - Caso exitoso con producto existente
  - Producto no encontrado (404)
  - Validación de argumentos (400 BadRequest)
  - Manejo de excepciones generales (500)

- ✅ **SaveProduct(product)** - Crear nuevo producto
  - Caso exitoso (200 OK)
  - Validación de argumentos (400 BadRequest)
  - Manejo de excepciones (500)

- ✅ **UpdateProduct(product)** - Actualizar producto existente
  - Caso exitoso (200 OK)
  - Validación de argumentos (400 BadRequest)
  - Manejo de excepciones (500)

- ✅ **DeleteProduct(id)** - Eliminar producto (soft delete)
  - Caso exitoso (200 OK)
  - Manejo de excepciones (500)

- ✅ **Constructor** - Validación de inyección de dependencias

### ProductsLogic (24 pruebas)
Cubre toda la lógica de negocio con validaciones:

- ✅ **Obtención de datos**:
  - GetProducts() con y sin datos
  - GetProductById() con IDs válidos e inválidos
  - GetProductByBarcode() con códigos válidos, inválidos y casos edge

- ✅ **Validaciones de negocio**:
  - SaveProduct() con validación de datos requeridos
  - UpdateProduct() con validación de integridad
  - DeleteProduct() con validación de existencia

- ✅ **Manejo de errores**:
  - ArgumentNullException para objetos nulos
  - ArgumentException para datos inválidos
  - Validación de strings vacíos y whitespace

### SeedDataService (15 pruebas)
Pruebas completamente aisladas con mocks:

- ✅ **Configuración e inicialización**:
  - Constructor con inyección de dependencias
  - Validación de parámetros nulos

- ✅ **Lógica de poblado**:
  - Base de datos vacía → Poblar con datos
  - Base de datos existente → No poblar
  - Archivo de configuración faltante → No poblar
  - Configuración deshabilitada → No poblar
  - JSON inválido → Manejo de errores
  - Lista de productos vacía → No poblar

- ✅ **Clases de configuración**:
  - SeedDataConfig con valores por defecto
  - SeedDataSettings con propiedades correctas
  - SeedProduct con mapeo de datos

## 🎯 Convenciones y Estándares

### Nomenclatura de Pruebas
```
[MethodName]_[Scenario]_[ExpectedResult]
```

Ejemplos:
- `GetProducts_ReturnsOkResult_WithListOfProducts`
- `GetProduct_ProductNotFound_ReturnsNotFound`
- `SaveProduct_ArgumentException_ReturnsBadRequest`
- `Constructor_WithValidDependencies_CreatesInstance`

### Estructura de Pruebas
Cada prueba sigue el patrón AAA estricto:
1. **Arrange**: Configuración de datos y mocks
2. **Act**: Ejecución del método bajo prueba
3. **Assert**: Verificación de resultados y comportamientos

### Aislamiento de Dependencias
- **Uso de interfaces**: Todas las dependencias son abstractas
- **Mocks configurados**: Sin dependencias de recursos externos
- **Datos de prueba consistentes**: Uso de TestDataBuilder

## 🚀 Estado del Proyecto

### ✅ Completado
- **Arquitectura de pruebas**: Estructura modular y escalable
- **Cobertura del 100%**: En todos los componentes probados
- **Inyección de dependencias**: Arquitectura testeable implementada
- **Utilidades de testing**: TestDataBuilder, MockFactory, TestConstants
- **Automatización**: Scripts PowerShell y comandos npm
- **Reportes**: HTML interactivo con métricas detalladas

### 🎯 Decisiones Arquitectónicas
- **Omisión de pruebas de Persistencia**: Por complejidad de LiteDB y enfoque en capas críticas
- **Enfoque en capas de negocio**: Controller y Logic como prioridad
- **Mocks sobre integración**: Velocidad y confiabilidad en las pruebas
- **Exclusiones de cobertura**: Program.cs y puntos de entrada del sistema

¡El proyecto tiene una base sólida de pruebas con 100% de cobertura en los componentes críticos! 🎉

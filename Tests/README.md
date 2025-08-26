# Pruebas Unitarias Backend - Cashier Local App

Este proyecto incluye pruebas unitarias completas para el backend con reporte de cobertura y threshold de 80%.

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
| **Line Coverage** | 88.4% | 80% | ✅ PASS |
| **Branch Coverage** | 100% | 80% | ✅ PASS |
| **Method Coverage** | 87.5% | 80% | ✅ PASS |
| **Full Method Coverage** | 87.5% | 80% | ✅ PASS |

**Total de Pruebas: 49**
- ✅ **49 pruebas exitosas**
- ❌ **0 pruebas fallidas**  
- ⏭️ **0 pruebas omitidas**

El reporte incluye:

- **Threshold de 80%** para líneas, ramas y métodos
- **Reporte en consola** con colores y validación de threshold
- **Reporte HTML** interactivo en `TestResults/Coverage/index.html`
- **Métricas detalladas** por archivo y clase

### Ejemplo de Salida

```
=== Ejecutando pruebas unitarias del backend ===

Ejecutando pruebas con cobertura...

=== RESUMEN DE COBERTURA ===

Metricas de Cobertura:
  Line coverage: 32.3%
  FAIL Line coverage (requiere 80)
  Branch coverage: 12.5% (4 of 32)
  FAIL Branch coverage (requiere 80)
  Method coverage: 28% (7 of 25)
  FAIL Method coverage (requiere 80)

Threshold requerido: 80%

Reporte HTML: TestResults/Coverage/index.html
```

## 🧪 Cobertura Actual

### Componentes con Pruebas Completadas
- ✅ **ProductsController** - 18 pruebas - 100% cobertura del controller
- ✅ **ProductsLogic** - 23 pruebas - 100% cobertura de la lógica de negocio
- ✅ **SeedDataService** - 8 pruebas - 100% cobertura del servicio de datos iniciales

### Métricas del Proyecto
- **Line coverage**: 51.6% ⬆️ (gran mejora)
- **Branch coverage**: 87.5% ✅ (¡supera el threshold!)
- **Method coverage**: 46.6% (requiere mejora)

### Resumen de Pruebas
- **Total**: 49 pruebas ejecutándose correctamente
- **Distribución**:
  - 18 pruebas de Controllers (ProductsController)
  - 23 pruebas de Logic (ProductsLogic) 
  - 8 pruebas de Services (SeedDataService)

> **Nota**: La cobertura de ramas ya supera el 80%, lo que indica que estamos cubriendo bien los diferentes flujos de ejecución. Las pruebas se enfocan en las capas más críticas: Controller y Logic.

- **xUnit** - Framework de pruebas
- **Moq** - Framework de mocking para crear objetos simulados
- **Microsoft.AspNetCore.Mvc.Testing** - Herramientas para testing de ASP.NET Core

## Ejecutar las pruebas

### Ejecutar todas las pruebas
```bash
dotnet test
```

### Ejecutar pruebas con verbosidad detallada
```bash
dotnet test --verbosity normal
```

### Ejecutar pruebas con reporte de cobertura
```bash
dotnet test --collect:"XPlat Code Coverage"
```

### Ejecutar solo las pruebas del ProductsController
```bash
dotnet test --filter "FullyQualifiedName~ProductsControllerTests"
```

## 📁 Estructura de Pruebas

```
Tests/
├── Tests.csproj                    # Configuración del proyecto
├── GlobalUsings.cs                 # Imports globales
├── coverlet.runsettings           # Configuración de cobertura
├── Controllers/
│   └── ProductsControllerTests.cs  # Pruebas del ProductsController (18 pruebas)
├── Logic/
│   └── ProductsLogicTests.cs       # Pruebas de ProductsLogic (23 pruebas)
└── Services/
    └── SeedDataServiceTests.cs     # Pruebas de SeedDataService (8 pruebas)
```

## 🛠️ Tecnologías Utilizadas

- **xUnit** - Framework de pruebas .NET
- **Moq** - Framework de mocking para aislar dependencias
- **Microsoft.AspNetCore.Mvc.Testing** - Testing de controladores ASP.NET Core
- **Coverlet** - Herramienta de cobertura de código
- **ReportGenerator** - Generación de reportes HTML de cobertura
- **LiteDB** - Base de datos para pruebas (solo en SeedDataService)

### 🔧 Utilidades de Testing Personalizadas ✨

#### TestDataBuilder
Builder pattern fluido para crear objetos de prueba:
```csharp
// Crear producto válido
var product = TestDataBuilder.Products.CreateValid();

// Crear con propiedades específicas
var product = TestDataBuilder.Products.CreateWithName("Mi Producto");
var product = TestDataBuilder.Products.CreateWithPrice(1500);

// Crear lista de productos
var products = TestDataBuilder.Products.CreateList(5);
```

#### MockFactory
Factory para crear mocks configurados:
```csharp
// Mock básico de IProductsPersistence
var mockPersistence = MockFactory.CreateProductsPersistence();

// Mock con productos específicos
var products = TestDataBuilder.Products.CreateList(3);
var mockPersistence = MockFactory.CreateProductsPersistenceWithProducts(products);
```

#### TestConstants
Constantes centralizadas para pruebas:
```csharp
// Usar constantes en lugar de valores hardcodeados
var price = TestConstants.Products.VALID_PRICE;
var invalidGuid = TestConstants.TestData.NON_EXISTENT_GUID;
```

## Cobertura de pruebas

Las pruebas del `ProductsController` cubren:

- ✅ **GetProducts()** - Obtener todos los productos
  - Caso exitoso con lista de productos
  - Manejo de excepciones
  
- ✅ **GetProduct(id)** - Obtener producto por ID
  - Caso exitoso con producto existente
  - Producto no encontrado
  - Manejo de excepciones

- ✅ **GetProductByBarcode(barcode)** - Obtener producto por código de barras
  - Caso exitoso con producto existente
  - Producto no encontrado
  - Validación de argumentos (ArgumentException)
  - Manejo de excepciones generales

- ✅ **SaveProduct(product)** - Guardar nuevo producto
  - Caso exitoso
  - Validación de argumentos (ArgumentException)
  - Manejo de excepciones

- ✅ **UpdateProduct(id, product)** - Actualizar producto existente
  - Caso exitoso
  - Validación de argumentos (ArgumentException)
  - Manejo de excepciones

- ✅ **DeleteProduct(id)** - Eliminar producto
  - Caso exitoso
  - Manejo de excepciones

- ✅ **Constructor** - Validación del constructor
  - Creación exitosa con dependencias válidas

## Patrón de pruebas

Todas las pruebas siguen el patrón **AAA (Arrange, Act, Assert)**:

1. **Arrange** - Configuración de datos de prueba y mocks
2. **Act** - Ejecución del método a probar
3. **Assert** - Verificación de resultados y comportamientos esperados

## Mocking

Se utiliza **Moq** para crear mocks de la interfaz `IProductsLogic`, lo que permite:

- Aislar el controller de sus dependencias
- Simular diferentes escenarios (éxito, errores, excepciones)
- Verificar que se llamen los métodos correctos con los parámetros esperados

## Convenciones de nomenclatura

Los métodos de prueba siguen la convención:
```
[MethodName]_[Scenario]_[ExpectedResult]
```

Ejemplos:
- `GetProducts_ReturnsOkResult_WithListOfProducts`
- `GetProduct_ProductNotFound_ReturnsNotFound`
- `SaveProduct_ArgumentException_ReturnsBadRequest`

## 📈 Próximos Pasos

Para alcanzar el threshold de 80%:

1. **Crear pruebas para Logic layer**:
   - `ProductsLogicTests.cs`
   
2. **Crear pruebas para Persistence layer**:
   - `ProductsPersistenceTests.cs`

3. **Agregar pruebas de integración**:
   - Pruebas end-to-end del API

4. **Configurar CI/CD**:
   - Validación automática de threshold en PR
   - Reportes de cobertura en pipeline

## 🎯 Objetivos de Cobertura

| Métrica | Objetivo | Actual | Estado |
|---------|----------|--------|--------|
| Líneas  | 80%      | 51.6%  | ⚠️ Progreso |
| Ramas   | 80%      | 87.5%  | ✅ PASS |
| Métodos | 80%      | 46.6%  | ⚠️ Progreso |

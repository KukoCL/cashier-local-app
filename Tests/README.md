# Tests Project

Este proyecto contiene las pruebas unitarias para la aplicación Cashier Local App.

## Estructura

- `Controllers/` - Pruebas unitarias para los controllers de la API
  - `ProductsControllerTests.cs` - Pruebas para el ProductsController

## Tecnologías utilizadas

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

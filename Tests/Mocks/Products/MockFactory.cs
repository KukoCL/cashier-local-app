using Logic.Interfaces;
using Persistence.Interfaces;
using Shared.Models;

namespace Tests.Mocks.Products;

/// <summary>
/// Factory para crear mocks configurados comúnmente utilizados en pruebas
/// </summary>
public static class MockFactory
{
    /// <summary>
    /// Crea un mock de IProductsPersistence con comportamiento estándar
    /// </summary>
    public static Mock<IProductsPersistence> CreateProductsPersistence()
    {
        var mock = new Mock<IProductsPersistence>();
        
        // Configuraciones por defecto
        mock.Setup(x => x.GetProducts())
            .Returns(new List<Product>());
            
        mock.Setup(x => x.GetProductById(It.IsAny<Guid>()))
            .Returns((Product?)null);
            
        mock.Setup(x => x.GetProductByBarcode(It.IsAny<string>()))
            .Returns((Product?)null);
            
        return mock;
    }

    /// <summary>
    /// Crea un mock de IProductsLogic con comportamiento estándar
    /// </summary>
    public static Mock<IProductsLogic> CreateProductsLogic()
    {
        var mock = new Mock<IProductsLogic>();
        
        // Configuraciones por defecto
        mock.Setup(x => x.GetProducts())
            .Returns(new List<Product>());
            
        mock.Setup(x => x.GetProductById(It.IsAny<Guid>()))
            .Returns((Product?)null);
            
        mock.Setup(x => x.GetProductByBarcode(It.IsAny<string>()))
            .Returns((Product?)null);
            
        return mock;
    }

    /// <summary>
    /// Configura un mock de IProductsPersistence para devolver productos específicos
    /// </summary>
    public static Mock<IProductsPersistence> CreateProductsPersistenceWithProducts(List<Product> products)
    {
        var mock = CreateProductsPersistence();
        
        mock.Setup(x => x.GetProducts())
            .Returns(products);
            
        foreach (var product in products)
        {
            mock.Setup(x => x.GetProductById(product.Id))
                .Returns(product);
                
            mock.Setup(x => x.GetProductByBarcode(product.BarCode))
                .Returns(product);
        }
        
        return mock;
    }
}

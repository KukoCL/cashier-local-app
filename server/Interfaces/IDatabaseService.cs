using Shared.Models;

namespace App.Interfaces;

/// <summary>
/// Interfaz para abstraer el acceso a la base de datos
/// </summary>
public interface IDatabaseService
{
    /// <summary>
    /// Obtiene el conteo de productos en la base de datos
    /// </summary>
    /// <returns>Número de productos</returns>
    int GetProductCount();

    /// <summary>
    /// Inserta una lista de productos en la base de datos
    /// </summary>
    /// <param name="products">Lista de productos a insertar</param>
    void InsertProducts(IEnumerable<Product> products);

    /// <summary>
    /// Verifica si la base de datos tiene datos
    /// </summary>
    /// <returns>True si tiene datos, false si está vacía</returns>
    bool HasData();
}

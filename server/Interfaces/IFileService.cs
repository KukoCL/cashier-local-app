namespace App.Interfaces;

/// <summary>
/// Interfaz para abstraer el acceso al sistema de archivos
/// </summary>
public interface IFileService
{
    /// <summary>
    /// Verifica si un archivo existe
    /// </summary>
    /// <param name="path">Ruta del archivo</param>
    /// <returns>True si existe, false si no</returns>
    bool Exists(string path);

    /// <summary>
    /// Lee todo el contenido de un archivo como texto
    /// </summary>
    /// <param name="path">Ruta del archivo</param>
    /// <returns>Contenido del archivo</returns>
    string ReadAllText(string path);
}

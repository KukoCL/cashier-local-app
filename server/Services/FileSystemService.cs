using App.Interfaces;

namespace App.Services;

/// <summary>
/// Implementación de IFileService usando System.IO
/// </summary>
public class FileSystemService : IFileService
{
    public bool Exists(string path)
    {
        return File.Exists(path);
    }

    public string ReadAllText(string path)
    {
        return File.ReadAllText(path);
    }
}

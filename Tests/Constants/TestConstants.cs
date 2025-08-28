namespace Tests.Constants;

/// <summary>
/// Constantes utilizadas en las pruebas unitarias
/// </summary>
public static class TestConstants
{
    public static class Products
    {
        public const string VALID_NAME = "Test Product";
        public const string VALID_DESCRIPTION = "Test Description";
        public const int VALID_PRICE = 1050; // Price in cents (10.50)
        public const string VALID_BARCODE = "TEST123";
        
        public const string EMPTY_NAME = "";
        public const string WHITESPACE_NAME = "   ";
        public const string EMPTY_BARCODE = "";
        public const string WHITESPACE_BARCODE = "   ";
        
        public const int NEGATIVE_PRICE = -100;
        public const int ZERO_PRICE = 0;
    }

    public static class ErrorMessages
    {
        public const string PRODUCT_NULL = "Product cannot be null";
        public const string NAME_INVALID = "Product name cannot be null or empty";
        public const string BARCODE_INVALID = "Barcode cannot be null or empty";
        public const string PRICE_NEGATIVE = "Price cannot be negative";
    }

    public static class TestData
    {
        public static readonly Guid VALID_GUID = new("12345678-1234-1234-1234-123456789012");
        public static readonly Guid NON_EXISTENT_GUID = new("99999999-9999-9999-9999-999999999999");
        
        public const string NON_EXISTENT_BARCODE = "NONEXISTENT";
    }
}

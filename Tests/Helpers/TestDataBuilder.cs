using Shared.Models;

namespace Tests.Helpers;

/// <summary>
/// Builder pattern para crear objetos de prueba de manera fluida
/// </summary>
public static class TestDataBuilder
{
    public static class Products
    {
        public static Product CreateValid()
        {
            return new Product
            {
                Id = Guid.NewGuid(),
                Name = "Test Product",
                Description = "Test Description",
                Price = 1050, // Price is int, so 10.50 becomes 1050 (cents)
                Stock = 100,
                BarCode = "TEST123",
                IsActive = true,
                ProductType = global::Shared.Constants.ProductTypes.Alimentos,
                UnitType = global::Shared.Constants.UnitTypes.Unit,
                CreationDate = DateTime.Now,
                LastUpdateDate = DateTime.Now
            };
        }

        public static Product CreateWithName(string name)
        {
            var product = CreateValid();
            product.Name = name;
            return product;
        }

        public static Product CreateWithPrice(int price)
        {
            var product = CreateValid();
            product.Price = price;
            return product;
        }

        public static Product CreateWithBarcode(string barcode)
        {
            var product = CreateValid();
            product.BarCode = barcode;
            return product;
        }

        public static Product CreateInactive()
        {
            var product = CreateValid();
            product.IsActive = false;
            return product;
        }

        public static List<Product> CreateList(int count)
        {
            var products = new List<Product>();
            for (int i = 0; i < count; i++)
            {
                var product = CreateValid();
                product.Name = $"Product {i + 1}";
                product.BarCode = $"BC{i + 1:D3}";
                products.Add(product);
            }
            return products;
        }
    }

    public static class SeedDataJson
    {
        public static string CreateValidSeedData()
        {
            return @"{
                ""seedData"": {
                    ""enabled"": true,
                    ""products"": [
                        {
                            ""name"": ""Product 1"",
                            ""description"": ""Description for Product 1"",
                            ""price"": 1100,
                            ""barCode"": ""BC001"",
                            ""stock"": 11,
                            ""productType"": ""Alimentos"",
                            ""unitType"": ""Unidad""
                        },
                        {
                            ""name"": ""Product 2"",
                            ""description"": ""Description for Product 2"",
                            ""price"": 1200,
                            ""barCode"": ""BC002"",
                            ""stock"": 12,
                            ""productType"": ""Bebidas"",
                            ""unitType"": ""Caja""
                        }
                    ]
                }
            }";
        }

        public static string CreateDisabledSeedData()
        {
            return @"{
                ""seedData"": {
                    ""enabled"": false,
                    ""products"": [
                        {
                            ""name"": ""Product 1"",
                            ""description"": ""Description for Product 1"",
                            ""price"": 1100,
                            ""barCode"": ""BC001"",
                            ""stock"": 11,
                            ""productType"": ""Alimentos"",
                            ""unitType"": ""Unidad""
                        }
                    ]
                }
            }";
        }

        public static string CreateEmptyProductsSeedData()
        {
            return @"{
                ""seedData"": {
                    ""enabled"": true,
                    ""products"": []
                }
            }";
        }

        public static string CreateInvalidJson()
        {
            return "invalid json content";
        }
    }
}

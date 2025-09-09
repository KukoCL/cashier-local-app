using Microsoft.AspNetCore.Mvc;
using Logic.Interfaces;
using Shared.Models;
using Shared.Models.Requests;

namespace App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductsLogic _productsLogic;

    public ProductsController(IProductsLogic productsLogic)
    {
        _productsLogic = productsLogic;
    }

    [HttpGet]
    public ActionResult<List<Product>> GetProducts()
    {
        try
        {
            var products = _productsLogic.GetProducts();
            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProduct(Guid id)
    {
        try
        {
            var product = _productsLogic.GetProductById(id);
            if (product == null)
            {
                return NotFound(new { error = "Product not found" });
            }
            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet("barcode/{barcode}")]
    public ActionResult<Product> GetProductByBarcode(string barcode)
    {
        try
        {
            var product = _productsLogic.GetProductByBarcode(barcode);
            if (product == null)
            {
                return NotFound(new { error = "Product not found" });
            }
            return Ok(product);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost]
    public ActionResult SaveProduct(Product product)
    {
        try
        {
            _productsLogic.SaveProduct(product);
            return Ok(new { success = true, message = "Product saved successfully" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public ActionResult UpdateProduct(Guid id, Product product)
    {
        try
        {
            product.Id = id;
            _productsLogic.UpdateProduct(product);
            return Ok(new { success = true, message = "Product updated successfully" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPut("{id}/stock")]
    public ActionResult UpdateProductStock(Guid id, [FromBody] UpdateStockRequest request)
    {
        try
        {
            _productsLogic.UpdateProductStock(id, request.NewStock);
            return Ok(new { success = true, message = "Product stock updated successfully" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteProduct(Guid id)
    {
        try
        {
            _productsLogic.DeleteProduct(id);
            return Ok(new { success = true, message = "Product deleted successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}

using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace electro.api.rest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IEnumerable<ProductModel> GetProducts()
        {
            return _productRepository.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<ProductModel> GetProduct(Guid id)
        {
            var product = _productRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public ActionResult<ProductModel> AddProduct(ProductModel product)
        {
            var addedProduct = _productRepository.Add(product);
            return CreatedAtAction(nameof(GetProduct), new { id = addedProduct.Id }, addedProduct);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(Guid id, ProductModel product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            var existingProduct = _productRepository.GetById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            _productRepository.Update(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(Guid id)
        {
            var existingProduct = _productRepository.GetById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            _productRepository.Delete(id);
            return NoContent();
        }
    }
}

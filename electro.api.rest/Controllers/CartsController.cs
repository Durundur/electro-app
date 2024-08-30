using AutoMapper;
using electro.api.rest.ActionFilters;
using electro.api.rest.Dtos.Cart;
using electro.api.rest.Extensions;
using electro.api.rest.Models.Cart;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public CartsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> GetUserCart()
        {
            var userId = User.GetAuthenticatedUserId();
            var cart = await unitOfWork.Carts.GetUserCart(userId);
            await unitOfWork.CompleteAsync();
            var cartDto = mapper.Map<CartDto>(cart);
            return Ok(cartDto);
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyCart(CartDto verifyCartDto)
        {
            var result = await unitOfWork.Carts.VerifyCart(verifyCartDto);
            var userId = User.GetAuthenticatedUserId();
            if (User.Identity.IsAuthenticated)
            {
                var cartProducts = result.Products.Select(p => new CartProductModel()
                {
                    ProductId = p.ProductId,
                    Quantity = p.Quantity
                }).ToList();
                var cart = new CartModel()
                {
                    TotalPrice = result.TotalPrice,
                    ProductsCount = result.ProductsCount,
                    Products = cartProducts,
                };
                await unitOfWork.Carts.UpdateUserCart(cart, userId);
                await unitOfWork.CompleteAsync();
            }
            return Ok(result);
        }
    }
}
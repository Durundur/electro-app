using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Filters;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CartsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> GetUserCart()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out var userId)) return BadRequest();
            var cart = await _unitOfWork.Carts.GetUserCart(userId);
            await _unitOfWork.CompleteAsync();
            var cartDto = _mapper.Map<CartDto>(cart);
            return Ok(cartDto);
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyCart(CartDto cartDto)
        {
            var cartModel = _mapper.Map<CartModel>(cartDto);
            var response = await _unitOfWork.Carts.VerifyCart(cartModel);
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (Guid.TryParse(userIdString, out var userId))
            {
                await _unitOfWork.Carts.UpdateCart(response.Cart, userId);
                await _unitOfWork.CompleteAsync();
            }
            return Ok(_mapper.Map<CartVerificationResponseDto>(response));
        }
    }
}
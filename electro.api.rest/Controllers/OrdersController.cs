using AutoMapper;
using electro.api.rest.ActionFilters;
using electro.api.rest.Dtos;
using electro.api.rest.DTOs.Order.Order;
using electro.api.rest.DTOs.Order.OrderCreate;
using electro.api.rest.DTOs.Order.OrderOverview;
using electro.api.rest.Extensions;
using electro.api.rest.Models.Order;
using electro.api.rest.QueryFilters;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Utils.PagedResult;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController: ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public OrdersController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet]
        public async Task<IActionResult> GetUserOrdersOverview([FromQuery] PaginationFilter paginationFilter)
        {
            Guid userId = User.GetAuthenticatedUserId();
            var userOrdersQuery = unitOfWork.Orders.GetUserOrders(userId);
            var orders = await PagedResultFactory.CreatePagedResultAsync<OrderOverviewDto, OrderModel>(
                userOrdersQuery, 
                paginationFilter, 
                (items) => mapper.Map<IEnumerable<OrderOverviewDto>>(items));
            return Ok(orders);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            Guid userId = User.GetAuthenticatedUserId();
            var order = await unitOfWork.Orders.GetOrderByIdForUser(id, userId).FirstOrDefaultAsync();
            if(order != null)
            {
                return Ok(mapper.Map<OrderDto>(order));
            }
            return NotFound();
        }


        [Authorize(Roles = "Admin, User")]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto createOrderDto)
        {
            var orderModel = mapper.Map<OrderModel>(createOrderDto);
            var userId = User.GetAuthenticatedUserId();
            orderModel.UserId = userId;
            var createdOrder = await unitOfWork.Orders.CreateOrder(orderModel);
            //await unitOfWork.ProductStock.ChangeStock(createdOrder.OrderProducts);
            await unitOfWork.CompleteAsync();
            var response = new OrderCreateResponseDto
            {
                OrderId = createdOrder.Id,
                Email = createdOrder.DeliveryDetails.Recipient.Email,
            };
            return Ok(response);
        }
    }
}

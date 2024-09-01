using AutoMapper;
using electro.api.rest.ActionFilters;
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
        public async Task<IActionResult> GetUserOrdersOverview([FromQuery] PaginationParams paginationParams, [FromQuery] UserOrdersOverviewParams userOrdersOverviewParams)
        {
            Guid userId = User.GetAuthenticatedUserId();
            var userOrdersQuery = unitOfWork.Orders.GetUserOrders(userId);
            if(!String.IsNullOrEmpty(userOrdersOverviewParams.Order) && Enum.TryParse<UserOrdersOverviewSortOption>(userOrdersOverviewParams.Order, true, out var sortOptionEnum))
            {
                if(sortOptionEnum == UserOrdersOverviewSortOption.DateDesc)
                {
                    userOrdersQuery = userOrdersQuery.OrderByDescending(o => o.CreatedAt);
                }
                if (sortOptionEnum == UserOrdersOverviewSortOption.DateAsc)
                {
                    userOrdersQuery = userOrdersQuery.OrderBy(o => o.CreatedAt);
                }
                if (sortOptionEnum == UserOrdersOverviewSortOption.TotalPriceDesc)
                {
                    userOrdersQuery = userOrdersQuery
                        .OrderByDescending(o => o.Products.Sum(p => p.Price.Value * p.Quantity));
                }
                if (sortOptionEnum == UserOrdersOverviewSortOption.TotalPriceAsc)
                {
                    userOrdersQuery = userOrdersQuery
                        .OrderBy(o => o.Products.Sum(p => p.Price.Value * p.Quantity));
                }
            }
            if (!String.IsNullOrEmpty(userOrdersOverviewParams.Status) && Enum.TryParse<OrderStatus>(userOrdersOverviewParams.Status, true, out var statusOptionEnum))
            {
               userOrdersQuery = userOrdersQuery.Where(o => o.Status == statusOptionEnum);
            }
            var orders = await PagedResultFactory.CreatePagedResultAsync<OrderOverviewDto, OrderModel>(
                userOrdersQuery,
                paginationParams, 
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

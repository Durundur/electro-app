using Application.Features.Cart.GetCart;
using Application.Features.Order.CreateOrder;
using Application.Features.Order.GetOrderDetails;
using Application.Features.Order.GetOrders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType<CreateOrderResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateOrderResult>> CreateOrder([FromBody] CreateOrderCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpGet]
        [ProducesResponseType<GetOrdersResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetOrdersResult>> GetOrders([FromQuery] GetOrdersQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [ProducesResponseType<GetOrderDetailsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetOrderDetailsResult>> GetOrderDetails([FromRoute] Guid id)
        {
            var query = new GetOrderDetailsQuery
            {
                Id = id
            };
            var response = await _mediator.Send(query);
            return Ok(response);
        }

    }
}
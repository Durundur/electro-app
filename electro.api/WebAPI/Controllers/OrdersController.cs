﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using Rest.Application.Features.Order.GetOrderDetails;
using Rest.Application.Features.Order.GetOrders;
using Rest.Application.Features.Order.CreateOrder;
using Rest.Application.Features.Order.UpdateOrder;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType<CreateOrderResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CreateOrderResult>> CreateOrder([FromBody] CreateOrderCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [ProducesResponseType<UpdateOrderResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UpdateOrderResult>> UpdateOrder([FromBody] UpdateOrderCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [ProducesResponseType<GetOrdersResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetOrdersResult>> GetOrders([FromQuery] GetOrdersQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }

        [Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType<GetOrderDetailsResult>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetOrderDetailsResult>> GetOrderDetails([FromRoute] GetOrderDetailsQuery query)
        {
            var response = await _mediator.Send(query);
            return Ok(response);
        }
    }
}
using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Filters;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class OpinionsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public OpinionsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        [HttpPost("product/{productId}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> CreateOpinion(OpinionDto opinion, string productId)
        {
            if (opinion.ProductId.ToString() != productId)
            {
                return BadRequest();
            }
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Guid userId;
            if (!Guid.TryParse(userIdString, out userId))
            {
                return BadRequest();
            }
            var opinionModel = _mapper.Map<OpinionModel>(opinion);
            opinionModel.UserId = userId;
            var createdOpinion = await _unitOfWork.Opinions.CreateOpinion(opinionModel);
            await _unitOfWork.CompleteAsync();
            return Created(createdOpinion.Id.ToString(), _mapper.Map<OpinionDto>(createdOpinion));
        }

        [HttpPost("{id}/like")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> LikeOpinion(Guid id)
        {
            var opinion = await _unitOfWork.Opinions.LikeOpinionAsync(id);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<OpinionDto>(opinion));
        }

        [HttpPost("{id}/dislike")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> DislikeOpinion(Guid id)
        {
            var opinion = await _unitOfWork.Opinions.DislikeOpinionAsync(id);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<OpinionDto>(opinion));
        }


    }
}

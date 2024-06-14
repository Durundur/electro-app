using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Filters;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static electro.api.rest.Dtos.Filters;

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

        [HttpGet("product/{productId}/stats")]
        public async Task<IActionResult> GetOpinionsStats(Guid productId)
        {
            var stats = await _unitOfWork.Opinions.GetOpinionsStatsAsync(productId);
            return Ok(stats.Reverse());
        }


        [HttpGet("product/{productId}")]
        [HttpGet("product/{productId}/rating/{rating?}")]
        public async Task<IActionResult> GetOpinionsToProduct(Guid productId, int? rating, [FromQuery] PaginationFilter paginationFilter)
        {
            var validPaginationFilter = new PaginationFilter(paginationFilter.PageNumber, paginationFilter.PageSize);
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IQueryable<OpinionModel> opinions = _unitOfWork.Opinions.GetOpinions(productId);

            if (rating.HasValue)
            {
                opinions = opinions.Where(o => Math.Ceiling(o.Rating) == rating.Value);
            }
            opinions = opinions.OrderByDescending(o => o.CreatedAt);
            var pagedOpinions = PagedDto<OpinionModel>.ToPagedDto(opinions, validPaginationFilter);
            var opinionsDto = _mapper.Map<IEnumerable<OpinionDto>>(pagedOpinions.Data);
            foreach (var opinion in opinionsDto)
            {
                var userAction = opinions
                    .FirstOrDefault(o => o.Id == opinion.Id)?
                    .OpinionsActions
                    .FirstOrDefault(oa => oa.UserId.ToString() == userIdString)?.ActionType;
                opinion.UserAction = userAction?.ToString();
            }
            var stats = await _unitOfWork.Opinions.GetOpinionsStatsAsync(productId);
            var opinionsResponse = new PagedDto<OpinionDto>(opinionsDto, validPaginationFilter.PageNumber, validPaginationFilter.PageSize, pagedOpinions.TotalItems);
            return Ok(new { stats = stats.Reverse(), opinions = opinionsResponse });
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
            var createdOpinion = await _unitOfWork.Opinions.CreateOpinionAsync(opinionModel);
            await _unitOfWork.CompleteAsync();
            return Created(createdOpinion.Id.ToString(), _mapper.Map<OpinionDto>(createdOpinion));
        }

        [HttpPost("{id}/{actionType}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> RateOpinion(Guid id, OpinionActionType actionType)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out Guid userId))
            {
                return BadRequest();
            }
            var opinion = await _unitOfWork.Opinions.RateOpinionAsync(id, userId, actionType);
            await _unitOfWork.CompleteAsync();
            var opinionDto = _mapper.Map<OpinionDto>(opinion);
            opinionDto.UserAction = actionType.ToString();
            return Ok(opinionDto);
        }

    }
}

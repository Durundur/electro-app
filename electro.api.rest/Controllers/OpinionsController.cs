using AutoMapper;
using electro.api.rest.ActionFilters;
using electro.api.rest.DTOs.Opinion;
using electro.api.rest.Extensions;
using electro.api.rest.Models.Opinion;
using electro.api.rest.QueryFilters;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Utils.PagedResult;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class OpinionsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public OpinionsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("product/{productId}/stats")]
        public async Task<IActionResult> GetOpinionsStats(Guid productId)
        {
            var stats = await unitOfWork.Opinions.GetOpinionsStatsAsync(productId);
            return Ok(stats.Reverse());
        }


        [HttpGet("product/{productId}")]
        [HttpGet("product/{productId}/rating/{rating?}")]
        public async Task<IActionResult> GetOpinionsToProduct(Guid productId, int? rating, [FromQuery] PaginationParams paginationParams)
        {
            IQueryable<OpinionModel> opinions = unitOfWork.Opinions.GetOpinions(productId);

            if (rating.HasValue)
            {
                opinions = opinions.Where(o => Math.Ceiling(o.Rating) == rating.Value);
            }
            opinions = opinions.OrderByDescending(o => o.CreatedAt);

            var pagedOpinionsResponse = await PagedResultFactory.CreatePagedResultAsync<OpinionDto, OpinionModel>(
                opinions,
                paginationParams,
                (items) => mapper.Map<IEnumerable<OpinionDto>>(items));

            if (User.Identity.IsAuthenticated)
            {
                var userId = User.GetAuthenticatedUserId();
                foreach (var opinion in pagedOpinionsResponse.Data)
                {
                    var userAction = opinions
                        .FirstOrDefault(o => o.Id == opinion.Id)?
                        .OpinionsActions
                        .FirstOrDefault(oa => oa.UserId == userId)?.ActionType;
                    opinion.UserAction = userAction?.ToString();
                }
            }
            
            var stats = await unitOfWork.Opinions.GetOpinionsStatsAsync(productId);
            
            return Ok(new { stats = stats.Reverse(), opinions = pagedOpinionsResponse });
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
            var opinionModel = mapper.Map<OpinionModel>(opinion);
            opinionModel.UserId = userId;
            var createdOpinion = await unitOfWork.Opinions.CreateOpinionAsync(opinionModel);
            await unitOfWork.CompleteAsync();
            return Created(createdOpinion.Id.ToString(), mapper.Map<OpinionDto>(createdOpinion));
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
            var opinion = await unitOfWork.Opinions.RateOpinionAsync(id, userId, actionType);
            await unitOfWork.CompleteAsync();
            var opinionDto = mapper.Map<OpinionDto>(opinion);
            opinionDto.UserAction = actionType.ToString();
            return Ok(opinionDto);
        }

    }
}

using Application.Exceptions;
using Application.Services.OpinionService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Opinions.GetProductOpinions
{
    public class GetProductOpinionsHandler : IRequestHandler<GetProductOpinionsQuery, GetProductOpinionsResult>
    {
        private readonly IOpinionService _opinionService;
        private readonly IUserContext _userContext;

        public GetProductOpinionsHandler(IOpinionService opinionService, IUserContext userContext)
        {
            _opinionService = opinionService;
            _userContext = userContext;
        }

        public async Task<GetProductOpinionsResult> Handle(GetProductOpinionsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var (opinions, totalOpinions) = await _opinionService.GetProductOpinionsAsync(request.ProductId, request.Page, request.PageSize, request.Rating, cancellationToken);

                Guid? userId = _userContext.IsAuthenticated ? _userContext.UserId : null;

                return new GetProductOpinionsResult(
                    GetProductOpinionsMapper.MapToGetGetProductOpinionsResultOpinion(opinions, userId).ToList(),
                    totalOpinions,
                    request.Page,
                    request.PageSize
                );
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get product opinions", ex);
            }
        }
    }
}

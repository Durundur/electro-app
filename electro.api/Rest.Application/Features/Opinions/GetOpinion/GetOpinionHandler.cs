using Application.Exceptions;
using Application.Services.OpinionService;
using Application.Services.UserContext;
using MediatR;

namespace Rest.Application.Features.Opinions.GetOpinion
{
    public class GetOpinionHandler : IRequestHandler<GetOpinionQuery, GetOpinionResult>
    {
        private readonly IOpinionService _opinionService;
        private readonly IUserContext _userContext;
        
        public GetOpinionHandler(IOpinionService opinionService, IUserContext userContext)
        {
            _userContext = userContext;
            _opinionService = opinionService;
        }

        public async Task<GetOpinionResult> Handle(GetOpinionQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var opinion = await _opinionService.GetOpinionByIdAsync(request.Id, cancellationToken);

                Guid? userId = _userContext.IsAuthenticated ? _userContext.UserId : null;

                return GetOpinionMapper.MapToGetOpinionResult(opinion, userId);
            }
            catch (Exception ex)
            {
                throw new BadRequestException($"Failed to get opinion", ex);
            }
        }
    }
}
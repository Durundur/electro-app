using Application.Features.Shared.Pagination;
using MediatR;
using System.Text.Json.Serialization;

namespace Application.Features.Opinions.GetProductOpinions
{
    public class GetProductOpinionsQuery : PaginationQuery, IRequest<GetProductOpinionsResult>
    {
        [JsonIgnore]
        public Guid ProductId { get; set; }
        public int? Rating { get; set; }
    }
}

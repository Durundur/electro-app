using MediatR;
using Rest.Application.Features.Shared.Pagination;
using System.Text.Json.Serialization;

namespace Rest.Application.Features.Opinions.GetProductOpinions
{
    public class GetProductOpinionsQuery : PaginationQuery, IRequest<GetProductOpinionsResult>
    {
        [JsonIgnore]
        public Guid ProductId { get; set; }
        public int? Rating { get; set; }
    }
}

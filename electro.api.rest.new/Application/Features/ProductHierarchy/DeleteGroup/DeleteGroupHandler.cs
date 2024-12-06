using Application.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.DeleteGroup
{
    public class DeleteGroupHandler : IRequestHandler<DeleteGroupCommand, bool>
    {
        private readonly IProductHierarchyRepository _repository;

        public DeleteGroupHandler(IProductHierarchyRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            var group = await _repository.GetGroupByIdAsync(request.Id);

            if (group == null)
            {
                throw new Exception($"Group with ID {request.Id} not found");
            }

            _repository.DeleteGroup(group);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}

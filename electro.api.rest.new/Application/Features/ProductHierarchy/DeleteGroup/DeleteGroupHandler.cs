﻿using Application.Reposiotories;
using MediatR;

namespace Application.Features.ProductHierarchy.DeleteGroup
{
    public class DeleteGroupHandler : IRequestHandler<DeleteGroupCommand, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteGroupHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            var group = await _unitOfWork.ProductHierarchyRepository.GetGroupByIdAsync(request.Id);

            if (group == null)
            {
                throw new Exception($"Group with ID {request.Id} not found");
            }

            _unitOfWork.ProductHierarchyRepository.DeleteGroup(group);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

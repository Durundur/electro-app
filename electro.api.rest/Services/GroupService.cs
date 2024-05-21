using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Services.Interfaces;

namespace electro.api.rest.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IMapper _mapper;

        public GroupService(IGroupRepository groupRepository, IMapper mapper)
        {
            _groupRepository = groupRepository;
            _mapper = mapper;
        }
        public IEnumerable<GroupDto> GetAllGroups()
        {
            var groups = _groupRepository.GetGroups().ToArray();
            return _mapper.Map<IEnumerable<GroupDto>>(groups);
        }

        public GroupDto CreateGroup(GroupDto group)
        {
            var groupModel = _mapper.Map<GroupModel>(group);
            groupModel.Categories = group.Categories.Select(c => _groupRepository.GetCategoryById(c.Id.GetValueOrDefault())).ToArray();
            _groupRepository.CreateGroup(groupModel);
            return _mapper.Map<GroupDto>(groupModel);
        }
        //naprawa podczas dodawania do pustego kategorii
        //czy w repository powinno byc sprawdzanie czy np. istnieje
        public GroupDto UpdateGroup(GroupDto group)
        {
            var oldCategories = _groupRepository.GetCategories().Where(c => c.GroupId == group.Id).ToArray();
            foreach(var category in oldCategories)
            {
                category.GroupId = null;
                _groupRepository.UpdateCategory(category);
            }
            var groupModel = _mapper.Map<GroupModel>(group);
            groupModel.Categories = groupModel.Categories.Select(c => _groupRepository.GetCategoryById(c.Id)).ToArray();
            _groupRepository.UpdateGroup(groupModel);
            return _mapper.Map<GroupDto>(groupModel);
        }

        public bool DeleteGroup(int id)
        {
            return _groupRepository.DeleteGroup(id);
        }


        public IEnumerable<CategoryDto> GetAllCategories()
        {
            var categories = _groupRepository.GetCategories().ToArray();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public IEnumerable<CategoryDto> GetFreeCategories()
        {
            var categories = _groupRepository.GetCategories().Where(c => c.GroupId == null).ToArray();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public IEnumerable<SubCategoryDto> GetFreeSubCategories()
        {
            var categories = _groupRepository.GetSubCategories().Where(c => c.CategoryId == null).ToArray();
            return _mapper.Map<IEnumerable<SubCategoryDto>>(categories);
        }

        public IEnumerable<SubCategoryDto> GetAllSubCategories()
        {
            var subCategories = _groupRepository.GetSubCategories().ToArray();
            return _mapper.Map<IEnumerable<SubCategoryDto>>(subCategories);
        }

       


        public CategoryDto CreateCategory(CategoryDto category)
        {
            var categoryModel = _groupRepository.CreateCategory(_mapper.Map<CategoryModel>(category));
            if(category.SubCategories != null)
            {
                foreach (var subCategory in category.SubCategories)
                {
                    var subCategoryModel = _mapper.Map<SubCategoryModel>(subCategory);
                    subCategoryModel.CategoryId = categoryModel.Id;
                    categoryModel.SubCategories.Append(_groupRepository.UpdateSubCategory(subCategoryModel));
                }
            }
            
            return _mapper.Map<CategoryDto>(categoryModel);
        }

        public SubCategoryDto CreateSubCategory(SubCategoryDto subCategory)
        {
            var subCategoryModel = _groupRepository.CreateSubCategory(_mapper.Map<SubCategoryModel>(subCategory));
            return _mapper.Map<SubCategoryDto>(subCategoryModel);
        }  

        public bool DeleteCategory(int id)
        {
            return _groupRepository.DeleteCategory(id);
        }
        public bool DeleteSubCategory(int id)
        {
            return _groupRepository.DeleteSubCategory(id);
        }

        

        public CategoryDto UpdateCategory(CategoryDto category)
        {
            var categoryModel = _groupRepository.UpdateCategory(_mapper.Map<CategoryModel>(category));

            foreach (var subCategoryOld in categoryModel.SubCategories)
            {
                subCategoryOld.CategoryId = null;
            }
            if(category.SubCategories != null)
            {
                foreach (var subCategory in category.SubCategories)
                {
                    var subCategoryModel = _mapper.Map<SubCategoryModel>(subCategory);
                    subCategoryModel.CategoryId = categoryModel.Id;
                    _groupRepository.UpdateSubCategory(subCategoryModel);
                }
            }
            
            return _mapper.Map<CategoryDto>(categoryModel);
        }

        public SubCategoryDto UpdateSubCategory(SubCategoryDto subCategory)
        {
            var subCategoryModel = _groupRepository.UpdateSubCategory(_mapper.Map<SubCategoryModel>(subCategory));
            return _mapper.Map<SubCategoryDto>(subCategoryModel);
        }
    }
}

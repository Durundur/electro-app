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

        public GroupDto AddGroup(GroupDto group)
        {
            var groupModel = _groupRepository.AddGroup(_mapper.Map<GroupModel>(group));
            if(group.Categories != null) {
                foreach (var category in group.Categories)
                {
                    var categoryModel = _mapper.Map<CategoryModel>(category);
                    categoryModel.GroupId = groupModel.Id;
                    groupModel.Categories.Append(_groupRepository.UpdateCategory(categoryModel));
                }
            }
            return _mapper.Map<GroupDto>(groupModel);
        }

        public CategoryDto AddCategory(CategoryDto category)
        {
            var categoryModel = _groupRepository.AddCategory(_mapper.Map<CategoryModel>(category));
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

        public SubCategoryDto AddSubCategory(SubCategoryDto subCategory)
        {
            var subCategoryModel = _groupRepository.AddSubCategory(_mapper.Map<SubCategoryModel>(subCategory));
            return _mapper.Map<SubCategoryDto>(subCategoryModel);
        }

        public IEnumerable<GroupDto>GetAll()
        {
            var groupModels = _groupRepository.GetAll();
            return _mapper.Map<IEnumerable<GroupDto>>(groupModels);
        }

        public bool DeleteGroup(int id)
        {
            return _groupRepository.DeleteGroup(id);
        }

        public bool DeleteCategory(int id)
        {
            return _groupRepository.DeleteCategory(id);
        }
        public bool DeleteSubCategory(int id)
        {
            return _groupRepository.DeleteSubCategory(id);
        }

        public GroupDto UpdateGroup(GroupDto group)
        {
            var groupModel = _groupRepository.UpdateGroup(_mapper.Map<GroupModel>(group));

            foreach (var categoryOld in groupModel.Categories)
            {
                categoryOld.GroupId = null;
            }

            if(group.Categories != null)
            {
                foreach (var category in group.Categories)
                {
                    var categoryModel = _mapper.Map<CategoryModel>(category);
                    categoryModel.GroupId = groupModel.Id;
                    _groupRepository.UpdateCategory(categoryModel);
                }
            }
            

            return _mapper.Map<GroupDto>(groupModel);
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

using AutoMapper;
using electro.api.rest.ActionFilters;
using electro.api.rest.DTOs.ProductHierarchy;
using electro.api.rest.Models.ProductHierarchy;
using electro.api.rest.Reposiotories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("/api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public GroupsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("allGroups")]
        public async Task<IActionResult> GetAllGroupsCategoriesSubCategories()
        {
            var groups = await unitOfWork.ProductHierarchy.GetGroups().Include(g => g.Categories).ThenInclude(c => c.SubCategories).ToListAsync();
            var groupsDto = mapper.Map<IEnumerable<GroupDto>>(groups);
            return Ok(groupsDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetGroups() {
            var groups = await unitOfWork.ProductHierarchy.GetGroups().Include(g => g.Categories).ToListAsync();
            var groupsDto = mapper.Map<IEnumerable<GroupDto>>(groups);
            return Ok(groupsDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateGroup(GroupDto groupDto)
        {
            var groupModel = mapper.Map<GroupModel>(groupDto);
            var createdGroup = await unitOfWork.ProductHierarchy.CreateGroup(groupModel);
            await unitOfWork.CompleteAsync();
            return Ok(mapper.Map<GroupDto>(createdGroup));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateGroup(int id, GroupDto groupDto)
        {
            var groupModel = mapper.Map<GroupModel>(groupDto);
            if (id != groupDto.Id)
            {
                return BadRequest();
            }
            var updatedGroup = await unitOfWork.ProductHierarchy.UpdateGroup(groupModel);
            await unitOfWork.CompleteAsync();
            return Ok(mapper.Map<GroupDto>(updatedGroup));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            await unitOfWork.ProductHierarchy.DeleteGroup(id);
            await unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpGet("categories")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await unitOfWork.ProductHierarchy.GetCategories().Include(c => c.SubCategories).ToListAsync();
            var categoriesDto = mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoriesDto);
        }

        [HttpGet("categories/free")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetFreeCategories()
        {
            var categories = await unitOfWork.ProductHierarchy.GetCategories().Where(c => c.GroupId == null).ToListAsync();
            var categoriesDto = mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoriesDto);
        }


        [HttpPost("categories")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategory(CategoryDto categoryDto)
        {
            var categoryModel = mapper.Map<CategoryModel>(categoryDto);
            var createdCategory = await unitOfWork.ProductHierarchy.CreateCategory(categoryModel);
            await unitOfWork.CompleteAsync();
            var createdCategoryDto = mapper.Map<CategoryDto>(createdCategory);
            return Ok(createdCategoryDto);
        }

        [HttpPut("categories/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory(int id, CategoryDto categoryDto)
        {
            var categoryModel = mapper.Map<CategoryModel>(categoryDto);
            if (id != categoryDto.Id)
            {
                return BadRequest();
            }
            var updatedCategory = await unitOfWork.ProductHierarchy.UpdateCategory(categoryModel);
            await unitOfWork.CompleteAsync();
            var updatedCategoryDto = mapper.Map<CategoryDto>(updatedCategory);
            return Ok(updatedCategoryDto);
        }

        [HttpDelete("categories/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await unitOfWork.ProductHierarchy.DeleteCategory(id);
            await unitOfWork.CompleteAsync();
            return Ok();
        }


        [HttpGet("subcategories")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetSubCategories()
        {
            var subCategories = await unitOfWork.ProductHierarchy.GetSubCategories().ToListAsync();
            var subCategoriesDto = mapper.Map<IEnumerable<SubCategoryDto>>(subCategories);
            return Ok(subCategoriesDto);
        }

        [HttpGet("subcategories/free")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetFreeSubCategories()
        {
            var subCategories = await unitOfWork.ProductHierarchy.GetSubCategories().Where(s => s.CategoryId == null).ToListAsync();
            var subCategoriesDto = mapper.Map<IEnumerable<SubCategoryDto>>(subCategories);
            return Ok(subCategoriesDto);
        }

        [HttpPost("subcategories")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateSubCategory(SubCategoryDto subCategoryDto)
        {
            var subCategoryModel = mapper.Map<SubCategoryModel>(subCategoryDto);
            var createdSubCategory = await unitOfWork.ProductHierarchy.CreateSubCategory(subCategoryModel);
            await unitOfWork.CompleteAsync();
            var createdSubCategoryDto = mapper.Map<SubCategoryDto>(createdSubCategory);
            return Ok(createdSubCategoryDto);
        }

        [HttpDelete("subcategories/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            await unitOfWork.ProductHierarchy.DeleteSubCategory(id);
            await unitOfWork.CompleteAsync();
            return Ok();
        }


        [HttpPut("subcategories/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSubCategory(int id, SubCategoryDto subCategoryDto)
        {
            var subCategoryModel = mapper.Map<SubCategoryModel>(subCategoryDto);
            if (id != subCategoryDto.Id)
            {
                return BadRequest();
            }
            var updatedSubCategory = await unitOfWork.ProductHierarchy.UpdateSubCategory(subCategoryModel);
            await unitOfWork.CompleteAsync();
            var updatedSubCategoryDto = mapper.Map<SubCategoryDto>(updatedSubCategory);
            return Ok(updatedSubCategoryDto);
        }
    }
}

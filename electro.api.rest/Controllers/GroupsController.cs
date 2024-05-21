using AutoMapper;
using electro.api.rest.Dtos;
using electro.api.rest.Exceptions;
using electro.api.rest.Filters;
using electro.api.rest.Models;
using electro.api.rest.Reposiotories.Interfaces;
using electro.api.rest.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace electro.api.rest.Controllers
{
    [ServiceFilter(typeof(ExceptionFilter))]
    [ApiController]
    [Route("/api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public GroupsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetGroups() {
            var groups = await _unitOfWork.Groups.GetGroups().Include(g => g.Categories).ToListAsync();
            var groupsDto = _mapper.Map<IEnumerable<GroupDto>>(groups);
            return Ok(groupsDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup(GroupDto groupDto)
        {
            var groupModel = _mapper.Map<GroupModel>(groupDto);
            var createdGroup = await _unitOfWork.Groups.CreateGroup(groupModel);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<GroupDto>(createdGroup));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(int id, GroupDto groupDto)
        {
            var groupModel = _mapper.Map<GroupModel>(groupDto);
            if (id != groupDto.Id)
            {
                return BadRequest();
            }
            await _unitOfWork.Groups.UpdateGroup(groupModel);
            await _unitOfWork.CompleteAsync();
            return Ok(groupModel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            await _unitOfWork.Groups.DeleteGroup(id);
            await _unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _unitOfWork.Groups.GetCategories().Include(c => c.SubCategories).ToListAsync();
            var categoriesDto = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoriesDto);
        }

        [HttpGet("categories/free")]
        public async Task<IActionResult> GetFreeCategories()
        {
            var categories = await _unitOfWork.Groups.GetCategories().Where(c => c.GroupId == null).ToListAsync();
            var categoriesDto = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoriesDto);
        }


        [HttpPost("categories")]
        public async Task<IActionResult> CreateCategory(CategoryDto categoryDto)
        {
            var categoryModel = _mapper.Map<CategoryModel>(categoryDto);
            var createdCategory = await _unitOfWork.Groups.CreateCategory(categoryModel);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<CategoryDto>(createdCategory));
        }

        [HttpDelete("categories/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _unitOfWork.Groups.DeleteCategory(id);
            await _unitOfWork.CompleteAsync();
            return Ok();
        }




















        [HttpGet("subcategories")]
        public async Task<IActionResult> GetSubCategories()
        {
            var subCategories = await _unitOfWork.Groups.GetSubCategories().ToListAsync();
            var subCategoriesDto = _mapper.Map<IEnumerable<SubCategoryDto>>(subCategories);
            return Ok(subCategoriesDto);
        }

        [HttpGet("subcategories/free")]
        public async Task<IActionResult> GetFreeSubCategories()
        {
            var subCategories = await _unitOfWork.Groups.GetSubCategories().Where(s => s.CategoryId == null).ToListAsync();
            var subCategoriesDto = _mapper.Map<IEnumerable<SubCategoryDto>>(subCategories);
            return Ok(subCategoriesDto);
        }

        [HttpPost("subcategories")]
        public async Task<IActionResult> CreateSubCategory(SubCategoryDto subCategoryDto)
        {
            var subCategoryModel = _mapper.Map<SubCategoryModel>(subCategoryDto);
            var createdSubCategory = await _unitOfWork.Groups.CreateSubCategory(subCategoryModel);
            await _unitOfWork.CompleteAsync();
            return Ok(_mapper.Map<SubCategoryDto>(createdSubCategory));
        }

        [HttpDelete("subcategories/{id}")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            await _unitOfWork.Groups.DeleteSubCategory(id);
            await _unitOfWork.CompleteAsync();
            return Ok();
        }





        /*        

               

               [HttpPut("categories/{id}")]
               public async Task<IActionResult> UpdateCategory(int id, CategoryDto categoryDto)
               {
                   if (id != categoryDto.Id)
                   {
                       return BadRequest();
                   }
                   var updatedCategory = _groupService.UpdateCategory(categoryDto);
                   return Ok(updatedCategory);
               }

               

               

               [HttpPut("subcategories/{id}")]
               public async Task<IActionResult> UpdateSubCategory(int id, SubCategoryDto subCategoryDto)
               {
                   if (id != subCategoryDto.Id)
                   {
                       return BadRequest();
                   }
                   var updatedSubCategory = _groupService.UpdateSubCategory(subCategoryDto);
                   return Ok(updatedSubCategory);
               }*/
    }

}

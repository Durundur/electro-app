using electro.api.rest.Dtos;
using electro.api.rest.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace electro.api.rest.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        public IEnumerable<GroupDto> GetAll()
        {
            return _groupService.GetAll();
        }

        [HttpPost("createGroup")]
        public ActionResult<GroupDto> CreateGroup(GroupDto groupDto)
        {
            var addedGroup = _groupService.AddGroup(groupDto);
            return Ok(addedGroup);
        }

        [HttpDelete("deleteGroup/{id}")]
        public ActionResult DeleteGroup(int id)
        {
            var deleted = _groupService.DeleteGroup(id);
            if (!deleted)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut("updateGroup/{id}")]
        public ActionResult<GroupDto> UpdateGroup(int id, GroupDto groupDto)
        {
            if (id != groupDto.Id)
            {
                return BadRequest();
            }
            var updatedGroup = _groupService.UpdateGroup(groupDto);    
            return Ok(updatedGroup);
        }

        [HttpPost("createCategory")]
        public ActionResult<CategoryDto> CreateCategory(CategoryDto categoryDto)
        {
            var addedCategory = _groupService.AddCategory(categoryDto);
            return Ok(addedCategory);
        }

        [HttpDelete("deleteCategory/{id}")]
        public ActionResult DeleteCategory(int id)
        {
            var deleted = _groupService.DeleteCategory(id);
            if (!deleted)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut("updateCategory/{id}")]
        public ActionResult UpdateCategory(int id, CategoryDto categoryDto)
        {
            if (id != categoryDto.Id)
            {
                return BadRequest();
            }
            var updatedCategory = _groupService.UpdateCategory(categoryDto);
            return Ok(updatedCategory);
        }

        [HttpPost("createSubCategory")]
        public ActionResult<SubCategoryDto> CreateSubCategory(SubCategoryDto subCategoryDto)
        {
            var addedSubCategory = _groupService.AddSubCategory(subCategoryDto);
            return Ok(addedSubCategory);
        }

        [HttpDelete("deleteSubCategory/{id}")]
        public ActionResult DeleteSubCategory(int id)
        {
            var deleted = _groupService.DeleteSubCategory(id);
            if (!deleted)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut("updateSubCategory/{id}")]
        public ActionResult UpdateSubCategory(int id, SubCategoryDto subCategoryDto)
        {
            if (id != subCategoryDto.Id)
            {
                return BadRequest();
            }
            var updatedSubCategory = _groupService.UpdateSubCategory(subCategoryDto);
            return Ok(updatedSubCategory);
        }
    }

}

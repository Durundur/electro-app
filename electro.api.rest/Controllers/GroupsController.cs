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
        public IActionResult GetGroups() {
            var groups = _groupService.GetAllGroups();
            return Ok(groups);
        }

        [HttpPost]
        public IActionResult CreateGroup(GroupDto groupDto)
        {
            var createdGroup = _groupService.CreateGroup(groupDto);
            return Ok(createdGroup);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateGroup(int id, GroupDto groupDto)
        {
            if (id != groupDto.Id)
            {
                return BadRequest();
            }
            var updatedGroup = _groupService.UpdateGroup(groupDto);
            return Ok(updatedGroup);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteGroup(int id)
        {
            var ifDeleted = _groupService.DeleteGroup(id);
            if (!ifDeleted)
            {
                return NotFound("Failure while deleting item");
            }
            return Ok(new Response("Successfully deleted item", true));
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _groupService.GetAllCategories();
            var subCategoies = _groupService.GetFreeSubCategories();
            return Ok(categories);
        }

        [HttpPost("categories")]
        public IActionResult CreateCategory(CategoryDto categoryDto)
        {
            var createdCategory = _groupService.CreateCategory(categoryDto);
            return Ok(createdCategory);
        }

        [HttpGet("categories/free")]
        public IActionResult GetFreeCategories()
        {
            var freeCategories = _groupService.GetFreeCategories();
            return Ok(freeCategories);
        }

        [HttpDelete("categories/{id}")]
        public ActionResult DeleteCategory(int id)
        {
            var ifDeleted = _groupService.DeleteCategory(id);
            if (!ifDeleted)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut("categories/{id}")]
        public ActionResult UpdateCategory(int id, CategoryDto categoryDto)
        {
            if (id != categoryDto.Id)
            {
                return BadRequest();
            }
            var updatedCategory = _groupService.UpdateCategory(categoryDto);
            return Ok(updatedCategory);
        }

        [HttpPost("subcategories")]
        public IActionResult CreateSubCategory(SubCategoryDto subCategoryDto)
        {
            var createdSubCategory = _groupService.CreateSubCategory(subCategoryDto);
            return Ok(createdSubCategory);
        }

        [HttpDelete("subcategories/{id}")]
        public ActionResult DeleteSubCategory(int id)
        {
            var ifDeleted = _groupService.DeleteSubCategory(id);
            if (!ifDeleted)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut("subcategories/{id}")]
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

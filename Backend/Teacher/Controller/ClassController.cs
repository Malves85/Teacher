using Microsoft.AspNetCore.Mvc;
using Teacher.Helpers;
using Teacher.Interface.Services;
using Teacher.Models.Classes;

namespace Teacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;
        public ClassController(IClassService classService)
        {
            _classService = classService;
        }
        [HttpPost("GetAll")]
        public async Task<PaginatedList<ClassDTO>> GetAll(SearchDTO search)
        {
            return await _classService.GetAll(search);
        }
        [HttpPost("Create")]
        public async Task<MessagingHelper<int>> Create(CreateClassDTO newClass)
        {
            return await _classService.Create(newClass);
        }
        [HttpGet("{id}")]
        public async Task<MessagingHelper<ClassDTO>> GetById(int id)
        {
            return await _classService.GetById(id);
        }
        [HttpPost("Edit")]
        public async Task<MessagingHelper<EditClassDTO>> Edit(EditClassDTO editClass)
        {
            return await _classService.Edit(editClass);
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Teacher.Helpers;
using Teacher.Interface.Services;
using Teacher.Models.Students;

namespace Teacher.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpPost("GetAll")]
        public async Task<PaginatedList<StudentDTO>> GetAll(SearchDTO search)
        {
            return await _studentService.GetAll(search);
        }
    }
}

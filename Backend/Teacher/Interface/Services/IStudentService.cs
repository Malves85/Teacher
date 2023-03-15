using Teacher.Helpers;
using Teacher.Models.Students;

namespace Teacher.Interface.Services
{
    public interface IStudentService
    {
        Task<PaginatedList<StudentDTO>> GetAll(SearchDTO search);
    }
}

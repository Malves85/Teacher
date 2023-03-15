using Teacher.Entity;
using Teacher.Helpers;

namespace Teacher.Interface.Repositories
{
    public interface IStudentRepository
    {
        Task<PaginatedList<Student>> GetAll(List<Parameter>? searchParameters, List<Parameter>? sortingParameters, int currentPage = 1, int pageSize = 5);
    }
}

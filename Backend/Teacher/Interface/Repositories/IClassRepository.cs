using Teacher.Entity;
using Teacher.Helpers;

namespace Teacher.Interface.Repositories
{
    public interface IClassRepository
    {
        Task<PaginatedList<Class>> GetAll(List<Parameter>? searchParameters, List<Parameter>? sortingParameters, int currentPage = 1, int pageSize = 5);
        Task<Class> Create(Class newClass);
    }
}

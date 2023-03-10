using Teacher.Helpers;
using Teacher.Models.Classes;

namespace Teacher.Interface.Services
{
    public interface IClassService
    {
        Task<PaginatedList<ClassDTO>> GetAll(SearchDTO search);
        Task<MessagingHelper<int>> Create(CreateClassDTO createClass);
        Task<MessagingHelper<ClassDTO>> GetById(int id);
        Task<MessagingHelper<EditClassDTO>> Edit(EditClassDTO editClass);
    }
}

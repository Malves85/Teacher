using Teacher.Helpers;
using Teacher.Interface.Repositories;
using Teacher.Interface.Services;
using Teacher.Models.Students;

namespace Teacher.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }
        public async Task<PaginatedList<StudentDTO>> GetAll(SearchDTO search)
        {
            var response = new PaginatedList<StudentDTO>();
            try
            {

                if (search.PageSize > 100)
                {
                    search.PageSize = 100;
                }

                if (search.PageSize < 5)
                {
                    search.PageSize = 5;
                }

                if (search.CurrentPage <= 0)
                {
                    search.CurrentPage = 1;
                }

                var responseRepository = await _studentRepository.GetAll(search.SearchParameters, search.SortingParameters, search.CurrentPage, search.PageSize);

                if (responseRepository.Success != true)
                {
                    response.Success = false;
                    response.Message = "Erro ao obter a informação";
                    return response;
                }

                response.Items = responseRepository.Items.Select(r => new StudentDTO(r)).ToList();
                response.PageSize = responseRepository.PageSize;
                response.CurrentPage = responseRepository.CurrentPage;
                response.TotalRecords = responseRepository.TotalRecords;
                response.Success = true;
            }
            catch (Exception ex)
            {
                MyLog.Logger(LogMessage.Error, $"StudentService.GetAll {ex.GetBaseException().Message}");

                response.Message = "Ocorreu um erro inesperado ao carregar os alunos";
                response.Success = false;
            }
            return response;
        }
    }
}

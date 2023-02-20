using Microsoft.AspNetCore.Identity;
using Teacher.Helpers;
using Teacher.Interface.Repositories;
using Teacher.Interface.Services;
using Teacher.Models.Classes;

namespace Teacher.Services
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        public ClassService(IClassRepository classRepository)
        {
            _classRepository = classRepository;
        }
        public async Task<PaginatedList<ClassDTO>> GetAll(SearchDTO search)
        {
            var response = new PaginatedList<ClassDTO>();
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

                var responseRepository = await _classRepository.GetAll(search.SearchParameters, search.SortingParameters, search.CurrentPage, search.PageSize);

                if (responseRepository.Success != true)
                {
                    response.Success = false;
                    response.Message = "Erro ao obter a informação";
                    return response;
                }

                response.Items = responseRepository.Items.Select(r => new ClassDTO(r)).ToList();
                response.PageSize = responseRepository.PageSize;
                response.CurrentPage = responseRepository.CurrentPage;
                response.TotalRecords = responseRepository.TotalRecords;
                response.Success = true;
            }
            catch (Exception ex)
            {
                MyLog.Logger(LogMessage.Error, $"ClassService.GetAll {ex.GetBaseException().Message}");

                response.Message = "Ocorreu um erro inesperado ao carregar as turmas";
                response.Success = false;
            }
            return response;
        }
    }
}

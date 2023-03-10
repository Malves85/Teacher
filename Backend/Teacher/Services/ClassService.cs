using Microsoft.AspNetCore.Identity;
using NLog.Fluent;
using Teacher.Helpers;
using Teacher.Interface.Repositories;
using Teacher.Interface.Services;
using Teacher.Models.Classes;
using static Teacher.Models.Classes.CreateClassDTO;
using static Teacher.Models.Classes.EditClassDTO;

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

        public async Task<MessagingHelper<int>> Create(CreateClassDTO createClass)
        {
            MessagingHelper<int> response = new();

            try
            {
                var responseValidate = await new CreateClassDTOValidator().ValidateAsync(createClass);
                if (responseValidate == null || responseValidate.IsValid == false)
                {
                    response.Message = responseValidate == null ? "Erro ao validar a informação para criar turma" : responseValidate.Errors.FirstOrDefault()!.ErrorMessage;
                    response.Success = false;
                    return response;
                }

                var newClass = createClass.ToEntity();
                var clientInDB = await _classRepository.Create(newClass);

                response.Success = true;
                response.Obj = newClass.Id;
                response.Message = "Turma criada com sucesso";


            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Ocorreu um erro inesperado ao criar turma";
            }

            return response;
        }

        public async Task<MessagingHelper<ClassDTO>> GetById(int id)
        {
            MessagingHelper<ClassDTO> response = new();
            try
            {
                var classInfo = await _classRepository.GetById(id);

                if (classInfo == null)
                {
                    response.Success = false;
                    response.Message = "Não encontramos a turma com esse id.";
                    return response;
                }

                response.Obj = new ClassDTO(classInfo);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Ocorreu um erro inesperado ao obter a turma";
            }
            return response;
        }

        public async Task<MessagingHelper<EditClassDTO>> Edit(EditClassDTO editClass)
        {
            MessagingHelper<EditClassDTO> response = new();

            try
            {

                var classInDb = await _classRepository.GetById(editClass.Id);

                if (classInDb == null)
                {
                    response.Message = "Turma não encontrada";
                    return response;
                }
                classInDb.Update(editClass);         

                classInDb = await _classRepository.Update(classInDb);

                response.Message = "Dados da turma atualizados com sucesso.";
                response.Success = true;                 
            }
            catch (Exception ex)
            {
                MyLog.Logger(LogMessage.Error, $"Falhou ao atualizar turma: {ex.GetBaseException().Message}");
                response.Success = false;
                response.Message = "Ocorreu um erro inesperado ao atualizar os dados da turma.";
            }

            return response;
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Teacher.Context;
using Teacher.Entity;
using Teacher.Helpers;
using Teacher.Interface.Repositories;

namespace Teacher.Repositories
{
    public class ClassRepository : IClassRepository
    {
        private readonly AppDbContext _context;
        public ClassRepository(AppDbContext context) 
        {
            _context = context;
        }

        public async Task<PaginatedList<Class>> GetAll(List<Parameter>? searchParameters, List<Parameter>? sortingParameters, int currentPage = 1, int pageSize = 5)
        {
            var response = new PaginatedList<Class>();

            try
            {
                searchParameters = Parameter.LoadFrom(new string[] { "name", "erpId" }, searchParameters, null);


                IQueryable<Class> query = _context.Classes.AsQueryable();

                //Usamos os parâmetros de pesquisa para procurar os dados
                foreach (var searchParameter in searchParameters)
                {
                    if (searchParameter.Value != null)
                    {
                        switch (searchParameter.Name)
                        {
                            case "name":
                                query = query.Where(r => r.Name.Contains(searchParameter.Value));
                                break;
                        }
                    }
                }
                //Se existir por menos um parâmetro de ordenação, ordenamos por esse campo
                if (sortingParameters != null && sortingParameters.Count > 0)
                {
                    switch (sortingParameters[0].Name)
                    {
                        case "name":
                            query = sortingParameters[0].Value == "DESC" ? query.OrderByDescending(a => a.Name) : query.OrderBy(a => a.Name);
                            break;
                    }
                }

                //Obtemos um count de todos os resultados
                var totalRecords = await query.CountAsync();
                response.TotalRecords = totalRecords;

                var numberOfItemsToSkip = pageSize * (currentPage - 1);

                //Ficamos apenas com o nº de registos pretendidos
                query = query.Skip(numberOfItemsToSkip);
                query = query.Take(pageSize);

                var list = await query.ToListAsync();

                response.Items = list;
                response.CurrentPage = currentPage;
                response.PageSize = pageSize;

                response.Success = true;
                response.Message = null;
            }
            catch (Exception ex)
            {
                MyLog.Logger(LogMessage.Error, $"ClassRepository.GetAll {ex.Message}");

                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}

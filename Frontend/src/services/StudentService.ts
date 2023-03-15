import { PaginatedList } from "../helpers/PaginatedList";
import { Parameter } from "../helpers/Parameter";
import { APIService } from "./APIService";
import { StudentDTO } from "../models/students/StudentDTO";

export class StudentService{
    
    async GetAll(
        searchParameters: Parameter[],
        sortingParameters: Parameter[],
        currentPage: number,
        pageSize: number,
    ): Promise<PaginatedList<StudentDTO>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Student/getAll`,
                {
                    searchParameters,
                    sortingParameters,
                    currentPage,
                    pageSize,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
            );
            return response.data;
        } catch (error) {
            return new PaginatedList<StudentDTO>(
                false,
                "Erro ao obter a informação dos alunos",
                "",
                [],
                0,
            );
        }
    }
}
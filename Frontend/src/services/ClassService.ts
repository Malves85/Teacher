import { PaginatedList } from "../helpers/PaginatedList";
import { ClassDTO } from "../models/Classes/ClassDTO";
import { Parameter } from "../helpers/Parameter";
import { APIService } from "./APIService";
import { MessagingHelper } from "../helpers/MessagingHelper";
import { ClassCreateDTO } from "../models/Classes/ClassCreateDTO";

export class ClassService{
    
    async GetAll(
        searchParameters: Parameter[],
        sortingParameters: Parameter[],
        currentPage: number,
        pageSize: number,
    ): Promise<PaginatedList<ClassDTO>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Class/getAll`,
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
            return new PaginatedList<ClassDTO>(
                false,
                "Erro ao obter a informação da turma",
                "",
                [],
                0,
            );
        }
    }

    async CreateClass(createClientStatus: ClassCreateDTO): Promise<MessagingHelper<number>> {
        try {
            var response = await APIService.Axios().post(`${APIService.GetURL()}/Class/Create`,
                {
                    ...createClientStatus
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                });
            return response.data;
        } catch (error) {
            return new MessagingHelper<number>(false, "Erro ao criar turma", 0);
        };
    }

}
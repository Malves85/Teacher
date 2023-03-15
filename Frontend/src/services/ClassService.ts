import { PaginatedList } from "../helpers/PaginatedList";
import { ClassDTO } from "../models/Classes/ClassDTO";
import { Parameter } from "../helpers/Parameter";
import { APIService } from "./APIService";
import { MessagingHelper } from "../helpers/MessagingHelper";
import { ClassCreateDTO } from "../models/Classes/ClassCreateDTO";
import { ClassUpdateDTO } from "../models/Classes/ClassUpdateDTO";

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
    async GetById(id: number): Promise<MessagingHelper<ClassDTO | null>> {
        try {
            var response = await APIService.Axios().get(`${APIService.GetURL()}/Class/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            return new MessagingHelper(
                false,
                "Erro ao ligar ao servidor para ir buscar informação da turma",
                null,
            );
        }
    }

    async Edit(classUpdate: ClassUpdateDTO): Promise<MessagingHelper<ClassUpdateDTO | null>> {
        try {
            var response = await APIService.Axios().post(
                `${APIService.GetURL()}/Class/edit`,
                { ...classUpdate },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                },
            );
            return response.data;
        } catch (error) {
            return new MessagingHelper<ClassUpdateDTO | null>(
                false,
                "Erro ao ligar ao servidor para atualizar turma",
                null,
            );
        }
    }

}
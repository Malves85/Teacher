import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SortingRule } from "react-table";
import { Col, Row } from "reactstrap";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import TableComponent, { OperationsCell } from "../../components/Table";
import { Parameter } from "../../helpers/Parameter";
import Toast from "../../helpers/Toast";
import { Utilities } from "../../helpers/Utilities";
import { StudentDTO } from "../../models/students/StudentDTO";
import { StudentService } from "../../services/StudentService";

export default function Students() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>(
        Utilities.LoadParameterFromURLQuery("name", "string", ""),
    );
    const [email, setEmail] = useState<string>(
        Utilities.LoadParameterFromURLQuery("email", "string", ""),
    );
    const [age, setAge] = useState<string>(
        Utilities.LoadParameterFromURLQuery("age", "number", ""),
    );
    const [city, setCity] = useState<string>(
        Utilities.LoadParameterFromURLQuery("city", "string", ""),
    );
    const [identification, setIdentification] = useState<string>(
        Utilities.LoadParameterFromURLQuery("identification", "number", ""),
    );
    const [initialLevel, setInitialLevel] = useState<string>(
        Utilities.LoadParameterFromURLQuery("initialLevel", "string", ""),
    );
    const [currentLevel, setCurrentLevel] = useState<string>(
        Utilities.LoadParameterFromURLQuery("currentLevel", "string", ""),
    );
    const [data, setData] = useState<StudentDTO[]>([]);
    const studentService = new StudentService();
    const [initialSortBy] = useState<SortingRule<object>[]>(
        Utilities.LoadSortParametersFromURLQuery("sortField", "sortOrder"),
    );
    const pageSizes: number[] = [5, 15, 30];
    const [goToPage, setGoToPage] = useState<number>();
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [page] = useState<number>(Utilities.LoadPageFromURLQuery("page"));
    const [pageSize] = useState<number>(Utilities.LoadPageSizeFromURLQuery(pageSizes));
    const [currentPage, setCurrentPage] = useState<number>();
    const [currentPageSize, setCurrentPageSize] = useState<number>();
    const [currentSorting, setCurrentSorting] = useState<SortingRule<object>[] | null>(null);
    const [reloadSearch, setReloadSearch] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    const onEnter = () => {
        setCurrentPage(1);
        setGoToPage(1);
        fetchData(currentPage ?? 1, currentPageSize ?? 5, currentSorting);
    };
    const onButtonClick = async () => {
        setCurrentPage(1);
        setGoToPage(1);
        fetchData(currentPage ?? 1, currentPageSize ?? 5, currentSorting);
    };
    const onRemoveFiltersClick = async () => {
        setCurrentPage(1);
        setGoToPage(1);
        setName("");
        setReloadSearch(true);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "",
                accessor: " ",
                Cell: (props: any) => OperationsCell(props.cell.row.original.id, "student"),
            },
            {
                Header: "Nome" ,
                accessor: "name",
                width: 20,
            },
            {
                Header: "Email",
                accessor: "email",
                width: 15,
            },
            {
                Header: "Idade",
                accessor: "age",
                width: 10,
            },
            {
                Header: "Cidade",
                accessor: "city",
                width: 10,
            },{
                Header: "Identificação",
                accessor: "dateInitialString",
                width: 15,
            },{
                Header: "Nível inicial",
                accessor: "initialLevel",
                width: 15,
            },{
                Header: "Nível atual",
                accessor: "currentLevel",
                width: 15,
            },
            
        ],
        [],
    );

    const fetchData = async (
        page: number,
        pageSize: number,
        sortBy: SortingRule<object>[] | null,
    ) => {
        //Atualizamos na history do browser a current page e pageSize

        var searchUrl: string =
            `?page=${page}&pageSize=${pageSize}${Utilities.AddParamToQueryIfValue(
                "name",
                "string",
                name,
            )}${Utilities.AddParamToQueryIfValue(
                "email",
                "string",
                email,
            )}${Utilities.AddParamToQueryIfValue(
                "age",
                "string",
                age,
            )}`;

        if (sortBy != null && sortBy.length > 0) {
            searchUrl += `${Utilities.AddParamToQueryIfValue(
                "sortField",
                "string",
                sortBy[0].id,
            )}${Utilities.AddParamToQueryIfValue(
                "sortOrder",
                "string",
                sortBy[0].desc === true ? "DESC" : "ASC",
            )}`;
        }

        //Se antes não existirem parâmetros de pesquisa, significa que o user veio para aqui de uma rota, então para não ficar com duas rotas duplicadas, fazemos replace à rota

        if (searchParams.toString() === "") {
            navigate(`/students${searchUrl}`, { replace: true });
        } else {
            //Se já existirem parâmetros de pesquisa, não fazemos replace mas push
            navigate(`/students${searchUrl}`);
        }

        setLoading(true);

        //Vamos obter os dados
        var response = await studentService.GetAll(
            mountSearchParameters(),
            Utilities.MountSortParameters(sortBy),
            page,
            pageSize,
        );

        if (response.success !== true) {
            setData([]);
            setPageCount(0);
            setLoading(false);
            setCurrentPageSize(0);
            setCurrentPage(0);
            setCurrentSorting(null);
            Toast.Show("error", response.message);
            return;
        }

        //Atribuímos os dados
        setGoToPage(0)
        setData(response.items);
        setPageCount(response.totalPages);
        setLoading(false);
        setCurrentPageSize(pageSize);
        setCurrentPage(page);
        setCurrentSorting(sortBy);

        //Se a pesquisa tiver retornado múltiplas páginas e a página atual for superior ao nº de páginas que chegaram mandamos o user para a página 1
        if (response.totalPages > 0 && page > response.totalPages) {
            setGoToPage(1);
        }
    };

    //Método para montar os parâmetros de pesquisa
    const mountSearchParameters = (): Parameter[] => {
        var parameters: Parameter[] = [];

        parameters.push(new Parameter("name", name));
        parameters.push(new Parameter("email", email));
        parameters.push(new Parameter("age", age));

        return parameters;
    };

    useEffect(() => {
        if (reloadSearch === true) {
            fetchData(currentPage ?? 1, currentPageSize ?? 5, currentSorting);
            setReloadSearch(false);
        }
        return () => { };
    }, [reloadSearch]);

    return (

        <div className="pageContainer" style={{ width: "98%", margin:"10px" }}>

            <div className="pageHeader">
                <span className="pageTitle">
                Alunos
                </span>
            </div>

            <Row>
                <Col xl={2} lg={3} md={3} sm={12} xs={12} style={{ marginTop: "1em" }}>
                    <button
                        className="button"
                        style={{ margin: 0, width: "80%" }}
                        onClick={() => {
                            navigate(`/createStudent`);
                        }}
                    >
                        Criar Aluno
                    </button>
                </Col>
            </Row>

            <div className="pageBody" >
                <br />
                <Row>
                    <InputComponent xl={2} lg={3} md={5} sm={12} xs={12} 
                        style={{ width: "100%" }}
                        type={"text"}
                        onEnter={onEnter}
                        value={name}
                        label={"Nome"}
                        readOnly={false}
                        onChange={(t: string) => setName(t)}
                    />
                    <InputComponent xl={2} lg={3} md={5} sm={12} xs={12}
                        style={{ width: "100%" }}
                        type={"text"}
                        onEnter={onEnter}
                        value={email}
                        label={"Email"}
                        readOnly={false}
                        onChange={(t: string) => setEmail(t)}
                    />
                </Row>

                <Row>
                    <Col xl={3} lg={3} md={3} sm={12} xs={12}
                        style={{ marginTop: "1em", display: "inline-flex", gap: "1rem" }}
                    >
                        <ButtonComponent
                            text={"Procurar"}
                            onClick={onButtonClick}
                        />
                        <ButtonComponent
                            text={"Limpar"}
                            onClick={onRemoveFiltersClick}
                        />
                    </Col>
                </Row>

                <div className="pageComponent" style={{ width: "100%" }}>
                    <TableComponent
                        goToPage={goToPage}
                        loading={loading}
                        pageCount={pageCount}
                        columns={columns}
                        manualPagination={true}
                        fetchData={fetchData}
                        pageSizes={pageSizes}
                        initialPage={page}
                        initialPageSize={pageSize}
                        initialSortBy={initialSortBy}
                        data={data}
                        dontOrderFirstCollumn={true}
                    />
                </div>
            </div>
        </div>
    )
}
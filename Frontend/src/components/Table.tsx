import { CircularProgress, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Column, SortingRule, usePagination, useSortBy, useTable } from "react-table";
import "../style/Table.css";

export function OperationsCell(props: string, pathBase: string) {
    const tootlipDelay: number = 500;
    return (
        <div>
            <Tooltip
                title="Ver Detalhes"
                aria-label="Ver Detalhes"
                enterNextDelay={tootlipDelay}
                enterDelay={tootlipDelay}
            >
                <Link to={`/${pathBase}/${props}`} id="test">
                    <FcViewDetails className="icons" />
                </Link>
            </Tooltip>
        </div>
    );
}

//Função para enviar um id por parametro
export function OperationsCellSendID(
    props: string,
    pathBase: string,
    idRequest: number,
    isDisabled: boolean,
) {
    const tootlipDelay: number = 500;
    return (
        <div>
            <Tooltip
                title="Atualizar Pedido"
                enterNextDelay={tootlipDelay}
                enterDelay={tootlipDelay}
                style={isDisabled ? { opacity: 0.4, pointerEvents: "none" } : {}}
            >
                <Link
                    to={`/${pathBase}/${props}`}
                    state={{ idRequest: idRequest }}
                >
                    <MdModeEdit className="icons" />
                </Link>
            </Tooltip>
        </div >
    );
}

export interface TableComponentProps {
    columns: Column<object>[]; //Colunas da tabela
    data: object[]; //Data
    initialPage: number; //Deve começar no 1
    pageCount: number; //Total de Página
    initialPageSize: number; //Tamanho da página
    pageSizes: number[]; //Tamanhos de páginas disponíveis
    manualPagination: boolean;
    loading: boolean;
    fetchData: (page: number, pageSize: number, sortBy: SortingRule<object>[]) => void; //Método para obter dados
    goToPage: number | undefined; // Deve começar em 1,
    initialSortBy: SortingRule<object>[];
    dontOrderFirstCollumn?: boolean;
    dontOrderLastCollumn?: boolean
    lastColumnMobileResponsive?: boolean;
    disableSortBy?: boolean;
}

export interface searchFilters {
    label?: string;
    value?: string;
}

export default function TableComponent(props: TableComponentProps) {
    const pagesButtonSize: number = 20;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state: { pageIndex, pageSize, sortBy },
        pageOptions,
        gotoPage,
        setPageSize,
    } = useTable(
        {
            columns: props.columns,
            data: props.data,
            initialState: {
                pageIndex: props.initialPage - 1,
                pageSize: props.initialPageSize,
                sortBy: props.initialSortBy,
            }, //Tiramos 1 porque o react-table começa no 0 e o resto do sistema encara o 1 como primeiro
            pageCount: props.pageCount,
            manualPagination: props.manualPagination,
            manualSortBy: true,
            disableMultiSort: true,
            autoResetPage: false,
            disableSortBy: props.disableSortBy,
        },
        useSortBy,
        usePagination,
    );

    //Cada vez que a página interna ou o pageSize muda vamos carregar coisas
    useEffect(() => {
        //Acrescentamos mais 1 porque internamente react-table começa no 0
        props.fetchData(pageIndex + 1, pageSize, sortBy);
        //Não se deve colocar aqui as props, apesar do warning, se se colocar as props ele vai fazer refresh infinitamente
    }, [pageSize, pageIndex, sortBy]);

    useEffect(() => {
        //Se existir definida uma página para ir, e a página para ir for diferente da página atual
        //Deve-se substrair 1 por que o React-Table começa os índices no 1
        if (typeof props.goToPage != "undefined" && pageIndex !== props.goToPage - 1) {
            gotoPage(props.goToPage - 1);
        }
    }, [props.goToPage]);

    

    return (
        <> <br />
            <div>
                <div className="tableParent">
                    <div className="tableSubParent" style={{ width: "100%" }}>
                        <table
                            {...getTableProps()}
                            style={{ opacity: props.loading === true ? 0.3 : 1, width: "100%" }}
                            className={props.lastColumnMobileResponsive ? "lastColumnMobile" : ""}
                        >
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            /**Adicionamos a ultima coluna no inicio da tabela
                                             * A partir de css, escondemos/mostramos dependendo da largura do ecrã
                                             */
                                            props.lastColumnMobileResponsive &&
                                            (
                                                <th
                                                    {...headerGroup.headers[
                                                        headerGroup.headers.length - 1
                                                    ].getHeaderProps(
                                                        headerGroup.headers[
                                                            headerGroup.headers.length - 1
                                                        ].getSortByToggleProps(),
                                                    )}
                                                    style={{ display: "none" }}
                                                >
                                                    {headerGroup.headers[
                                                        headerGroup.headers.length - 1
                                                    ].render("Header")}
                                                    {headerGroup.headers[
                                                        headerGroup.headers.length - 1
                                                    ].isSorted === true &&
                                                        (headerGroup.headers[
                                                            headerGroup.headers.length - 1
                                                        ].isSortedDesc === true ? (
                                                            <span>
                                                                {" "}
                                                                <FaArrowDown />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                {" "}
                                                                <FaArrowUp />{" "}
                                                            </span>
                                                        ))}
                                                </th>
                                            )
                                        }

                                        {headerGroup.headers.map((column, i) =>
                                            props.dontOrderFirstCollumn && i === 0 ? (
                                                <th key={i}>{column.render("Header")} </th>
                                            ): props.dontOrderLastCollumn && i + 1  === headerGroup.headers.length ?
                                             (<th key={i}>{column.render("Header")} </th>) 
                                            : (
                                                <th
                                                    {...column.getHeaderProps(
                                                        column.getSortByToggleProps({
                                                            title: undefined,
                                                            style: {
                                                                width: `${column.width?.toString()}%`,
                                                            },
                                                        }),
                                                    )}
                                                >
                                                    {column.render("Header")}
                                                    {column.isSorted === true &&
                                                        (column.isSortedDesc === true ? (
                                                            <span>
                                                                {" "}
                                                                <FaArrowDown />
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                {" "}
                                                                <FaArrowUp />{" "}
                                                            </span>
                                                        ))}
                                                </th>
                                            ),
                                        )}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {
                                                /**Adicionamos a ultima coluna no inicio da tabela
                                                 * A partir de css, escondemos/mostramos dependendo da largura do ecrã
                                                 */
                                                props.lastColumnMobileResponsive && (
                                                    <td
                                                        style={{ display: "none" }}
                                                        {...row.cells[
                                                            row.cells.length - 1
                                                        ].getCellProps()}
                                                    >
                                                        {row.cells[row.cells.length - 1].render(
                                                            "Cell",
                                                        )}{" "}
                                                    </td>
                                                )
                                            }

                                            {row.cells.map((cell) => {
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {props.loading && (
                    <div
                        className="loading"
                        style={{
                            opacity: props.loading === true ? 1 : 0,
                            transition: "opacity 0.2s ease-out",
                        }}
                    >
                        <span>
                            {" "}
                            ...{" "}
                        </span>
                        <CircularProgress style={{ marginLeft: "10px" }} size={"25px"} />
                    </div>
                )}
                <br />
                <div className="pagination" style={{ opacity: props.loading === true ? 0.5 : 1 }}>
                    <button
                        className="paginationButton"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage || props.loading}
                    >
                        <GrFormPreviousLink size={pagesButtonSize} />
                    </button>

                    <span className="paginationNumberIndicator">
                        <strong>{pageIndex + 1}</strong> {" "}
                        <strong>{pageOptions.length}</strong>
                    </span>

                    <button
                        className="paginationButton"
                        onClick={() => nextPage()}
                        disabled={!canNextPage || props.loading}
                    >
                        <GrFormNextLink size={pagesButtonSize} />
                    </button>

                    <div className="paginationRecordSize">
                        <span>
                            
                        </span>
                        <select
                            className="paginationRecordSizeSelect"
                            disabled={props.loading}
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {props.pageSizes.sort((a, b) => a > b ? 1 : -1).map((pageSize) => {
                                return (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

import { CircularProgress, TextField } from "@mui/material";
import React from "react";
import { FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Col } from "reactstrap";
import "../style/Input.css"

export type InputComponentProps = {
    label: string;
} & (
        | {
            readOnly: true;
        }
        | {
            readOnly?: false;
            onChange: (text: any) => void;
            onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
            onFocusOut?: () => void;
        }
    ) &
    (
        | {
            type: "number";
            value: number | undefined;
        }
        | {
            type: "text";
            value: string | undefined;
        }
        | {
            type: "date";
            value: string | undefined | null;
        }
        | {
            type: "time";
            value: string | undefined | null;
        }
        | {
            type: "textArea";
            value: string | undefined;
            rows?: number | undefined;
        }
        | {
            type: "password";
            value: string | undefined;
        }
    ) & {
        style?: React.CSSProperties | undefined;
    } & {
        class?: string | undefined;
    } & {
        min?: number | undefined;
        max?: number | undefined;
    } & {
        xs?: number;
        sm?: number;
        md?: number;
        lg: number;
        xl?: number;
    } & {
        showIcon?: boolean;
        functionIcon?: () => void;
        isFunctionLoading?: boolean;
    } & {
        showLoadingSkeleton?: boolean;
    };

export default function InputComponent(props: InputComponentProps) {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof props.readOnly != "undefined" && props.readOnly !== true) {
            props.onChange(e.target.value);
        }
    };

    const onTextAreaChange = (e: any) => {
        if (typeof props.readOnly != "undefined" && props.readOnly !== true) {
            props.onChange(e.target.value);
        }
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (props.readOnly === false && typeof props.onEnter !== "undefined") {
                props.onEnter(e);
            }
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            e.key === "Tab" &&
            props.readOnly === false &&
            typeof props.onFocusOut !== "undefined"
        ) {
            props.onFocusOut();
        }
    };

    return (
        <Col
            xl={props.xl}
            lg={props.lg}
            md={props.md}
            sm={props.sm}
            xs={props.xs}
            className={`inputContainer ${props.class}`}
        >

            <span className="label">{props.label}</span>

            {typeof props.showLoadingSkeleton !== "undefined" &&
                props.showLoadingSkeleton === true ? (
                <>
                    <Skeleton height={"2rem"} />
                </>
            ) : (
                <>
                    {props.type !== "date" && props.type !== "time" && props.showIcon === true && (
                        <div className="input-icons">
                            <input
                                onKeyPress={onKeyPress}
                                onKeyDown={onKeyDown}
                                className="input"
                                type={props.type}
                                readOnly={props.readOnly}
                                value={props.value}
                                onChange={onInputChange}
                                style={props.style}
                                min={props.min}
                                max={props.max}
                            ></input>
                            {props.isFunctionLoading ? (
                                <a className="icon">
                                    <CircularProgress size={"1.5em"} />
                                </a>
                            ) : (
                                <a
                                    className="icon"
                                    style={{ cursor: "pointer" }}
                                    onClick={props.functionIcon}
                                >
                                    <FaSearch />
                                </a>
                            )}
                        </div>
                    )}

                    {props.type !== "date" &&
                        props.type !== "time" &&
                        props.type !== "textArea" &&
                        props.showIcon !== true && (
                            <input
                                onKeyPress={onKeyPress}
                                onKeyDown={onKeyDown}
                                className="input"
                                type={props.type}
                                readOnly={props.readOnly}
                                value={props.value}
                                onChange={onInputChange}
                                style={props.style}
                                min={props.min}
                                max={props.max}
                            ></input>
                        )}

                    {props.type === "textArea" && (
                        <textarea
                            className="input"
                            rows={props.rows}
                            readOnly={props.readOnly}
                            value={props.value}
                            onChange={onTextAreaChange}
                            style={{ width: "100%", ...props.style }}
                        />
                    )}

                    {props.type === "date" && (
                        <TextField
                            value={props.value}
                            className={`inputMaterialUi ${props.readOnly ? "disabledFieldsetMaterialDate" : ""
                                }`}
                            type="date"
                            variant={"outlined"}
                            onKeyPress={onKeyPress}
                            onChange={onInputChange}
                            style={props.style}
                        />
                    )}

                    {props.type === "time" && (
                        <TextField
                            value={props.value}
                            className={`inputMaterialUi ${props.readOnly ? "disabledFieldsetMaterialDate" : ""
                                }`}
                            type="time"
                            variant={"outlined"}
                            onKeyPress={onKeyPress}
                            onChange={onInputChange}
                            style={props.style}
                        />
                    )}
                </>
            )}
        </Col>
    );
}

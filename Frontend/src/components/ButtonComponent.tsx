import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import "../style/Button.css"

export interface ButtonComponentProps {
    text: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties | undefined;
    className?: string;
    icon?: JSX.Element;
}

export default function ButtonComponent({
    onClick,
    text,
    loading,
    style,
    disabled,
    className,
    icon,
}: ButtonComponentProps) {
    const isDisabled = (): boolean => {
        if (typeof disabled !== "undefined" && disabled === true) return true;
        if (typeof loading !== "undefined" && loading === true) return true;
        return false;
    };

    return (
        <button
            style={{ ...style, display: "flex", justifyContent: "center" }}
            className={`button ${className}`}
            onClick={() => onClick()}
            disabled={isDisabled()}
        >
            {text} {icon}
            {loading === true && (
                <CircularProgress style={{ marginLeft: "0.5rem" }} size={"1.5em"} />
            )}
        </button>
    );
}

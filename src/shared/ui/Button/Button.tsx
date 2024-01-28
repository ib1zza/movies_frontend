import React from 'react';
import {classNames} from "@shared/lib/classNames.ts";
import s from "./Button.module.scss";

interface ButtonProps {
    size?: "S" | "M" | "L";
    style?: "transparent" | "primary" | "accent";
    children: React.ReactNode,
    className?: string,
    onClick?: () => void
}

const Button = (props: ButtonProps) => {
    const {
        size = "M",
        style = "primary",
        className = "",
        children,
        ...rest
    } = props;

    const cn = classNames(s.button, {}, [s[size], s[style], className]);

    return (
        <button className={cn} {...rest}>
            {children}
        </button>
    );
};

export default Button;

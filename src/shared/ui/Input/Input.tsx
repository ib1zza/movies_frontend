
import s from "./Input.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {forwardRef, HTMLAttributes} from "react";
import {FieldError} from "react-hook-form";

interface InputProps {
    className?: string
    error?: FieldError
    name: string
    label?: string
    register: (name: string) => Record<string, unknown>
    [key: string]: HTMLAttributes<HTMLInputElement> | any;
}

const Input = forwardRef(({className,label, error, ...props} : InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    console.log(props)
    return (
        <div className={classNames(s.Input, {}, [className])}>
            <span className={s.label}>{label}</span>
            <input ref={ref} {...props} className={classNames(s.input, {[s.error]: error?.type})}/>
            {error && <span className={s.errorMessage}>{error.message}</span>}
        </div>
    );
});

export {Input};

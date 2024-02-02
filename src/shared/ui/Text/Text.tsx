import s from "./Text.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";

interface TextProps {
    size: "XS" | "S" | "M" | "L";
    bold?: boolean;
    children: React.ReactNode,
    style?: "default" | "primary" | "accent" | "black" | "white"
    className?: string,
    onClick?: () => void,
    underline?: boolean
}
const Text = (props : TextProps) => {
    const {
        size = "M",
        style = "primary",
        className = "",
        children,
        bold = false,
        underline = false,
        ...rest
    } = props;
    return (
        <span className={classNames(s.Text, {[s.bold]: bold, [s.underline]: underline, [s.clickable]: !!rest?.onClick}, [className, s[size], s[style]])} {...rest}>
            {children}
        </span>
    );
};

export {Text};

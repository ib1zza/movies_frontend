import s from "./Wrapper.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";

interface WrapperProps {
    className?: string,
    children: React.ReactNode
}

const Wrapper = ({className, children} : WrapperProps) => {
    return (
        <div className={classNames(s.Wrapper, {}, [className])}>
            {children}
        </div>
    );
};

export {Wrapper};

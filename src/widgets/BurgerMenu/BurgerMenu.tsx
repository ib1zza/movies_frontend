import s from "./BurgerMenu.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import {useState} from "react";

interface BurgerMenuProps {
    className?: string;
    children: React.ReactNode
}

const BurgerMenu = ({className, children}: BurgerMenuProps) => {
    const [open, setOpen] = useState(false);
    const [isOpening, setIsOpening] = useState(false);

    function toggleOpen() {
        if (!open) {
            setOpen(true);
            setTimeout(() => {
                setIsOpening(true);
            }, 100);
        } else {
            setIsOpening(false)
            setTimeout(() => {
                setOpen(false)
            }, 300);
        }
    }
    return (
        <div className={classNames(s.BurgerMenu, {}, [className])}>
            <div className={classNames(s.burgerMenuButton, { [s.open]: open })} onClick={toggleOpen}>
                <div className={s.burgerMenuLine}></div>
                <div className={s.burgerMenuLine}></div>
                <div className={s.burgerMenuLine}></div>
            </div>
            {
                open &&
                <div className={classNames(s.burgerMenuShadow, {[s.open]: open})} onClick={toggleOpen}>
                        <div className={classNames(s.burgerMenuContent, {[s.open]: open, [s.opening]: isOpening})} onClick={(e) => e.stopPropagation()}>
                        {
                            children
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export {BurgerMenu};

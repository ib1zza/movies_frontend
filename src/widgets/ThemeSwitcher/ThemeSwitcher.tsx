import s from "./ThemeSwitcher.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import Button from "@shared/ui/Button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-solid-svg-icons";

interface ThemeSwitcherProps {
    className?: string
}

const ThemeSwitcher = ({className} : ThemeSwitcherProps) => {
    return (
        <Button style={"primary"} size={"M"} className={classNames(s.ThemeSwitcher, {}, [className])}>
            <FontAwesomeIcon icon={faMoon} />
        </Button>
    );
};

export {ThemeSwitcher};

import s from "./ThemeSwitcher.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import Button from "@shared/ui/Button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "@context/ThemeContext";
import {Theme} from "@context/ThemeContext/ThemeContext.ts";

interface ThemeSwitcherProps {
    className?: string
}

const ThemeSwitcher = ({className} : ThemeSwitcherProps) => {
    const {toggleTheme, theme} = useTheme();

    const icon = theme === Theme.LIGHT ? faMoon : faSun;

    return (
        <Button onClick={toggleTheme} style={"primary"} size={"M"} className={classNames(s.ThemeSwitcher, {}, [className])}>
            <FontAwesomeIcon icon={icon} />
        </Button>
    );
};

export {ThemeSwitcher};

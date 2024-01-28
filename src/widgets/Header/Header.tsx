import s from './Header.module.scss';
import {AppName} from "@shared/constants/constants.ts";
import SelectCinema from "@/widgets/SelectCinema/SelectCinema.tsx";
import {ThemeSwitcher} from "@/widgets/ThemeSwitcher/ThemeSwitcher.tsx";
import Button from "@shared/ui/Button/Button.tsx";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                {AppName}
            </div>
            <div className={s.selectCinema}>
                <SelectCinema/>
            </div>
            <div className={s.rightButtons}>
               <ThemeSwitcher/>
                <Button style={"accent"}>
                    Личный кабинет
                </Button>
            </div>
        </header>
    );
};

export default Header;

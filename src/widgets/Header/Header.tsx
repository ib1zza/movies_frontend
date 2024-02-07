import s from './Header.module.scss';
import {AppName} from "@shared/constants/constants.ts";
import SelectCinema from "@/widgets/SelectCinema/SelectCinema.tsx";
import {ThemeSwitcher} from "@/widgets/ThemeSwitcher/ThemeSwitcher.tsx";
import Button from "@shared/ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";
import {Wrapper} from "@shared/ui/Wrapper/Wrapper.tsx";

const Header = () => {
    const navigate = useNavigate()
    return (
            <Wrapper className={s.header}>
                <div className={s.logo} onClick={() => navigate(AppRoutes.HOMEPAGE)}>
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
            </Wrapper>
    );
};

export default Header;

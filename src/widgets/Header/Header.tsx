import s from './Header.module.scss';
import {AppName} from "@shared/constants/constants.ts";
import SelectCinema from "@/widgets/SelectCinema/SelectCinema.tsx";
import {ThemeSwitcher} from "@/widgets/ThemeSwitcher/ThemeSwitcher.tsx";
import Button from "@shared/ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";
import {Wrapper} from "@shared/ui/Wrapper/Wrapper.tsx";
import {BurgerMenu} from "@/widgets/BurgerMenu/BurgerMenu.tsx";
import {useAppSelector} from "@app/Store/config/store.ts";

const HeaderButton = () => {
    const {userData} = useAppSelector(state => state.user)
    const navigate = useNavigate()

    if (userData) {
        return <Button style={"accent"} onClick={() => navigate(AppRoutes.ACCOUNT) }>
            Личный кабинет
        </Button>
    }
    return <Button style={"accent"} onClick={() => navigate(AppRoutes.LOGIN)}>
        Вход
    </Button>
}

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
                <HeaderButton/>
            </div>
            <BurgerMenu>
                <div className={s.burgerContent}>
                    <ThemeSwitcher/>
                    <HeaderButton/>
                </div>
            </BurgerMenu>
        </Wrapper>
);
};

export default Header;

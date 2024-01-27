import React from 'react';
import s from './Header.module.scss';
import {AppName} from "@shared/constants/constants.ts";
import SelectCinema from "@/widgets/SelectCinema/SelectCinema.tsx";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                {AppName}
            </div>
            <div className={s.selectCinema}>
                <SelectCinema/>
            </div>
        </header>
    );
};

export default Header;

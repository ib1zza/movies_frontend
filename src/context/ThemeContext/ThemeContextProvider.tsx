import {
    FC, ReactElement, useMemo, useState,
} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from './ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactElement
}

const ThemeContextProvider: FC<ThemeProviderProps> = ({initialTheme = defaultTheme, children}) => {
    const [theme, setTheme] = useState<Theme>(initialTheme);
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;

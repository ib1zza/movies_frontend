import './styles/App.scss'
import {useTheme} from "@context/ThemeContext";
import {classNames} from "@shared/lib/classNames.ts";
import AppRouter from "@/app/AppRouter/AppRouter.tsx";
import {Wrapper} from "@shared/ui/Wrapper/Wrapper.tsx";

function App() {
    const {theme} = useTheme();

    return (
        <div className={classNames("app", {}, [theme])}>
            <Wrapper>
                <AppRouter/>
            </Wrapper>
        </div>
    )
}

export default App

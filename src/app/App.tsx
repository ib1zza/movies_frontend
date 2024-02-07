import './styles/App.scss'
import {useTheme} from "@context/ThemeContext";
import {classNames} from "@shared/lib/classNames.ts";
import AppRouter from "@/app/AppRouter/AppRouter.tsx";
import {Wrapper} from "@shared/ui/Wrapper/Wrapper.tsx";
import Header from "@/widgets/Header/Header.tsx";

function App() {
    const {theme} = useTheme();

    return (
        <div className={classNames("app", {}, [theme])}>
            <Header/>

            <Wrapper>
                <div className={"page"}>
                    <AppRouter/>
                </div>
            </Wrapper>
        </div>
    )
}

export default App

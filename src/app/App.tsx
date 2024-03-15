import './styles/App.scss'
import {useTheme} from "@context/ThemeContext";
import {classNames} from "@shared/lib/classNames.ts";
import AppRouter from "@/app/AppRouter/AppRouter.tsx";
import {Wrapper} from "@shared/ui/Wrapper/Wrapper.tsx";
import Header from "@/widgets/Header/Header.tsx";
import {PopupBuyTickets} from "@/widgets/PopupBuyTickets/PopupBuyTickets.tsx";
import {useAppDispatch} from "@app/Store/config/store.ts";
import {useEffect} from "react";
import {getUserInfo} from "@shared/API/ProfilesService.ts";
import {userActions} from "@app/Store/config/slices/userSlice.ts";

function App() {
    const {theme} = useTheme();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const sessionId = localStorage.getItem("sessionId");
        const machineId = localStorage.getItem("machineId");

        console.log(sessionId, machineId)
        if (!sessionId || !machineId) {
            return;
        }

        getUserInfo(sessionId, machineId).then(data => {
            dispatch(userActions.setUserData(data))
            console.log(data);
        })
    }, []);

    return (
        <div className={classNames("app", {}, [theme])}>
            <Header/>

            <Wrapper>
                <div className={"page"}>
                    <AppRouter/>
                </div>
            </Wrapper>

            <PopupBuyTickets/>
        </div>
    )
}

export default App

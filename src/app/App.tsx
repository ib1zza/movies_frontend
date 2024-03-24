import './styles/App.scss'
import {useTheme} from "@context/ThemeContext";
import {classNames} from "@shared/lib/classNames.ts";
import AppRouter from "@/app/AppRouter/AppRouter.tsx";
import {Wrapper} from "@shared/ui/Wrapper/Wrapper.tsx";
import Header from "@/widgets/Header/Header.tsx";
import {PopupBuyTickets} from "@/widgets/PopupBuyTickets/PopupBuyTickets.tsx";
import {useAppDispatch, useAppSelector} from "@app/Store/config/store.ts";
import {useEffect} from "react";
import {getUserInfo} from "@shared/API/ProfilesService.ts";
import {userActions} from "@app/Store/config/slices/userSlice.ts";

function App() {
    const {theme} = useTheme();
    const {sessionId, machineId, userData} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userData) return;
        const sessionIdLocal = sessionId || localStorage.getItem("sessionId");
        const machineIdLocal = machineId || localStorage.getItem("machineId");

        if (!sessionIdLocal || !machineIdLocal) {
            return;
        }

        getUserInfo(sessionIdLocal, machineIdLocal).then(data => {
            dispatch(userActions.setUserData(data))
            dispatch(userActions.setSessionId(sessionIdLocal));
            dispatch(userActions.setMachineId(machineIdLocal));
            console.log(data);
        })
    }, [sessionId, machineId, userData]);

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

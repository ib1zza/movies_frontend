import {Route, Routes} from "react-router-dom";
import {AppRoutes} from "@/app/AppRouter/AppRoutes.ts";
import Homepage from "@pages/Homepage/Homepage.tsx";
import Header from "@/widgets/Header/Header.tsx";
import {Cinemapage} from "@/pages/Cinemapage/Cinemapage";
import s from "./AppRouter.module.scss";

const RoutesConfig = [
    {
        path: AppRoutes.HOMEPAGE,
        element: <Homepage/>
    },
    {
        path: AppRoutes.CINEMA + "/:cinemaId",
        element: <Cinemapage/>
    }
]

const AppRouter = () => {
    return (
        <Routes>
            {RoutesConfig.map(({path, element}) => <Route key={path} path={path} element={element}/>)}
        </Routes>

    );
};

export default AppRouter;

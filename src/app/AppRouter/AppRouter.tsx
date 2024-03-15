import {Route, Routes} from "react-router-dom";
import {AppRoutes} from "@/app/AppRouter/AppRoutes.ts";
import Homepage from "@pages/Homepage/Homepage.tsx";
import {Cinemapage} from "@/pages/Cinemapage/Cinemapage";
import {MoviepageByCinema} from "@pages/MoviepageByCinema/MoviepageByCinema.tsx";
import {Login} from "@pages/Auth/Login/Login.tsx";
import {Register} from "@pages/Auth/Register/Register.tsx";
import ProtectedRoute from "@app/components/ProtectedRoute.tsx";

const RoutesConfig = [
    {
        path: AppRoutes.HOMEPAGE,
        element: <Homepage/>
    },
    {
        path: AppRoutes.CINEMA + "/:cinemaId",
        element: <Cinemapage/>
    },
    {
        path: AppRoutes.CINEMA + "/:cinemaId/movie/:movieId",
        element: <MoviepageByCinema/>
    },
    {
        path: AppRoutes.LOGIN,
        element:
            <ProtectedRoute>
                <Login/>
            </ProtectedRoute>
    },
    {
        path: AppRoutes.REGISTER,
        element:
            <ProtectedRoute>
                <Register/>
            </ProtectedRoute>
    },
    {
        path: "*",
        element: <Homepage/>
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

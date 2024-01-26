import {Route, Routes} from "react-router-dom";
import {AppRoutes} from "@/app/AppRouter/AppRoutes.ts";
import Homepage from "@pages/Homepage/Homepage.tsx";



// @ts-ignore
const RoutesConfig = [
    {
        path: AppRoutes.HOMEPAGE,
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
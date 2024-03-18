import {useAppSelector} from "@app/Store/config/store.ts";
import {Navigate} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";


interface Props {
    children: React.ReactNode
    needAuth?: boolean
}

const ProtectedRoute = ({children, needAuth = false}: Props) => {
    const {userData, isLoading} = useAppSelector(state => state.user)

    if (isLoading) {
        return null
    }

    if (needAuth && !userData) {
        return <Navigate to={AppRoutes.HOMEPAGE} />
    }

    if (!needAuth && userData) {
        return <Navigate to={AppRoutes.HOMEPAGE} />
    }

    return children
}

export default ProtectedRoute;

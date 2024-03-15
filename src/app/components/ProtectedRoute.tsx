import {useAppSelector} from "@app/Store/config/store.ts";
import {Navigate} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";


interface Props {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: Props) => {
    const {userData, isLoading} = useAppSelector(state => state.user)

    if (isLoading) {
        return null
    }

    if (userData) {
        return <Navigate to={AppRoutes.HOMEPAGE} />
    }

    return children
}

export default ProtectedRoute;

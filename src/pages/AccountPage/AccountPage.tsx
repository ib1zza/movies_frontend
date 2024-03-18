import s from "./AccountPage.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {OrdersHistory} from "@/widgets/OrdersHistory/OrdersHistory.tsx";
import {useAppSelector} from "@app/Store/config/store.ts";

interface AccountPageProps {
    className?: string
}
const AccountPage = ({className} : AccountPageProps) => {
    const {userData, machineId, sessionId} = useAppSelector(state => state.user)
    return (
        <div className={classNames(s.AccountPage, {}, [className])}>
            <h1 className={s.title}>Личный кабинет</h1>
            <OrdersHistory machineId={machineId} sessionId={sessionId}/>
        </div>
    );
};

export {AccountPage};

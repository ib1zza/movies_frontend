import s from "./AccountPage.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {OrdersHistory} from "@/widgets/OrdersHistory/OrdersHistory.tsx";
import {useAppSelector} from "@app/Store/config/store.ts";
import {AccountInfo} from "@/widgets/AccountInfo/AccountInfo.tsx";

interface AccountPageProps {
    className?: string
}
const AccountPage = ({className} : AccountPageProps) => {
    const {userData, machineId, sessionId} = useAppSelector(state => state.user);


    if (!userData) {
        return null
    }
    return (
        <div className={classNames(s.AccountPage, {}, [className])}>
            <h1 className={s.title}>Личный кабинет</h1>
            <AccountInfo sessionId={sessionId} machineId={machineId} userData={userData}/>
            <OrdersHistory machineId={machineId} sessionId={sessionId}/>
        </div>
    );
};

export {AccountPage};

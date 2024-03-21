import s from "./AccountInfo.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import {User} from "@shared/types/types.ts";
import Button from "@shared/ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {signOut} from "@shared/API/AccountsService.ts";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";
import {useAppDispatch} from "@app/Store/config/store.ts";
import {userActions} from "@app/Store/config/slices/userSlice.ts";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Text} from "@shared/ui/Text/Text.tsx";

interface AccountInfoProps {
    className?: string
    sessionId: string,
    machineId: string,
    userData: User
}

const AccountInfo = ({className, machineId, sessionId, userData}: AccountInfoProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSignOut = () => {
        signOut(sessionId, machineId).then((res) => {
            console.log(res);
            dispatch(userActions.logout())
            localStorage.clear();
            navigate(AppRoutes.HOMEPAGE, {replace: true});
        })
    }

    return (
        <div className={classNames(s.AccountInfo, {}, [className])}>
            <Text size={"M"} bold className={s.infoTitle}>
                <FontAwesomeIcon icon={faUser}/>
                Ваши данные:
            </Text>
            <div className={s.info}>
                <div className={s.infoRow}><span>Номер телефона:</span> {userData.username}</div>
                <div className={s.infoRow}><span>Email:</span> {userData.email}</div>
            </div>

            <Button className={s.logout} onClick={handleSignOut}>Выйти из аккаунта</Button>
        </div>
    );
};

export {AccountInfo};

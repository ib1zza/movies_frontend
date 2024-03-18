import s from "./OrdersHistory.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import {useEffect, useState} from "react";
import {getOrders} from "@shared/API/CinemaOrdersService.ts";
import {OrderInfo, ScreeningInfo} from "@shared/types/types.ts";
import {useAppDispatch, useAppSelector} from "@app/Store/config/store.ts";
import {reservationActions} from "@app/Store/config/slices/reservationSlice.ts";
import {userActions} from "@app/Store/config/slices/userSlice.ts";
import {formatPrice} from "@shared/lib/format.ts";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface OrdersHistoryProps {
    className?: string,
    machineId: string,
    sessionId: string
}

function formatTime(s: string) {
    const date = new Date(s);
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

function formatDate(s: string) {
    const date = new Date(s);
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`
}

const OrdersHistory = ({sessionId, machineId, className}: OrdersHistoryProps) => {
    const data = useAppSelector(state => state.user.ordersHistory);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getOrders(sessionId, machineId).then(data => {
          dispatch(userActions.setOrdersHistory(data))
        })
    }, [machineId, sessionId])

    const getTimeString =( s: string) => {
        return `${formatDate(s)} ${formatTime(s)} `
    }

    return (
        <div className={classNames(s.OrdersHistory, {}, [className])}>
            <h2 className={s.title}>
                <FontAwesomeIcon icon={faClockRotateLeft} />
                История заказов</h2>
            <div className={s.ordersContainer}>
                {
                    data.length === 0 && <h5 className={s.noOrders}>Вы еще не сделали ни одного заказа</h5>
                }
                {
                    data.map(order => <div className={s.orderItem} key={order.order_id}>
                        <h5>Заказ от {getTimeString(order.order_date.formatted_timestamp)}</h5>
                        <p>на сумму {formatPrice(order.total_price.value)}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export {OrdersHistory};

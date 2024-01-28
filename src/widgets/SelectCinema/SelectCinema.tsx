import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from "./SelectCinema.module.scss"

const SelectCinema = () => {
    return (
        <button className={s.button}>
            <FontAwesomeIcon icon={faLocationDot} />
            Выбрать кинотеатр
        </button>
    );
};

export default SelectCinema;

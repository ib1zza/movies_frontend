import s from "./PopupWarning.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { Text } from "@/shared/ui/Text/Text";

interface PopupWarningProps {
    title: string;  
    text?: string;
    onClose: () => void;
    children?: React.ReactNode
}
 
const PopupWarning: React.FC<PopupWarningProps> = ({title, text, onClose, children}) => {
    return ( 
        <div className={s.PopupWarning} onClick={onClose}>
            <div className={s.content} onClick={e => e.stopPropagation()}>
                <Text className={s.title} size="M" bold>
                    {title}
                </Text>
                <Text className={s.text} size="S">
                    {text}
                </Text>
                {children && <div className={s.children}>
                    {children}
                </div>}
                <button className={s.closeButton}>
                <FontAwesomeIcon icon={faXmark} onClick={onClose}/>
            </button>
            </div>
        </div>
     );
}
 
export default PopupWarning;
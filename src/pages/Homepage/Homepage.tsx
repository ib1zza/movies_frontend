import {Text} from "@shared/ui/Text/Text.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import s from "./Homepage.module.scss";
import {useEffect, useState} from "react";
import {getAllScreeneings} from "@shared/API/API.ts";


const Homepage = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // @ts-ignore
        getAllScreeneings().then(data => setData(data))
    }, [])

    console.log(data);

    return (
        <div>
            <div className={s.nowInCinemas}>
                <div className={s.heading}>
            <Text size={"L"} underline bold style={"default"}>Сейчас в кино</Text>
            <Text size={"L"}  style={"accent"}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Text>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

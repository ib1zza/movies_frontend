import {classNames} from "@shared/lib/classNames";
import s from "./CarouselWithFilms.module.scss";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselWithFilmsProps {
    className?: string,
    children: React.ReactNode
}

const settings: Settings = {
    slidesToShow: 5,
    slidesToScroll: 2,
    rows: 1,

    easing: "ease-in",
    dots: false,
    arrows: false,
    cssEase: "linear",
    // adaptiveHeight: true,

    responsive: [
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 460,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }
    ],


    // customPaging: () => <div className={s.dot} />,
};

const CarouselWithFilms = ({className, children} : CarouselWithFilmsProps) => {
    return (
        <div className={classNames(s.CarouselWithFilms, {}, [className])}>
            <Slider {...settings} className={s.slider}>
                {
                    children
                }
            </Slider>
        </div>
    );
};

export {CarouselWithFilms};

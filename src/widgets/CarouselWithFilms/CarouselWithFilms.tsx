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
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    rows: 1,

    easing: "ease-in",
    dots: false,
    arrows: false,
    cssEase: "linear",

    responsive: [
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
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
                // initialSlide: 0,
                // slidesPerRow: 2,
                // rows: 1,
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
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

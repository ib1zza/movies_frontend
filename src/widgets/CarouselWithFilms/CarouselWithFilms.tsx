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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    easing: "ease-in",
    // dotsClass: s.dotsContainer,
    // pauseOnDotsHover: true,
    // autoplay: true,

    // autoplaySpeed: 2500,
    // pauseOnHover: true,
    dots: false,
    arrows: false,

    responsive: [
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 750,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 450,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            },
        },
    ],

    // customPaging: () => <div className={s.dot} />,
};

const CarouselWithFilms = ({className, children} : CarouselWithFilmsProps) => {
    return (
        <div className={classNames(s.CarouselWithFilms, {}, [className])}>
            <Slider {...settings}>
                {
                    children
                }
            </Slider>
        </div>
    );
};

export {CarouselWithFilms};

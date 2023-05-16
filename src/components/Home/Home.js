import { React } from "react";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import 'swiper/css/effect-fade';

export const Home = () => {
  const images = [
    {
      key: "1",
      name: "https://images.hdqwalls.com/download/interstellar-movie-wide-1600x900.jpg",
    },
    {
      key: "2",
      name: "https://images.hdqwalls.com/download/inside-out-anger-1600x900.jpg",
    },
  ];

  const slideImgStyle = {
    width: "100%",
    height: "50vh",
    backgroundColor: "#A1A1A1",
  }

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      slidesPerView={1}
      effect="fade"
      loop={true}
      fadeEffect
      autoplay={{delay: 5000}}
      allowTouchMove={false}
    >
      {images.map((item) => (
        <SwiperSlide key={item.key} style={{background: "#141414", height: "auto"}}>
          <img src={item.name} style={{slideImgStyle}} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

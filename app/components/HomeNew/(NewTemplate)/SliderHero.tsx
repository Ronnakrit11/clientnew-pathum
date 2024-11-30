import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "./SliderHero.css";

const SlideHero = ({ banner }: { banner: any }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {banner?.image.map((item: any, index: number) => (
          <div key={index}>
            <Image
              src={item.url}
              alt=""
              width={3000}
              height={2000}
              className="w-full h-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideHero;

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
    <div>
      <Slider {...settings}>
        {banner?.image?.map((item: any, index: number) => (
          <div key={index} className="relative w-full h-auto">
            <div className="w-full max-h-screen aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={item.url}
                alt=""
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideHero;
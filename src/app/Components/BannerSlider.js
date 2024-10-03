"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Link from "next/link";

const BannerSlider = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current && activeIndex < slides.length - 1) {
      swiperRef.current.slideTo(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && activeIndex > 0) {
      swiperRef.current.slideTo(activeIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        resistance
        resistanceRatio={0}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => {
          const formattedDate = new Date(slide.tanggal).toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          );

          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full flex justify-center items-center">
                <div className="absolute top-0 left-0 w-1/3 h-full overflow-hidden opacity-60">
                  <img
                    src={slide.gambar}
                    alt={slide.judul}
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />
                </div>

                <div className="relative z-10 w-1/2 h-full cursor-grab">
                  <img
                    src={slide.gambar}
                    alt={slide.judul}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-12 mb-10 -ml-16 left-0 md:bottom-10 lg:m-8">
                    <p className="text-white text-lg font-bold text-shadow-lg">
                      Featured
                    </p>
                    <p className="text-white text-4xl md:text-6xl lg:text-5xl w-[300px] lg:w-[400px] font-bold overflow-hidden text-ellipsis line-clamp-2 text-shadow-lg">
                      {slide.judul}
                    </p>
                    <p className="text-white text-lg text-shadow-lg">
                      {formattedDate} • <b>{slide.kategori} •</b>
                      <Link
                        href={`/detail/berita/${slide._id}`}
                        className="text-sm hover:text-hint"
                      >
                        Lihat Lebih Detail
                      </Link>
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 flex m-8 cursor-pointer">
                    <div
                      onClick={activeIndex > 0 ? handlePrev : null}
                      className={
                        activeIndex === 0
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    >
                      <IoIosArrowDropleft
                        className={`text-5xl ${
                          activeIndex === 0 ? "text-gray-400" : "text-white"
                        }`}
                      />
                    </div>
                    <div
                      onClick={
                        activeIndex < slides.length - 1 ? handleNext : null
                      }
                      className={
                        activeIndex === slides.length - 1
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    >
                      <IoIosArrowDropright
                        className={`text-5xl ${
                          activeIndex === slides.length - 1
                            ? "text-gray-400"
                            : "text-white"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-60">
                  <img
                    src={slide.gambar}
                    alt={slide.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BannerSlider;

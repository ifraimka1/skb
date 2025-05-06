import { createContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useMedia } from "@/modules/media/hooks/useMedia";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Slider.styles.scss";
import { MediaItem } from "@/modules/media/api/get";

interface SliderProps {
  autoPlay?: boolean;
  autoPlayTime?: number;
  images?: string[];
  category?: string;
  customPerSlide: number;
}

interface SliderContextType {
  slideNumber: number;
  mediaList: MediaItem[];
  setSlideNumber?: (slideNumber: number) => void;
  goToSlide: (slideNumber: number) => void; // Added for Dot component
  slidesCount: number; // Added for Dots component
}

export const SliderContext = createContext<SliderContextType>({
  slideNumber: 0,
  mediaList: [],
  goToSlide: () => { },
  slidesCount: 0,
});

function Slider({
  autoPlay = false,
  autoPlayTime = 3000,
  images,
  category = "gallery",
  customPerSlide = 0,
}: SliderProps) {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [enableButtons, setEnableButtons] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const filteredMedia: MediaItem[] = images
    ? images.map((src, id) => ({ id, src, category: "", name: "" }))
    : mediaData?.filter((m) => m.category === category) || [];

  useEffect(() => {
    const count = filteredMedia.length;
    const threshold = customPerSlide > 0 ? customPerSlide : 2;
    setEnableButtons(count > threshold);
  }, [filteredMedia, customPerSlide]);

  if (isLoading)
    return (
      <div className="mainContainer">
        <span className="loader"></span>
      </div>
    );
  if (isError) return <div>Ошибка при загрузке медиа</div>;

  return (
    <SliderContext.Provider
      value={{
        slideNumber,
        mediaList: filteredMedia,
        goToSlide: setSlideNumber,
        slidesCount: filteredMedia.length,
      }}
    >
      <div className="slider">
        <div className="full-width-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerGroup={1}
            loop={enableButtons}
            navigation={enableButtons}
            pagination={{ clickable: enableButtons }}
            autoplay={
              autoPlay
                ? { delay: autoPlayTime, disableOnInteraction: false }
                : false
            }
            onSlideChange={(swiper) => setSlideNumber(swiper.activeIndex)}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: customPerSlide > 0 ? customPerSlide : 2 },
            }}
          >
            {filteredMedia.map((media) => (
              <SwiperSlide
                key={media.id}
                className={
                  filteredMedia.length === 1 ? "swiper-slide single" : "swiper-slide"
                }
              >
                <img
                  src={media.src}
                  alt={`slide-${media.id}`}
                  className="slide-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SliderContext.Provider>
  );
}

export default Slider;

import { createContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useMedia } from "@/modules/media/hooks/useMedia";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Slider.styles.scss";
import { MediaItem } from "@/modules/media/api/get";

import { SkeletonSlider } from "@/shared/Components/SkeletonSlider/SkeletonSlider";

interface SliderProps {
  autoPlay?: boolean;
  autoPlayTime?: number;
  images?: string[];
  category?: string;
  customPerSlide?: number;
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
  category,
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
      <div >
        {[...Array(1)].map((_, index) => (
          <SkeletonSlider key={index} />
        ))}
      </div>
    );
  if (isError) return <center>Ошибка при загрузке медиа</center>;

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
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerGroup={1}
            loop={true}
            lazyPreloadPrevNext={0}
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
            loopAddBlankSlides={true}
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
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </SliderContext.Provider>
  );
}

export default Slider;

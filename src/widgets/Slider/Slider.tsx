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
}

// Update the SliderContextType interface to include the missing properties
interface SliderContextType {
  slideNumber: number;
  mediaList: MediaItem[];
  setSlideNumber?: (slideNumber: number) => void;
  goToSlide: (slideNumber: number) => void; // Added for Dot component
  slidesCount: number; // Added for Dots component
}

// Then in your Slider component, update the context value:

// Create context with default values
export const SliderContext = createContext<SliderContextType>({
  slideNumber: 0,
  mediaList: [],
  goToSlide: () => {},
  slidesCount: 0,
});

function Slider({
  autoPlay = false,
  autoPlayTime = 3000,
  images,
  category = "gallery",
}: SliderProps) {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [itemsPerSlide, setItemsPerSlide] = useState<number>(
    window.innerWidth <= 768 ? 1 : 2
  );
  const [enableButtons, setEnableButtons] = useState<boolean>(false);
  const [slideNumber, setSlideNumber] = useState<number>(0);

  // Фильтруем медиа по категории
  const filteredMedia: MediaItem[] = images
    ? images.map((src, id) => ({ id, src, category: "", name: "" }))
    : mediaData?.filter((media) => media.category === category) || [];

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth <= 768 ? 1 : 2);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const numberOfSlides = filteredMedia.length;
    if (numberOfSlides > 2) {
      setEnableButtons(true);
    } else if (numberOfSlides === 1) {
      setItemsPerSlide(1);
    }
  }, [filteredMedia]);

  if (isLoading)
    return (
      <div className="mainContainer">
        <span className="loader"></span>
      </div>
    );
  if (isError) return <div>Ошибка при загрузке медиа</div>;

  // Create context value
  const contextValue: SliderContextType = {
    slideNumber,
    mediaList: filteredMedia,
    setSlideNumber,
    goToSlide: (slide: number) => setSlideNumber(slide),
    slidesCount: filteredMedia.length,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <div className="slider">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={itemsPerSlide}
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
        >
          {filteredMedia.map((media) => (
            <SwiperSlide
              key={media.id}
              className={
                filteredMedia.length === 1
                  ? "swiper-slide single"
                  : "swiper-slide"
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
    </SliderContext.Provider>
  );
}

export default Slider;

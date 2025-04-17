import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useMedia } from "@/modules/media/hooks/useMedia";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Slider.styles.scss";

interface SliderProps {
  autoPlay?: boolean;
  autoPlayTime?: number;
  images?: string[];
  category?: string;
}

function Slider({
  autoPlay = false,
  autoPlayTime = 3000,
  images,
  category = "gallery",
}: SliderProps) {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [itemsPerSlide, setItemsPerSlide] = useState(
    window.innerWidth <= 768 ? 1 : 2
  );
  const [enableButtons, setEnableButtons] = useState(false);

  // Фильтруем медиа по категории
  const filteredMedia = images
    ? images.map((src, id) => ({ id, src }))
    : mediaData?.filter((media) => media.category === category) || [];
  console.log(mediaData);
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

  return (
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
  );
}

export default Slider;

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useMedia } from "@/modules/media/hooks/useMedia";

import "swiper/css";
import "swiper/css/pagination";

import "./Slider.styles.scss";

import arrow from "../../shared/assets/images/arrow.svg";

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
  const swiperRef = useRef<any>(null);

  const filteredMedia = images
    ? images.map((src, id) => ({ id, src }))
    : mediaData?.filter((media) => media.category === category) || [];

    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        setItemsPerSlide(isMobile ? 1 : 2);
    
        // Показываем стрелки только если слайдов больше 2
        setEnableButtons(!isMobile && filteredMedia.length > 2);
      };
    
      window.addEventListener("resize", handleResize);
      handleResize(); // сразу вызываем
      return () => window.removeEventListener("resize", handleResize);
    }, [filteredMedia]);    

  if (isLoading)
    return (
      <div className="mainContainer">
        <span className="loader"></span>
      </div>
    );
  if (isError) return <div>Ошибка при загрузке медиа</div>;

  return (
    <div className={`slider ${enableButtons ? "has-pagination" : ""}`}>
      {/* Кастомные стрелки */}
      {enableButtons && (
        <div className="custom-navigation">
          <button className="custom-prev" onClick={() => swiperRef.current?.slidePrev()}>
            <img src={arrow} alt="prev" />
          </button>
          <button className="custom-next" onClick={() => swiperRef.current?.slideNext()}>
            <img src={arrow} alt="next" style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      )}

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={itemsPerSlide}
        slidesPerGroup={1}
        loop={enableButtons}
        pagination={{ clickable: enableButtons }}
        autoplay={
          autoPlay
            ? { delay: autoPlayTime, disableOnInteraction: false }
            : false
        }
        onSwiper={(swiper) => (swiperRef.current = swiper)}
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

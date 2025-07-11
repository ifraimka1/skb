import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useMedia } from "@/modules/media/hooks/useMedia";
import { SkeletonSlider } from "@/shared/Components/SkeletonSlider/SkeletonSlider";
import { MediaItem } from "@/modules/media/api/get";

import "swiper/css";
import "swiper/css/navigation";
import "./Slider.styles.scss";

import arrow from "@/shared/assets/images/arrow.svg";

import { SliderContext } from "./context";

interface SliderProps {
  autoPlay?: boolean;
  autoPlayTime?: number;
  images?: string[];
  category: string;
  customPerSlide?: number;
  variant?: "default" | "news";
}

interface SlideData extends MediaItem {
  is16to9: boolean;
}

const Slider = ({
  autoPlay = false,
  autoPlayTime = 3000,
  images,
  category,
  customPerSlide = 0,
  variant = "default",
}: SliderProps) => {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [mediaList, setMediaList] = useState<SlideData[]>([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const [enableButtons, setEnableButtons] = useState(false);

  const swiperRef = useRef<any>(null);
  const [slideNumber, setSlideNumber] = useState(0);

  const goToSlide = (num: number) => {
    swiperRef.current?.slideTo(num, 0);
    setSlideNumber(num);
  };

  const slidesCount = mediaList.length;

  useEffect(() => {
    const processMediaItems = async (items: MediaItem[]) => {
      const processedItems = await Promise.all(
        items.map(async (item) => {
          const is16to9 = await checkAspectRatio(item.src);
          return { ...item, is16to9 };
        })
      );
      setMediaList(processedItems);
    };

    const checkAspectRatio = (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const ratio = img.width / img.height;
          resolve(Math.abs(ratio - 16/9) < 0.1);
        };
        img.onerror = () => resolve(false);
      });
    };

    const mapped =
      images?.map((src, id) => ({ id, src, category: "", name: "" })) ||
      mediaData?.filter((m) => m.category === category) ||
      [];
      
    processMediaItems(mapped);
  }, [images, mediaData, category]);

  useEffect(() => {
    const updateLayout = () => {
      const isMobile = window.innerWidth <= 768;
      const slideCount = mediaList.length;

      setItemsPerSlide(
        slideCount === 1
          ? 1
          : variant === "news"
          ? isMobile
            ? 1
            : 1.4
          : isMobile
          ? 1
          : customPerSlide || 2
      );
      setEnableButtons(
        isMobile ? slideCount > 1 : slideCount > (customPerSlide || 2)
      );
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [mediaList, variant, customPerSlide]);

  if (isLoading) return <SkeletonSlider />;
  if (isError) return <center>Ошибка при загрузке медиа</center>;

  const sliderClass =
    variant === "news" && mediaList.length <= 2 ? "no-animation" : "";

  return (
    <SliderContext.Provider
      value={{ slideNumber, mediaList, goToSlide, slidesCount, setSlideNumber }}
    >
      <div className={`slider ${variant} ${sliderClass}`}>
        {enableButtons && (
          <div className="custom-navigation">
            <button
              className="custom-prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <img src={arrow} alt="prev" />
            </button>
            <button
              className="custom-next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <img
                src={arrow}
                alt="next"
                style={{ transform: "rotate(180deg)" }}
              />
            </button>
          </div>
        )}

        <Swiper
          modules={[Navigation]}
          spaceBetween={variant === "news" ? 20 : 30}
          slidesPerView={itemsPerSlide}
          centeredSlides={variant === "news" && mediaList.length > 1}
          slidesPerGroup={1}
          loop={enableButtons}
          autoplay={
            autoPlay
              ? { delay: autoPlayTime, disableOnInteraction: false }
              : false
          }
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSlideNumber(swiper.realIndex)}
        >
          {mediaList.map((media, index) => (
            <SwiperSlide
              key={media.id}
              className={`swiper-slide ${
                mediaList.length === 1 ? "single" : ""
              } ${media.is16to9 ? 'ratio-16-9' : ''}`}
            >
              <div className="slide-container">
                {!media.is16to9 && (
                  <div 
                    className="slide-background" 
                    style={{ backgroundImage: `url(${media.src})` }}
                  />
                )}
                <img
                  src={media.src}
                  alt={`slide-${index}`}
                  className="slide-image"
                  loading="lazy"
                  style={{
                    objectFit: media.is16to9 ? 'cover' : 'contain'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SliderContext.Provider>
  );
};

export default Slider;
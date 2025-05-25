import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useMedia } from "@/modules/media/hooks/useMedia";
import { MediaItem } from "@/modules/media/api/get";
import { SkeletonSlider } from "@/shared/Components/SkeletonSlider/SkeletonSlider";
import "./Slider.styles.scss";
import { SliderContext, SliderProps } from "@/widgets/Slider/context";

function Slider({
  autoPlay = false,
  autoPlayTime = 3000,
  images,
  category = "gallery",
  customPerSlide = 6,
}: SliderProps) {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [slideNumber, setSlideNumber] = useState(0);

  const filteredMedia: MediaItem[] = images
    ? images.map((src, id) => ({ id, src, category: "", name: "" }))
    : mediaData?.filter((m) => m.category === category) || [];

  const getSlidesPerView = (width: number = window.innerWidth) => {
    if (customPerSlide > 0) return customPerSlide;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    if (width < 1920) return 10;
    return 10;
  };
  const currentSlidesPerView = getSlidesPerView();

  const shouldShowNavigation = filteredMedia.length > currentSlidesPerView;
  const shouldShowDots = filteredMedia.length > currentSlidesPerView;

  const responsive = {
    0: { items: 1 },
    400: { items: 2 },
    600: { items: 3 },
    800: { items: 3 },
    1000: { items: 4 },
    1200: { items: 4 },
    1400: { items: 5 },
    1600: { items: 7 },
  };

  console.log("responsive object:", responsive);
  const items = filteredMedia.map((media) => (
    <div key={media.id} className="slider-item">
      <img
        src={media.src}
        alt={`slide-${media.id}`}
        className="slide-image"
        loading="lazy"
      />
    </div>
  ));

  const handleSlideChanged = (event: { item: number }) => {
    setSlideNumber(event.item);
  };

  const goToSlide = (index: number) => {
    setSlideNumber(index);
  };

  if (isLoading) return <SkeletonSlider />;
  if (isError) return <center>Ошибка при загрузке медиа</center>;
  if (filteredMedia.length === 0)
    return <div>Нет изображений для отображения</div>;

  return (
    <SliderContext.Provider
      value={{
        slideNumber,
        mediaList: filteredMedia,
        goToSlide,
        slidesCount: filteredMedia.length,
      }}
    >
      <div className="slider">
        <AliceCarousel
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          autoPlay={autoPlay && shouldShowNavigation}
          autoPlayInterval={autoPlayTime}
          infinite={shouldShowNavigation}
          disableDotsControls={!shouldShowDots}
          disableButtonsControls={!shouldShowNavigation}
          activeIndex={slideNumber}
          onSlideChanged={handleSlideChanged}
          mouseTracking={shouldShowNavigation}
          touchTracking={shouldShowNavigation}
          keyboardNavigation={shouldShowNavigation}
        />
      </div>
    </SliderContext.Provider>
  );
}

export default Slider;

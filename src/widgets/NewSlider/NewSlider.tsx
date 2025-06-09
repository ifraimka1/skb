import { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { MediaItem } from "@/modules/media/api/get";
import { useMedia } from "@/modules/media/hooks/useMedia";
import { SkeletonSlider } from "@/shared/Components/SkeletonSlider/SkeletonSlider";
import Vector from "@/shared/assets/images/LabBoard/Vector.svg";
import "./NewSlider.scss";
import { SliderContext, SliderProps } from "@/widgets/NewSlider/context";

function NewSlider({
  autoPlay = false,
  autoPlayTime = 3000,
  images,
  category = "gallery",
}: SliderProps) {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [slideNumber, setSlideNumber] = useState(0);

  const carouselRef = useRef<AliceCarousel | null>(null);

  const filteredMedia: MediaItem[] = images
    ? images.map((src, id) => ({ id, src, category: "", name: "" }))
    : mediaData?.filter((m) => m.category === category) || [];

  const responsive = {
    0: { items: 1 },
    768: { items: 1 },
    1024: { items: 5 },
  };

  const items = filteredMedia.map((media, index) => (
    <div
      key={media.id ?? index}
      className={`slider-item ${filteredMedia.length === 1 ? "single" : ""}`}
    >
      <img
        src={media.src}
        alt={`slide-${media.id}`}
        className="slide-image"
        loading="lazy"
        draggable={false}
      />
    </div>
  ));

  const handleSlideChanged = (event: { item: number }) => {
    setSlideNumber(event.item);
  };

  const slidePrev = () => {
    carouselRef.current?.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current?.slideNext();
  };

  if (isLoading) return <SkeletonSlider />;
  if (isError) return <center>Ошибка при загрузке медиа</center>;
  if (filteredMedia.length === 0) return <div>Нет изображений для отображения</div>;

  return (
    <SliderContext.Provider
      value={{
        slideNumber,
        mediaList: filteredMedia,
        goToSlide: setSlideNumber,
        slidesCount: filteredMedia.length,
      }}
    >
      <div className="slider-container">
        <div className="sliderNav">
          <button className="sliderButton prev" onClick={slidePrev}>
            <img src={Vector} alt="Previous" />
          </button>
          <button className="sliderButton" onClick={slideNext}>
            <img src={Vector} alt="Next" />
          </button>
        </div>
        <div className="slider">
          <AliceCarousel
            ref={carouselRef}
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            autoPlay={autoPlay}
            autoPlayInterval={autoPlayTime}
            infinite={true}
            disableDotsControls={true}
            disableButtonsControls={true}
            activeIndex={slideNumber}
            onSlideChanged={handleSlideChanged}
            mouseTracking={true}
            touchTracking={true}
            keyboardNavigation={true}
          />
        </div>
      </div>
    </SliderContext.Provider>
  );
}

export default NewSlider;

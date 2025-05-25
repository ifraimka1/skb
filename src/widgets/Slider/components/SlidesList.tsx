import { useContext } from "react";
import Slide from "./Slide";

import { MediaItem } from "@/modules/media/api/get";
import { SliderContext } from "@/widgets/Slider/context";

export default function SlidesList() {
  const { slideNumber, mediaList } = useContext(SliderContext);

  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {mediaList.map((slide: MediaItem, index: number) => (
        <Slide key={index} slide={slide.src} />
      ))}
    </div>
  );
}

import { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "../Slider";
import { MediaItem } from "@/modules/media/api/get";

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

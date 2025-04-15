import { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "../Slider";

export default function SlidesList() {
  const { slideNumber, mediaList } = useContext(SliderContext);

  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {mediaList.map((slide, index) => (
        <Slide key={index} slide={slide.src} />
      ))}
    </div>
  );
}
import { useContext } from "react";
import { SliderContext } from "../context";

import arrow from "@/shared/assets/images/arrow.svg";
import "./Arrows.styles.scss";
interface ArrowsProps {
  prevSlide: () => void;
  nextSlide: () => void;
}
export default function Arrows({ prevSlide, nextSlide }: ArrowsProps) {
  const { mediaList } = useContext(SliderContext);
  if (mediaList.length <= 1) {
    return null;
  }
  return (
    <div className="arrows">
      <div className="arrow left" onClick={prevSlide}>
        <img src={arrow} alt="" />
      </div>
      <div className="arrow right" onClick={nextSlide}>
        <img src={arrow} alt="" />
      </div>
    </div>
  );
}

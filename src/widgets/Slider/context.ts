import { MediaItem } from "@/modules/media/api/get";
import { createContext } from "react";

export interface SliderProps {
  autoPlay?: boolean;
  autoPlayTime?: number;
  images?: string[];
  category?: string;
  customPerSlide?: number;
}
export interface SliderContextType {
  slideNumber: number;
  mediaList: MediaItem[];
  setSlideNumber?: (slideNumber: number) => void;
  goToSlide: (slideNumber: number) => void;
  slidesCount: number;
}
export const SliderContext = createContext<SliderContextType>({
  slideNumber: 0,
  mediaList: [],
  goToSlide: () => {},
  slidesCount: 0,
});

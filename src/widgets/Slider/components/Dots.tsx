import { useContext } from "react";

import Dot from "./Dot"; // Fixed import - was incorrectly importing from "./Dots"
import { ReactElement } from "react";
import { SliderContext } from "@/widgets/Slider/context";

function Dots(): ReactElement {
  const { slidesCount } = useContext(SliderContext);

  const renderDots = (): ReactElement[] => {
    const dots: ReactElement[] = [];
    for (let i = 0; i < slidesCount; i++) {
      dots.push(<Dot key={`dot-${i}`} number={i} />);
    }

    return dots;
  };

  return <div className="dots">{renderDots()}</div>;
}

export default Dots;

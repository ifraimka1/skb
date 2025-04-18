import { useContext } from "react";
import { SliderContext } from "../Slider";
import { ReactElement } from "react";

interface DotProps {
  number: number;
}

function Dot({ number }: DotProps): ReactElement {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
      className={`dot ${slideNumber === number ? "selected" : ""}`}
      onClick={() => goToSlide(number)}
    />
  );
}

export default Dot;

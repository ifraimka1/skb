import React, { useContext } from "react";
import { SliderContext } from "../Slider";

import { arrow } from '../../../assets/images';
import './Arrows.styles.scss';

function Arrows() {
    const { changeSlide } = useContext(SliderContext);

    return (
        <div className="arrows">
            <div className="arrow left" onClick={() => changeSlide(-1)}>
                <img src={ arrow } alt="" />
            </div>
            <div className="arrow right" onClick={() => changeSlide(1)}>
                <img src={ arrow } alt="" />
            </div>
        </div>
    );
}

export default Arrows;
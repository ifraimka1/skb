import { useEffect, useState, createContext } from 'react';

import Arrows from './components/Arrows';
import SlidesList from './components/SlidesList';
import Dots from './components/Dots';

//import { getSliderImages } from '../../api';
import { g1, g2, g3 } from '../../images/gallery';
import './Slider.styles.scss';

export const SliderContext = createContext();

function Slider({ autoPlay = 1, autoPlayTime = 1 }) {
    const [items, setItems] = useState([]);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const loadData = () => {
          const images = [g1, g2, g3];
          setItems(images);
        };
        loadData();
      }, []);

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = items.length - 1;
        } else {
            slideNumber = (slide + direction) % items.length;
        }

        setSlide(slideNumber);
    }

    const goToSlide = (number) => {
        setSlide(number % items.length);
    }

    useEffect(() => {
        if (!autoPlay) return;
    
        const interval = setInterval(() => {
          changeSlide(1);
        }, autoPlayTime);
    
        return () => {
          clearInterval(interval);
        };
      }, [items.length, slide]);

    return (
        <div className="slider">
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                    items
                }}
            >
                <Arrows />
                <SlidesList />
                <Dots />
            </SliderContext.Provider>
        </div>
    );
}
export default Slider;
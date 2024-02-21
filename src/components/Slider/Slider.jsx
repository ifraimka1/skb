import { useEffect, useState, createContext } from 'react';

import Arrows from './components/Arrows';
import SlidesList from './components/SlidesList';
import Dots from './components/Dots';

import { getSliderImages } from '../../api';
import './Slider.styles.scss';

export const SliderContext = createContext();

function Slider({ autoPlay = 0, autoPlayTime = 0 }) {
    const [items, setItems] = useState([]);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const loadData = async () => {
          const images = await getSliderImages();
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
    };

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
                {/* <Dots /> */}
            </SliderContext.Provider>
        </div>
    );
}
export default Slider;
import { useEffect, useState, createContext } from 'react';

import Arrows from './components/Arrows';
import SlidesList from './components/SlidesList';
// import Dots from './components/Dots';

import { getMedia } from '../../api';
import './Slider.styles.scss';

export const SliderContext = createContext();

function Slider({ autoPlay = 0, autoPlayTime = 0, images = false }) {
    const [mediaList, setMediaList] = useState([images]);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            let newMediaList;

            if (images) {
                newMediaList = images.map((value, key) => {
                    return { id: key, src: value };
                });
            } else {
                newMediaList = await getMedia('gallery');
            }
            
            setMediaList(newMediaList);
            console.log('sliderMedia', newMediaList);
        };

        console.log(images);
        loadData();
    }, []);

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = mediaList.length - 1;
        } else {
            slideNumber = (slide + direction) % mediaList.length;
        }

        setSlide(slideNumber);
    };

    const goToSlide = (number) => {
        setSlide(number % mediaList.length);
    }

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [mediaList.length, slide]);

    return (
        <div className="slider">
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: mediaList.length,
                    slideNumber: slide,
                    mediaList
                }}
            >
                { mediaList.length > 1 && <Arrows /> }
                <SlidesList />
                {/* <Dots /> */}
            </SliderContext.Provider>
        </div>
    );
}
export default Slider;
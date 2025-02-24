import { useEffect, useState, createContext } from 'react';

import Arrows from './components/Arrows';
import SlidesList from './components/SlidesList';
// import Dots from './components/Dots';

import { getMedia } from '../../api';
import './Slider.styles.scss';

export const SliderContext = createContext();

function Slider({ autoPlay = 0, autoPlayTime = 0, images = false }) {
    const [mediaList, setMediaList] = useState([]);
    const [slide, setSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(window.innerWidth <= 768 ? 1 : 2);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerSlide(window.innerWidth <= 768 ? 1 : 2);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
    }, [images]);

    const changeSlide = (direction) => {
        if (mediaList.length <= itemsPerSlide) return;

        let slideNumber = slide + direction;
        
        if (direction === -1 && slideNumber < 0) return;
        if (direction === 1 && slideNumber + itemsPerSlide > mediaList.length) return;
        
        setSlide(slideNumber);
    };

    const goToSlide = (number) => {
        if (number >= 0 && number + itemsPerSlide <= mediaList.length) {
            setSlide(number);
        }
    }

    useEffect(() => {
        if (!autoPlay || mediaList.length <= itemsPerSlide) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => clearInterval(interval);
    }, [mediaList.length, slide, itemsPerSlide]);

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
                { mediaList.length > itemsPerSlide && <Arrows /> }
                <SlidesList />
                {/* <Dots /> */}
            </SliderContext.Provider>
        </div>
    );
}
export default Slider;
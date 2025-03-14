import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getMedia } from '../../api';
import './Slider.styles.scss';

function Slider({ autoPlay = false, autoPlayTime = 3000, images = false }) {
    const [mediaList, setMediaList] = useState([]);
    const [itemsPerSlide, setItemsPerSlide] = useState(window.innerWidth <= 768 ? 1 : 2);
    const [enableButtons, setEnableButtons] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerSlide(window.innerWidth <= 768 ? 1 : 2);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadData = async () => {
            console.log('hello');
            const newMediaList = images
                ? images.map((value, key) => ({ id: key, src: value }))
                : await getMedia('gallery');

            setMediaList(newMediaList);

            const numberOfSlides = newMediaList.length;
            if (numberOfSlides > 2) {
                setEnableButtons(true);
            } else if (numberOfSlides == 1) {
                setItemsPerSlide(1);
            }
        };

        loadData();
    }, [images]);

    // Условие для проверки количества слайдов
    const totalSlides = mediaList.length;

    return (
        <div className="slider">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={itemsPerSlide}
                slidesPerGroup={1}
                loop={enableButtons}
                navigation={enableButtons}
                pagination={{ clickable: enableButtons }}
                autoplay={autoPlay ? { delay: autoPlayTime, disableOnInteraction: false } : false}
            >
                {mediaList.map((media, index) => (
                    <SwiperSlide
                        key={media.id} className={totalSlides === 1 ? 'swiper-slide single' : 'swiper-slide'}
                    >
                        <img
                            src={media.src}
                            alt={`slide-${index}`}
                            className='slide-image'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slider;

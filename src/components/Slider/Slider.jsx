import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getMedia } from '../../api';
import './Slider.styles.scss';

function Slider({ autoPlay = false, autoPlayTime = 3000, images = false, variant = "default" }) {
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
            const newMediaList = images
                ? images.map((value, key) => ({ id: key, src: value }))
                : await getMedia('gallery');

            setMediaList(newMediaList);
            setEnableButtons(newMediaList.length > 1);
        };

        loadData();
    }, [images]);

    // Фиксим центрирование 1 слайда
    const slidesView = mediaList.length === 1 ? 1 : (variant === "news" ? (window.innerWidth <= 768 ? 1 : 1.4) : itemsPerSlide);

    return (
        <div className={`slider ${variant}`}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={variant === "news" ? 20 : 30}
                slidesPerView={slidesView}
                centeredSlides={mediaList.length === 1 ? false : variant === "news"}
                slidesPerGroup={1}
                loop={enableButtons}
                navigation={enableButtons}
                pagination={{ clickable: enableButtons }}
                autoplay={autoPlay ? { delay: autoPlayTime, disableOnInteraction: false } : false}
            >
                {mediaList.map((media, index) => (
                    <SwiperSlide key={media.id} className={mediaList.length === 1 ? 'swiper-slide single' : 'swiper-slide'}>
                        <img src={media.src} alt={`slide-${index}`} className='slide-image' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slider;

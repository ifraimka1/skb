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
        };

        loadData();
    }, [images]);

    return (
        <div className="slider">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={itemsPerSlide} // Количество картинок в видимой зоне
                slidesPerGroup={itemsPerSlide} // Перелистывать сразу по 2
                loop={true} // Зацикленный слайдер
                navigation // Стрелки
                pagination={{ clickable: true }}
                autoplay={autoPlay ? { delay: autoPlayTime, disableOnInteraction: false } : false}
            >
                {mediaList.map((media) => (
                    <SwiperSlide key={media.id}>
                        <img src={media.src} alt="slide" className="slide-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slider;
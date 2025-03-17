import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getMedia } from '../../api';
import './Slider.styles.scss';

import arrow from "../../assets/images/arrow.svg";

function Slider({ autoPlay = false, autoPlayTime = 3000, images = false, variant = "default" }) {
    const [mediaList, setMediaList] = useState([]);
    const [itemsPerSlide, setItemsPerSlide] = useState(window.innerWidth <= 768 ? 1 : 2);
    const [enableButtons, setEnableButtons] = useState(false);

    const swiperRef = useRef(null); // для кнопок

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            setItemsPerSlide(isMobile ? 1 : 2);
    
            // Показываем кнопки, если на мобильной версии показывается 1 картинка, а всего их больше 1
            setEnableButtons(isMobile ? mediaList.length > 1 : mediaList.length > 2);
        };
    
        window.addEventListener('resize', handleResize);
        handleResize(); // Вызываем сразу, чтобы не ждать первого ресайза
    
        return () => window.removeEventListener('resize', handleResize);
    }, [mediaList]);

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

    // Проверяем, сколько изображений, чтобы отключить анимацию для 2 или менее изображений
    const sliderClass = mediaList.length <= 2 && variant === 'news' ? 'no-animation' : '';


   return (
        <div className={`slider ${variant} ${sliderClass}`}>
            {/* Кастомные стрелки */}
            {enableButtons && (
                <div className="custom-navigation">
                    <button className="custom-prev" onClick={() => swiperRef.current?.slidePrev()}><img src={arrow} alt="prev"/></button>
                    <button className="custom-next" onClick={() => swiperRef.current?.slideNext()}><img src={arrow} alt="next" style={{ transform: "rotate(180deg)" }}/></button>
                </div>
            )}

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={variant === "news" ? 20 : 30}
                slidesPerView={slidesView}
                centeredSlides={mediaList.length === 1 ? false : variant === "news"}
                slidesPerGroup={1}
                loop={enableButtons}
                pagination={{ clickable: enableButtons }}
                autoplay={autoPlay ? { delay: autoPlayTime, disableOnInteraction: false } : false}
                onSwiper={(swiper) => (swiperRef.current = swiper)} // Связываем Swiper с ref
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

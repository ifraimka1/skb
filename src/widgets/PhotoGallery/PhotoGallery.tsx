import { useState, useEffect, useRef, useCallback } from "react";
import { useMedia } from "@/modules/media/hooks/useMedia";
import { SkeletonGallery } from "@/shared/Components/SkeletonGallery/SkeletonGallery";
import "./PhotoGallery.style.scss";
import HWaC1 from "@/shared/assets/images/hard_work_and_creativity/HWaC1.jpg";
import HWaC2 from "@/shared/assets/images/hard_work_and_creativity/HWaC2.jpg";

const PhotoGallery = () => {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth <= 768;

  const galleryImages = mediaData?.filter((el) => el.category === "photogallery");

  const loadMore = useCallback(() => {
    if (isLoadingMore || !galleryImages || visibleCount >= galleryImages.length) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 10);
      setIsLoadingMore(false);
    }, 800);
  }, [galleryImages, isLoadingMore, visibleCount]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const threshold = isMobile ? 0.98 : 1; // 50% на мобиле, 98% на десктопе
      
      if (scrollTop + clientHeight >= scrollHeight * threshold) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, isMobile]);

  if (isLoading) {
    return <SkeletonGallery />;
  }

  if (isError || !galleryImages || galleryImages.length === 0) {
    return <center>Ошибка при загрузке медиа</center>;
  }

  return (
    <div className="mainContainer" ref={containerRef}>
      <h1 className="title">Трудолюбие и креативность</h1>
      <div className="creativity-section">
        <div className="creativity-text-top">
          <p>
            Проверено опытом: для решения задач, которые перед нами стоят,
            важны максимальная вовлеченность в инженерное творчество и желание изменить мир к лучшему, хотя бы вокруг себя.
          </p>
        </div>
        <div className="creativity-images">
          <img src={HWaC1} alt="Creative 1" />
          <img src={HWaC2} alt="Creative 2" />
        </div>
        <div className="creativity-text-bottom">
          <p>
            Создание чего‑то нового — всегда творческий процесс. Для нас очень важно умение решать возникающие трудности
            и находить выход из нестандартных ситуаций. Мы всегда учимся, развиваемся и совершенствуемся.
          </p>
        </div>
      </div>

      <h1 className="title">Фотогалерея</h1>
      <div className="images">
        {galleryImages.slice(0, visibleCount).map((media) => (
          <div key={media.id} className="image-container">
            <img
              src={media.src}
              alt={`slide-${media.id}`}
              className="slide-image"
            />
          </div>
        ))}
      </div>

      {visibleCount < galleryImages.length && (
        <div 
          className={`btn ${isLoadingMore ? 'loading' : ''}`} 
          onClick={loadMore}
        >
          {isLoadingMore ? 'Загрузка...' : 'Загрузить ещё'}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
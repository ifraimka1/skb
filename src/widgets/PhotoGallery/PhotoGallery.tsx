import { useState } from "react";
import { useMedia } from "@/modules/media/hooks/useMedia";
import { SkeletonGallery } from "@/shared/Components/SkeletonGallery/SkeletonGallery";

import "./PhotoGallery.style.scss"
import HWaC1 from "@/shared/assets/images/hard_work_and_creativity/HWaC1.jpg";
import HWaC2 from "@/shared/assets/images/hard_work_and_creativity/HWaC2.jpg";

interface PhotoGalleryProps {
  images?: string[];
  category?: string;
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [visibleCount] = useState(10);

  const filteredMedia = images
    ? images.map((src, id) => ({ id, src }))
    : mediaData || [];

  if (isLoading) {
    return (
      <div>
        <SkeletonGallery />
      </div>
    );
  }

  if (isError || !filteredMedia || filteredMedia.length === 0) {
    return <center>Ошибка при загрузке медиа</center>;
  }

  return (
    <div className="mainContainer">
      <h1 className="title">Трудолюбие и креативность</h1>
      <div className="creativity-section">
        <div className="creativity-text-top">
          <p>
            Проверено опытом: для решения задач, которые перед нами стоят,
            важны максимальная вовлеченность в инженерное творчество и желание изменить мир к лучшему, хотя бы вокруг себя.
          </p>
        </div>
        <div className="creativity-images">
          <img src={HWaC1} />
          <img src={HWaC2} />
        </div>
        <div className="creativity-text-bottom">
          <p>
            Создание чего‑то нового — всегда творческий процесс. Для нас очень важно умение решать возникающие трудности
            и находить выход из нестандартных ситуаций. Мы всегда учимся, развиваемся и совершенствуемся.
          </p>
        </div>
      </div>

      <h1 className="title">Фотогалерея</h1>
      <div className="images">
        {filteredMedia.slice(0, visibleCount).map((media) => (
          <div key={media.id} className="image-container">
            <img
              src={media.src}
              alt={`slide-${media.id}`}
              className="slide-image"
            />
          </div>
        ))}
      </div>
      <div className="btn">Загрузить ещё</div>
    </div>
  );
};


export default PhotoGallery;

import { useState } from "react";
import { useMedia } from "@/modules/media/hooks/useMedia";
import { SkeletonGallery } from "@/shared/Components/SkeletonGallery/SkeletonGallery";

import "./PhotoGallery.style.scss"

const PhotoGallery = () => {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [visibleCount] = useState(10);

  const filteredMedia = mediaData?.filter((el) => el.category === "gallery") || [];

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

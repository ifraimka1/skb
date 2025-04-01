import MediaContainer from "@/widgets/MediaBlock/MediaContainer";
import "./MediaBlock.styles.scss";

function MediaBlock({ images }) {
  return (
    <div className="media-block">
      {images.map((item, index) => (
        <MediaContainer src={item} key={index} />
      ))}
    </div>
  );
}

export default MediaBlock;

import MediaContainer from "@/widgets/MediaBlock/MediaContainer";
import "./MediaBlock.styles.scss";
import { ReactElement } from "react";

interface MediaBlockProps {
  images: string[];
}

function MediaBlock({ images }: MediaBlockProps): ReactElement {
  return (
    <div className="media-block">
      {images.map((item, index) => (
        <MediaContainer src={item} key={index} />
      ))}
    </div>
  );
}

export default MediaBlock;

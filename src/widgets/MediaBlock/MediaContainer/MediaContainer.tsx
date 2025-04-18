import { ReactElement } from "react";

interface MediaContainerProps {
  src: string;
}

function MediaContainer({ src }: MediaContainerProps): ReactElement {
  return (
    <div className="media-container">
      <img className="image" alt="" src={src} />
    </div>
  );
}

export default MediaContainer;

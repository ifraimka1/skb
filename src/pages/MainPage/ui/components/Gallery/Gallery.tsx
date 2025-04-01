import Slider from "@/widgets/Slider/Slider";
import "./Gallery.styles.scss";

function Gallery() {
  return (
    <div id="gallery">
      <br />
      <br />
      <h1>
        СКБ «КИТ» - реальные технологические
        <br />
        проекты под руководством наставников
        <br />
        из университета и бизнеса.
      </h1>
      <Slider />
    </div>
  );
}

export default Gallery;

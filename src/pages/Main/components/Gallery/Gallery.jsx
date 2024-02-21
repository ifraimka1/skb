import Slider from '../../../../components/Slider';

import './Gallery.styles.scss';

function Gallery() {
    return (
        <div className="block gallery">
            <h1>СКБ «КИТ» - реальные технологические проекты<br/>
                под руководством наставников<br/>
                из университета и бизнеса.</h1>
            <Slider />
        </div>
    );
}

export default Gallery;
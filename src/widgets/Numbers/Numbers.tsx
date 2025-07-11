import "./Numbers.styles.scss";
import { Illustration } from '@/shared/assets/images/numbers';
import { useState } from 'react';

const Numbers = () => {
    const currentYear = new Date().getFullYear();
    const yearsSince2015 = currentYear - 2015;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="block" id="numbers">
            <h2 className="title">СКБ «КИТ» в цифрах</h2>
            <div className="block-content">
                <div className="numbers-grid">
                    <div className='blocks'>
                        <p className="namber">{yearsSince2015}</p>
                        <label>лет успешной работы</label>
                    </div>
                    <div className='blocks'>
                        <p className="namber">20+</p>
                        <label>сотрудников</label>
                    </div>
                    <div className='blocks'>
                        <p className="namber">30+</p>
                        <label>выполненных проектов</label>
                    </div>
                    <div className='blocks'>
                        <p className="namber">50+</p>
                        <label>побед в конкурсах</label>
                    </div>
                    <div className='blocks'>
                        <p className="namber">100+</p>
                        <label>обученных школьников</label>
                    </div>
                    <div className='blocks'>
                        <p className="namber">500+</p>
                        <label>обученных студентов</label>
                    </div>
                </div>
                <div
                    className="image-wrapper"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        className="visible"
                        src={isHovered ? Illustration : Illustration}
                        alt="СКБ КИТ"
                        draggable="false"
                    />
                </div>
            </div>
        </div>
    );
};

export default Numbers;
import "./Numbers.styles.scss";
import { Illustration } from '@/shared/assets/images/numbers';

const Numbers = () => {
    const currentYear = new Date().getFullYear();
    const yearsSince2015 = currentYear - 2015;

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
                </div>
                <img className="visible" src={Illustration} alt="Illustration" />
            </div>
        </div>
    );
};

export default Numbers;
import "./Numbers.styles.scss";
import { ten, twenty, thirty, Illustration } from '../../shared/assets/images/numbers';

const Numbers = () => {

  return (
    <div className="block" id="numbers" style={{ marginBottom: "48px" }}>
            <h2 className="title">СКБ «КИТ» в цифрах"</h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
                <div className="gap01" style={{ display: "flex", flexDirection: "column" }}>
                    <div className='blocks'>
                        <img src={ten} alt="10" />
                        <label>лет успешной работы</label>
                    </div>
                    <div className='blocks'>
                        <img src={twenty} alt="20+" />
                        <label>сотрудников</label>
                    </div>
                    <div className='blocks'>
                        <img src={thirty} alt="30+" />
                        <label>выполненных проектов</label>
                    </div>
                </div>
                <div className="gap01" style={{ display: "flex", flexDirection: "column" }}>
                    <div className='blocks'>
                        <img src={ten} alt="10" />
                        <label>лет успешной работы</label>
                    </div>
                    <div className='blocks'>
                        <img src={twenty} alt="20+" />
                        <label>сотрудников</label>
                    </div>
                    <div className='blocks'>
                        <img src={thirty} alt="30+" />
                        <label>выполненных проектов</label>
                    </div>
                </div>
                <img className="visible" src={Illustration} alt="Illustration" />
            </div>
        </div>
  );
};

export default Numbers;
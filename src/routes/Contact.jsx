import Navbar from '../components/Navbar/Navbar';

function Contact() {
    return (
        <>
            <header className='header'>
                <h1>Студенческое конструкторское бюро<br />
                    "Компьютерное инновационное творчество"</h1>
            </header>
            <div className="contact">
                <p>Контактное лицо: Кутковой Владимир Сергеевич</p>
            </div>
            <form className="form">
                <label htmlFor="topic-input">Тема</label>
                <input type="text" name="topic" id="topic-input" />
                <label htmlFor="email">Почта</label>
                <input type="text" name="email-input" id="email-input" />
                <label htmlFor="message">Сообщение</label>
                <input type="text" name="message-input" id="message-input" />
            </form>
        </>
    );
}

export default Contact;
import { Form } from "react-router-dom";

import './ContactUs.styles.scss';

function ContactUs() {
    return (
        <div className="block contact-us">
            <h1 className="half">Нужна помощь? Команда способных
                IT-специалистов готова вам помочь!</h1>
            <Form method="post" className="half contact-form">
                <h2>Свяжитесь с нами!</h2>
                <input type="text" name="name" />
                <input type="email" name="email" />
                <input type="text" name="text" />
                <input type="file" name="file" />
                <input type="submit" className="submit btn" />
            </Form>
        </div>
    );
}

export default ContactUs;
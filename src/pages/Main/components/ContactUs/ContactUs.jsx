import { Form } from "react-router-dom";

import { fileUpload } from "../../../../images";
import './ContactUs.styles.scss';

function ContactUs() {
    return (
        <div className="block contact-us">
            <h1 className="half">Нужна помощь? Команда способных
                IT-специалистов готова вам помочь!</h1>
            <Form method="post" className="half contact-form">
                <h2>Свяжитесь с нами!</h2>
                <div className="inputs">
                    <input type="text" name="name" placeholder="Имя" className="field" />
                    <input type="email" name="email" placeholder="E-mail" className="field" />
                    <textarea name="text" placeholder="Опишите в этом поле свой проект и, по возможности, прикрепите файл с ТЗ" className="field big" />
                    <label className="file-input">
                        <input type="file" name="file" />
                        <img src={ fileUpload } alt="" className="icon" />
                        <span>Прикрепить файл</span>
                    </label>
                    <input type="submit" className="submit btn" />
                </div>
            </Form>
        </div>
    );
}

export default ContactUs;
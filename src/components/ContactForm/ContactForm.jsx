import { Form } from "react-router-dom";

import Field from "../Field";

import "./ContactForm.styles.scss";

import { fileUpload } from "../../assets/images";

function ContactForm() {
    return (
        <Form method="post" className="half contact-form">
            <h2>Свяжитесь с нами!</h2>
            <div className="inputs">
                <div className="row">
                    <Field
                        key={1}
                        type="text"
                        name="name"
                        placeholder="Имя"
                    />
                    <Field
                        key={2}
                        type="email"
                        name="email"
                        placeholder="E-mail"
                    />
                </div>
                <Field
                    key={3}
                    type="textarea"
                    name="text"
                    placeholder="Опишите в этом поле свой проект и, по возможности, прикрепите файл с ТЗ"
                />
                <div className="row">
                    <Field
                        key={4}
                        type="file"
                        name="file"
                        icon={fileUpload}
                    />
                    <Field
                        key={5}
                        type="submit"
                    />
                </div>
            </div>
        </Form>
    );
}

export default ContactForm;
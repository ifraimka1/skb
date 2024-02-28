import { Form } from "react-router-dom";

import Field from "../Field";

import "./ContactForm.styles.scss";

import { fileUpload } from "../../assets/images";

const mock = [
    {
        id: 1,
        type: "text",
        name: "name",
        placeholder: "Имя",
    },
    {
        id: 2,
        type: "email",
        name: "email",
        placeholder: "E-mail",
    },
    {
        id: 3,
        type: "textarea",
        name: "text",
        placeholder: "Опишите в этом поле свой проект и, по возможности, прикрепите файл с ТЗ",
    },
    {
        id: 4,
        type: "file",
        name: "file",
        icon: fileUpload,
    },
    {
        id: 5,
        type: "submit",
    }
];

function ContactForm({ fields = mock }) {
    return (
        <Form method="post" className="half contact-form">
            <h2>Свяжитесь с нами!</h2>
            <div className="inputs">
                {fields.map(item =>
                    <Field
                        key={item.id}
                        type={item.type}
                        name={item.name}
                        placeholder={item.placeholder}
                        icon={item.icon}
                    />
                )}
            </div>
        </Form>
    );
}

export default ContactForm;
import ContactForm from "../../../../components/ContactForm"

import './ContactUs.styles.scss';

function ContactUs() {
    return (
        <div className="block contact-us">
            <h1 className="half">Нужна помощь?<br/> Команда способных IT-специалистов готова вам помочь!</h1>
            <ContactForm />
        </div>
    );
}

export default ContactUs;
import ContactForm from "@/widgets/ContactForm";
import "./ContactUs.styles.scss";

function ContactUs() {
  return (
    <>
      <div className="block" id="contact-us">
        <div className="half">
        <h1>
          Есть вопросы?
        </h1>
        <h2>Наша команда всегда<br/>готова вам помочь</h2>
        </div>
        <ContactForm />
      </div>
    </>
  );
}

export default ContactUs;

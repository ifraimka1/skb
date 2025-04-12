import ContactForm from "@/widgets/ContactForm";
import "./ContactUs.styles.scss";

function ContactUs() {
  return (
    <>
      <br />
      <div className="block" id="contact-us">
        <h1 className="half">
          Есть вопросы?
          <br /> Команда способных<br />IT-специалистов готова<br />вам помочь!
        </h1>
        <ContactForm />
      </div>
    </>
  );
}

export default ContactUs;

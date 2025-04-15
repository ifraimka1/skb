import ContactForm from "@/widgets/ContactForm";
import "./ContactUs.styles.scss";

function ContactUs() {
  return (
    <>
      <br />
      <div className="block" id="contact-us">
        <h1 className="half">
          Нужна помощь?
          <br /> Команда способных IT-специалистов готова вам помочь!
        </h1>
        <ContactForm />
      </div>
    </>
  );
}

export default ContactUs;

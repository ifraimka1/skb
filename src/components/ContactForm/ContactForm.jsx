import { useCallback, useState } from "react";
import { Form } from "react-router-dom";
import { SmartCaptcha } from "@yandex/smart-captcha";

import { sendContactForm } from "../../api";
import Field from "../Field";
import "./ContactForm.styles.scss";


function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null,
    captcha: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mb = 10; // Ограничение размера в мегабайтах
  const MAX_FILE_SIZE = mb * 1024 * 1024; // Переменная для проверки размера. Не менять

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Проверка размера
    if (file.size > MAX_FILE_SIZE) {
      alert(`Превышено ограничение размера файла (10 Мб)`);
      return;
    }
    // Проверка расширения
    const extension = file.name.match(/\.([^.]+)$/)[1];
    switch (extension) {
      case 'doc':
      case 'docx':
      case 'pdf':
      case 'txt':
      case 'pptx':
      case 'ppt':
        setFormData({ ...formData, file: e.target.files[0] });
        break;
      default:
        alert('Неверный формат файла.');
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, file: null });
  };

  const handleCaptchaChange = (token) => {
    setFormData({ ...formData, captcha: token });
    console.log('Капча пришла');
  };

  const handleTokenExpired = useCallback(() => {
    setFormData({ ...formData, captcha: null });
    console.log('Капча просрочилась');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('handleSubmit isSubmitting: ', isSubmitting);

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('message', formData.message);
    formDataObj.append('file', formData.file);
    formDataObj.append('captcha', formData.captcha);

    try {
      const response = await sendContactForm(formDataObj);
      if (response) {
        alert('Сообщение отправлено!');
        console.log('response', response);
      } else {
        alert('Ошибка отправки.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка отправки.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit} className="half contact-form">
      <h2>Свяжитесь с нами!</h2>
      <div className="inputs">
        <Field
          key={1}
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
          isDisabled={isSubmitting}
        />
        <Field
          key={2}
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
          isDisabled={isSubmitting}
        />
        <Field
          key={3}
          type="textarea"
          name="message"
          placeholder="Опишите в этом поле свой проект и, по возможности, прикрепите файл с ТЗ"
          value={formData.message}
          onChange={handleChange}
          required
          isDisabled={isSubmitting}
        />
        <Field
          key={4}
          type="file"
          name="file"
          onChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
          fileAttached={formData && formData.file ? true : false}
          isDisabled={isSubmitting}
        />
        <div className="submit-container">
          {formData.captcha &&
            <Field
              key={5}
              type="submit"
              value={isSubmitting ? 'Отправляется' : 'Отправить'}
              isDisabled={isSubmitting}
            />
          }
          <div
            className="captcha-container"
            style={formData.captcha ? { display: 'none' } : { display: 'block' }}
          >
            <SmartCaptcha
              key={6}
              sitekey="ysc1_8nFqhYasby2fJ9J7pCTxdBMe0Xc3Y6CrWk4aylB03d4f0045"
              onSuccess={handleCaptchaChange}
              onTokenExpired={handleTokenExpired}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ContactForm;
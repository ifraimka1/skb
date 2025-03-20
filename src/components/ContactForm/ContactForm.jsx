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
    phone: '', //
    message: '',
    file: null,
    captcha: '',
    agree: false, //
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
  
    // Если строка пустая или содержит только "7", сбрасываем поле
    if (value.length === 0 || value === '7') {
      setFormData({ ...formData, phone: '' });
      return;
    }
  
    //+7 (XXX) XXX-XX-XX
    if (value.length === 1) {
      value = `+7 ${value}`;
    } else if (value.length <= 4) {
      value = `+7 (${value.slice(1)}`;
    } else if (value.length <= 7) {
      value = `+7 (${value.slice(1, 4)}) ${value.slice(4)}`;
    } else if (value.length <= 9) {
      value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7)}`;
    } else {
      value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
    }
  
    setFormData({ ...formData, phone: value });
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

  const handleAgreeChange = () => {//
    setFormData((prev) => ({ ...prev, agree: !prev.agree }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {//
      alert('Вы должны согласиться с обработкой персональных данных.');
      return;
    }
    setIsSubmitting(true);
    console.log('handleSubmit isSubmitting: ', isSubmitting);

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);//
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
          key={7}
          type="tel"
          name="phone"
          placeholder="+7 (___) ___-__-__"
          value={formData.phone}
          onChange={handlePhoneChange}
          pattern="\+7\s?\(?\d{3}\)?\s?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}"
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
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleAgreeChange}
            required
            disabled={isSubmitting}
          />
          <label htmlFor="agree">
            Я согласен с <a href="https://www.study.sfedu.ru/privacypolicy?ysclid=m8anp507sz44008873" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a>
          </label>
        </div>
        <div className="submit-container">
          {formData.captcha &&
            <Field
              key={5}
              type="submit"
              value={isSubmitting ? 'Отправляется' : 'Отправить'}
              isDisabled={isSubmitting || !formData.agree}
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
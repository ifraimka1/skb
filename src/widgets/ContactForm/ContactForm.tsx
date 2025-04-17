import { useCallback } from "react";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { useContactForm } from "@/modules/contact/hooks/useContactForm";

import "./ContactForm.styles.scss";

import Field from "@/shared/Components/Field";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "@/widgets/ContactForm/variables";

const formSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  email: z.string().email("Некорректный email. Пример 123@sfedu.ru"),
  phone: z.string()
    .min(1, "Обязательное поле")
    .regex(/^\+7\s?\(?\d{3}\)?\s?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/, "Некорректный номер телефона"),
  message: z.string().min(1, "Обязательное поле"),
  file: z
    .any()
    .optional()
    .nullable()
    .refine(
      (file) => !file || file.length === 0 || file instanceof File,
      "Файл должен быть экземпляром File"
    )
    .refine(
      (file) => !file || file.length === 0 || file.size <= MAX_FILE_SIZE,
      "Файл слишком большой (макс. 10МБ)"
    )
    .refine(
      (file) =>
        !file || file.length === 0 || ALLOWED_FILE_TYPES.includes(file.type),
      "Недопустимый формат файла"
    )
    .transform((value) => value ?? undefined),
  captcha: z.string().min(1, "Требуется проверка капчи"),
  agree: z.boolean().refine(val => val, "Необходимо согласие на обработку данных"),
});

type FormData = z.infer<typeof formSchema>;

function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      file: undefined,
      captcha: "",
      agree: false,
    },
  });

  const { mutate: submitForm, isPending } = useContactForm();

  const file = watch("file");
  const fileAttached = !!file && file instanceof File;
  const agree = watch("agree");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
  
    if (value.length === 0 || value === '7') {
      setValue("phone", "");
      return;
    }
  
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
  
    setValue("phone", value, { shouldValidate: true });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setValue("file", selectedFile || undefined, { shouldValidate: true });
    await trigger("file");
  };

  const handleRemoveFile = () => {
    setValue("file", undefined, { shouldValidate: true });
  };

  const handleCaptchaChange = useCallback(
    (token: string) => {
      setValue("captcha", token);
    },
    [setValue]
  );

  const handleTokenExpired = useCallback(() => {
    setValue("captcha", "");
  }, [setValue]);

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("agree", e.target.checked, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);
    formData.append("captcha", data.captcha);
    formData.append("agree", data.agree.toString());

    if (data.file instanceof File) {
      formData.append("file", data.file);
    }

    submitForm(formData, {
      onSuccess: () => {
        alert("Сообщение отправлено!");
        reset();
      },
      onError: () => {
        alert("Ошибка отправки.");
      },
    });
  };

  return (
    <Form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="half contact-form"
    >
      <h2>Свяжитесь с нами!</h2>
      <div className="inputs">
        <Field
          type="text"
          name="name"
          placeholder="Имя"
          disabled={isSubmitting || isPending}
          register={register("name")}
          error={errors.name?.message}
        />
        <Field
          type="email"
          name="email"
          placeholder="E-mail"
          disabled={isSubmitting || isPending}
          register={register("email")}
          error={errors.email?.message}
        />
        <Field
          type="tel"
          name="phone"
          placeholder="+7 (___) ___-__-__"
          disabled={isSubmitting || isPending}
          register={register("phone", {
            onChange: handlePhoneChange,
          })}
          error={errors.phone?.message}
        />
        <Field
          type="textarea"
          name="message"
          placeholder="Опишите в этом поле свой проект и, по возможности, прикрепите файл с ТЗ"
          disabled={isSubmitting || isPending}
          register={register("message")}
          error={errors.message?.message}
        />
        <Field
          type="file"
          name="file"
          disabled={isSubmitting || isPending}
          fileAttached={fileAttached}
          handleRemoveFile={handleRemoveFile}
          register={register("file", {
            onChange: handleFileChange,
          })}
          error={errors.file?.message}
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="agree"
            disabled={isSubmitting || isPending}
            {...register("agree")}
            onChange={handleAgreeChange}
          />
          <label htmlFor="agree">
            Я согласен с <a href="https://www.study.sfedu.ru/privacypolicy?ysclid=m8anp507sz44008873" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a>
          </label>
          {errors.agree && <span className="error-message">{errors.agree.message}</span>}
        </div>
        <div className="submit-container">
          {watch("captcha") ? (
            <Field
              type="submit"
              name="submit"
              disabled={isSubmitting || isPending || !agree}
            />
          ) : (
            <div className="captcha-container">
              <SmartCaptcha
                sitekey="ysc1_8nFqhYasby2fJ9J7pCTxdBMe0Xc3Y6CrWk4aylB03d4f0045"
                onSuccess={handleCaptchaChange}
                onTokenExpired={handleTokenExpired}
              />
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}

export default ContactForm;
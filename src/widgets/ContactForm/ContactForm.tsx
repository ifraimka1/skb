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
  message: z.string().min(1, "Обязательное поле"),
  file: z
    .any() // Используем `any`, чтобы избежать ошибки типа
    .optional()
    .nullable()
    .refine(
      (file) => !file || file.length === 0 || file instanceof File, // Проверяем, что это File, если значение есть
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
      message: "",
      file: undefined,
      captcha: "",
    },
  });

  const { mutate: submitForm, isPending } = useContactForm();

  const file = watch("file");
  const fileAttached = !!file && file instanceof File;
  console.log(file);
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

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("captcha", data.captcha);

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
        <div className="submit-container">
          {watch("captcha") ? (
            <Field
              type="submit"
              name="submit"
              disabled={isSubmitting || isPending}
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

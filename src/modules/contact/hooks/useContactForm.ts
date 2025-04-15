import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "../api/post";

export const useContactForm = () => {
  return useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => console.log("Форма успешно отправлена"),
    onError: (error: Error) => console.error("Ошибка отправки:", error),
  });
};

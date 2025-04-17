import { skbEndpoint } from "@/shared/api/wp-client";

export const submitContactForm = async (formData: FormData) => {
  const response = await fetch(`${skbEndpoint}skbkit/v1/sendcontactform`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Form submission failed");
  return response;
};

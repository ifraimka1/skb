import "./Field.styles.scss";
import cross from "@/shared/assets/images/cross.svg";
import fileUpload from "@/shared/assets/images/fileUpload.svg";
import { ForwardedRef, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
type FieldType =
  | "text"
  | "email"
  | "submit"
  | "file"
  | "textarea"
  | "textarea"
  | "password";

interface FieldProps {
  type: FieldType;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  fileAttached?: boolean;
  error?: string;
  handleRemoveFile?: () => void;
  register?: UseFormRegisterReturn;
}

const Field = forwardRef(
  (
    {
      type,
      name,
      placeholder,
      disabled = false,
      fileAttached = false,
      error,
      handleRemoveFile,
      register,
    }: FieldProps,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const className =
      type === "submit"
        ? "submit btn"
        : type === "textarea"
        ? "field big"
        : "field";

    return (
      <div className="field-container">
        {type === "textarea" ? (
          <textarea
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            {...register}
          />
        ) : type === "file" ? (
          <div className="file-input-container">
            <label className="file-input">
              <input
                type="file"
                accept=".doc,.docx,.txt,.pdf,.ppt,.pptx"
                disabled={disabled}
                {...register}
              />
              <div className="upload-file-btn">
                <img src={fileUpload} alt="" className="icon" />
                <span>
                  {fileAttached ? "Файл прикреплен" : "Прикрепить файл"}
                </span>
              </div>
            </label>
            {fileAttached && (
              <button
                type="button"
                className="remove-btn icon"
                onClick={handleRemoveFile}
              >
                <img src={cross} alt="Открепить файл" className="icon remove" />
              </button>
            )}
          </div>
        ) : (
          <input
            className={className}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref as ForwardedRef<HTMLInputElement>}
            {...register}
          />
        )}
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);

Field.displayName = "Field";

export default Field;

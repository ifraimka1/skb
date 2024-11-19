import "./Field.styles.scss";
import { fileUpload, cross } from "../../assets/images";

function Field({ type, name, placeholder, value, onChange, isDisabled = false, fileAttached = false, handleRemoveFile = null }) {
    const className = type === "submit" ? "submit btn"
        : type === "textarea" ? "field big"
            : "field";

    return (
        <>
            {type === "textarea" ? (
                <textarea
                    className={className}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    disabled={isDisabled}
                />
            ) : type === "file" ? (
                <div className="file-input-container">
                    <label className="file-input">
                        <input
                            type="file"
                            name="file"
                            value={value}
                            onChange={onChange}
                            disabled={isDisabled}
                            accept=".doc,.docx,.txt,.pdf,.ppt,.pptx"
                        />
                        <div className="upload-file-btn">
                            <img src={fileUpload} alt="" className="icon" />
                            <span>{fileAttached ? 'Файл прикреплен' : 'Прикрепить файл'}</span>
                        </div>
                    </label>
                    {fileAttached &&
                        <button className="remove-btn icon" onClick={handleRemoveFile}>
                            <img src={cross} alt="Открепить файл" className="icon remove" />
                        </button>
                    }
                </div>
            ) : (
                <input
                    className={className}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    disabled={isDisabled}
                />
            )}
        </>
    );
}

export default Field;
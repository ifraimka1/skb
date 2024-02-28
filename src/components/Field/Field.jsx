import "./Field.styles.scss";

function Field({ type, name, placeholder, icon }) {
    const className = type === "submit" ? "submit btn" : "field";

    return (
        <>
            {type === "textarea" ? (
                <textarea
                    className="field big"
                    name={name}
                    placeholder={placeholder}
                />
            ) : type === "file" ? (
                <label className="file-input">
                    <input type="file" name="file" />
                    <div className="upload-file-btn">
                        <img src={icon} alt="" className="icon" />
                        <span>Прикрепить файл</span>
                    </div>
                </label>
            ) : (
                <input
                    className={className}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                />
            )}
        </>
    );
}

export default Field;
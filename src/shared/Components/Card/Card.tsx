import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import type { CardData } from "@/widgets/CardList/types";
import { stripHtmlTags } from "@/shared/utils/sanitizeText";

interface CardProps {
  data: CardData & { variant?: "lab" | "news" | "project" };
}

export const Card = ({ data }: CardProps) => {
  const { id, name, previewText, preview, link, variant = "lab" } = data;

  return (
    <Link
      className={classNames(styles.card, {}, [styles[`card__${variant}`]])}
      to={link || `/${id || name}`}
    >
      {preview ? (
        <>
          <div
            className={styles.slide_background}
            style={{ backgroundImage: `url(${preview})` }}
          />

          <img
            src={preview}
            alt={name}
            className={styles.image}
            loading="lazy"
          />

          <div className={styles.content}>
            <h3 className={styles.title}>{stripHtmlTags(name)}</h3>
            {previewText && variant === "lab" && (
              <div className={styles.description}>
                <p>{previewText}</p>
              </div>
            )}
            {variant === "lab" && (
              <div className={styles.link}>
                <span>Перейти ⟶</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.placeholder} />
      )}
    </Link>
  );
};
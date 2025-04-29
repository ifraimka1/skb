// shared/Components/SkeletonCard/SkeletonCard.tsx
import styles from "./SkeletonCard.module.scss";

interface SkeletonCardProps {
  variant?: "default" | "lab";
}

const SkeletonCard = ({ variant = "default" }: SkeletonCardProps) => {
  const cardClass =
    variant === "lab"
      ? `${styles.card} ${styles.labsCard}`
      : styles.card;

  return (
    <div className={cardClass}>
      <div className={styles.pic}>
        <div className={styles.shimmer}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

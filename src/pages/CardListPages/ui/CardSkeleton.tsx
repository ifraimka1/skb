// shared/ui/CardSkeleton/CardSkeleton.tsx
import styles from "./CardSkeleton.module.scss";

interface CardSkeletonProps {
  variant?: "default" | "lab";
}

const CardSkeleton = ({ variant = "default" }: CardSkeletonProps) => {
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

export default CardSkeleton;


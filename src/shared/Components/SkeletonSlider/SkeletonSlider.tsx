import styles from "./SkeletonSlider.module.scss";

export const SkeletonSlider = () => {
  return (
    <div className={styles.sliderSkeleton}>
      <div className={styles.slideContainer}>
        {[...Array(2)].map((_, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.image}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
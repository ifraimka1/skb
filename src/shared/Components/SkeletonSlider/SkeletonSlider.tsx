import styles from "./SkeletonSlider.module.scss";

export const SkeletonSlider = () => {
  const skeletonCount = window.innerWidth > 768 ? 2 : 1;

  return (
    <div className={styles.sliderSkeleton}>
      <div className={styles.slideContainer}>
        {[...Array(skeletonCount)].map((_, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.image}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
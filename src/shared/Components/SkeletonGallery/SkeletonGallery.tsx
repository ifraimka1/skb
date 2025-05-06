import styles from "./SkeletonGallery.module.scss";

export const SkeletonGallery = () => {
  return (
    <div className={styles.skeletonGallery}>
      <div className={styles.title}></div>
      <div className={styles.images}>

        <div className={`${styles.imageContainer} ${styles.wide}`}></div>
        <div className={`${styles.imageContainer} ${styles.narrow}`}></div>
        
        <div className={`${styles.imageContainer} ${styles.narrow}`}></div>
        <div className={`${styles.imageContainer} ${styles.narrow}`}></div>
        <div className={`${styles.imageContainer} ${styles.narrow}`}></div>
        
        <div className={`${styles.imageContainer} ${styles.narrow}`}></div>
        <div className={`${styles.imageContainer} ${styles.wide}`}></div>
      </div>
    </div>
  );
};
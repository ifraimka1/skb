import styles from "./SkeletonPost.module.scss";

export const SkeletonPost = () => {
    return (
        <div className={styles.skeletonPost}>
            
            <div className={styles.topLine}></div>
            
            <div className={styles.textLine}></div>
            <div className={styles.splitLine}>
                <div className={styles.seventy}></div>
                <div className={styles.thirty}></div>
            </div>
            <div className={styles.textLine}></div>
            <div className={styles.splitLine}>
                <div className={styles.thirty}></div>
                <div className={styles.seventy}></div>
            </div>
            <div className={styles.textLine}></div>
        </div>
    );
};
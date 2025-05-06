import React from "react";
import SkeletonCard from "./SkeletonCard";
import styles from "@/shared/styles/cardGrid.module.scss";

interface SkeletonGridProps {
  count?: number;
  gridConfig?: { desktop: number; tablet: number; mobile: number };
  variant?: "default" | "lab";
}

export const SkeletonGrid = ({
  count = 3,
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
  variant = "default",
}: SkeletonGridProps) => {
  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.gridСontainer}
        style={{
          "--desktop-columns": gridConfig.desktop,
          "--tablet-columns": gridConfig.tablet,
          "--mobile-columns": gridConfig.mobile,
        } as React.CSSProperties}
      >
        {[...Array(count)].map((_, index) => (
          <SkeletonCard key={index} variant={variant} />
        ))}
      </div>
    </div>
  );
};
// shared/lib/withLoading/withLoading.tsx
import React from "react";
import { SkeletonGrid } from "../SkeletonGrid/SkeletonGrid";
import styles from "../Skeleton/SkeletonCard.module.scss";

interface WithLoadingProps {
    isLoading: boolean;
    isError: boolean;
    count?: number;
    gridConfig?: { desktop: number; tablet: number; mobile: number };
    variant?: "default" | "lab";
    children: React.ReactNode;
}

export const WithLoading = ({
    isLoading,
    isError,
    count = 3,
    gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
    variant = "default",
    children,
}: WithLoadingProps) => {
    if (isLoading) {
        return (
            <div>
                <div className={styles.titleSkeleton}></div>
                <SkeletonGrid
                    count={count}
                    gridConfig={gridConfig}
                    variant={variant}
                />
            </div>
        );
    }

    if (isError) {
        return <center>Ошибка при загрузке данных</center>;
    }

    return <>{children}</>;
};
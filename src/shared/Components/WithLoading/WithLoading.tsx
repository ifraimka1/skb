// shared/lib/withLoading/withLoading.tsx
import React from "react";
import { SkeletonGrid } from "../SkeletonGrid/SkeletonGrid";

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
            <SkeletonGrid
                count={count}
                gridConfig={gridConfig}
                variant={variant}
            />
        );
    }

    if (isError) {
        return <div>Ошибка при загрузке данных</div>;
    }

    // return <>{children}</>;
    return (
        <SkeletonGrid
            count={count}
            gridConfig={gridConfig}
            variant={variant}
        />
    );
};
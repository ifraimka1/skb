// widgets/CardList/CardList.tsx
import { CardListProps } from "@/widgets/CardList/types";
import styles from "./CardListTemplate.module.scss";
import { Card } from "@/shared/Components/Card/Card";
import { classNames } from "@/shared/lib/classNames/classNames";

export const CardListTemplate = ({
  items,
  variant = "lab", // Значение по умолчанию
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
  title = "Наши лаборатории",
}: CardListProps) => {
  const itemsArray = Object.values(items);

  return (
    <>
      {itemsArray?.length !== 0 &&
        <div>
          <h1 className={styles.title}>{title}</h1>
          <div
            className={classNames(styles.list, {}, [styles[`list__${variant}`]])}
            style={
              {
                "--desktop-columns": gridConfig.desktop,
                "--tablet-columns": gridConfig.tablet,
                "--mobile-columns": gridConfig.mobile,
              } as React.CSSProperties
            }
          >
            {itemsArray.map((item) => (
              <Card key={item.id || item.name} data={{ ...item, variant }} />
            ))}
          </div>
        </div>
      }
    </>
  );
};

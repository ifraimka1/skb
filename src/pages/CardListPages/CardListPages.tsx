// pages/MainPage/ui/MainPage/Lists.tsx
import { CardList } from "@/widgets/CardList/CardList";
import { GridConfig } from "@/widgets/CardList/types";
import { usePosts } from "@/modules/posts/hooks/usePosts";
import styles from "./CardList.module.scss";
import { useNews } from "@/modules";
import {
  transformNewsToCardData,
  transformPostsToCardData,
} from "@/pages/CardListPages/CardListFunctions";

interface ListProps {
  gridConfig?: GridConfig;
}

const NewsList = ({
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
}: ListProps) => {
  const { data: newsData, isLoading, isError } = useNews();
  console.log(newsData);
  if (isLoading)
    return (
      <div className="mainContainer">
        <h2 className={styles.title}>Новости</h2>
        <span className="loader"></span>
      </div>
    );
  if (isError) return <div>Ошибка при загрузке данных</div>;
  return (
    <div className={styles.mainContainer}>
      {newsData && (
        <CardList
          items={transformNewsToCardData(newsData)}
          variant="news"
          gridConfig={gridConfig}
          title="Новости"
        />
      )}
    </div>
  );
};

const LabsList = ({
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
}: ListProps) => {
  const { data: postsData, isLoading, isError } = usePosts();
  const labs = postsData?.labs ? Object.values(postsData.labs) : [];
  if (isLoading)
    return (
      <div className="mainContainer">
        <h2 className={styles.title}>Лаборатории</h2>
        <span className="loader"></span>
      </div>
    );
  if (isError) return <div>Ошибка при загрузке данных</div>;
  return (
    <div className={styles.mainContainer}>
      <CardList
        items={transformPostsToCardData(labs)}
        variant="lab"
        gridConfig={gridConfig}
        title="Лаборатории"
      />
    </div>
  );
};

const ProjectsList = ({
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
}: ListProps) => {
  const { data: postsData, isError, isLoading } = usePosts();
  const projects = postsData?.projects ? Object.values(postsData.projects) : [];
  if (isLoading)
    return (
      <div className="mainContainer">
        <h2 className={styles.title}>Проекты</h2>
        <span className="loader"></span>
      </div>
    );
  if (isError) return <div>Ошибка при загрузке данных</div>;
  return (
    <div className={styles.mainContainer}>
      <CardList
        items={transformPostsToCardData(projects)}
        variant="project"
        gridConfig={gridConfig}
        title="Проекты"
      />
    </div>
  );
};

export { NewsList, LabsList, ProjectsList };

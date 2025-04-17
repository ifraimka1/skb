// pages/MainPage/ui/MainPage/Lists.tsx
import { CardListTemplate } from "@/widgets/CardList/CardListTemplate";
import { GridConfig } from "@/widgets/CardList/types";
import { usePosts } from "@/modules/posts/hooks/usePosts";
import styles from "./CardList.module.scss";
import { useNews } from "@/modules";
import {
  transformNewsToCardData,
  transformPostsToCardData,
} from "@/widgets/CardList/CardListFunctions";
import { usePostProjects } from "@/modules/posts/hooks/usePostProjects";

interface ListProps {
  gridConfig?: GridConfig;
  tag?: number;
}

const NewsList = ({
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
}: ListProps) => {
  const { data: newsData, isLoading, isError } = useNews();

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
        <CardListTemplate
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
      <CardListTemplate
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
  tag = -1,
}: ListProps) => {
  const { data, isError, isLoading } = usePostProjects(tag);
  const projects = data ?? [];

  if (isLoading)
    return (
      <div className="mainContainer">
        <h2 className={styles.title}>Проекты</h2>
        <span className="loader"></span>
      </div>
    );

  if (isError || !projects) return <div>Ошибка при загрузке данных</div>;

  return (
    <div className={styles.mainContainer}>
      <CardListTemplate
        //@ts-ignore
        items={transformPostsToCardData(projects)}
        variant="project"
        gridConfig={gridConfig}
        title="Проекты"
      />
    </div>
  );
};

export { NewsList, LabsList, ProjectsList };

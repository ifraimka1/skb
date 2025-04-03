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
import { useProjects } from "@/modules/posts/hooks/usePostProjects";

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
  tag = -1,
}: ListProps) => {
  const { data: projects, isError, isLoading } = useProjects(tag);

  if (isLoading)
    return (
      <div className="mainContainer">
        <h2 className={styles.title}>Проекты</h2>
        <span className="loader"></span>
      </div>
    );

  if (isError) return <div>Ошибка при загрузке данных</div>;

  return (
    <>
      {projects?.length !== 0 &&
        <div className={styles.mainContainer}>
          <CardList
            items={transformPostsToCardData(projects)}
            variant="project"
            gridConfig={gridConfig}
            title="Проекты"
          />
        </div>
      }
    </>
  );
};

export { NewsList, LabsList, ProjectsList };

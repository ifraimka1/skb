// pages/MainPage/ui/MainPage/Lists.tsx
import { CardListTemplate } from "@/widgets/CardList/CardListTemplate";
import { WithLoading } from "@/shared/Components/WithLoading/WithLoading";
import { GridConfig } from "@/widgets/CardList/types";
import { usePosts } from "@/modules/posts/hooks/usePosts";
import styles from "./CardList.module.scss";
import { useNews } from "@/modules";
import {
  transformNewsToCardData,
  transformPostsToCardData,
} from "@/widgets/CardList/CardListFunctions";
import { usePostProjects } from "@/modules/posts/hooks/usePostProjects";
import { Link } from "react-router-dom";

interface ListProps {
  gridConfig?: GridConfig;
  tag?: number;
}

const NewsList = ({
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
}: ListProps) => {
  const { data: newsData, isLoading, isError } = useNews();

  return (
    <>
      <WithLoading
        isLoading={isLoading}
        isError={isError}
        count={4}
        gridConfig={gridConfig}
      >
        <div className={styles.mainContainer}>
          {newsData && (
            <CardListTemplate
              items={transformNewsToCardData(newsData)}
              variant="news"
              gridConfig={gridConfig}
              title={
                <Link to="/news" className={styles.title}>
                  Новости
                </Link>
              }
            />
          )}
        </div>
      </WithLoading>
    </>
  );
};

const LabsList = ({
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
}: ListProps) => {
  const { data: postsData, isLoading, isError } = usePosts();
  const labs = postsData?.labs ? Object.values(postsData.labs) : [];

  return (
    <>
      <WithLoading
        isLoading={isLoading}
        isError={isError}
        gridConfig={gridConfig}
      >
        <div className={styles.mainContainer}>
          <CardListTemplate
            items={transformPostsToCardData(labs)}
            variant="lab"
            gridConfig={gridConfig}
            title={
              <Link to="/labs" className={styles.title}>
                Наши лаборатории
              </Link>
            }
          />
        </div>
      </WithLoading>
    </>
  );
};

const ProjectsList = ({
  gridConfig = { desktop: 3, tablet: 2, mobile: 1 },
  tag = -1,
}: ListProps) => {
  const { data, isError, isLoading } = usePostProjects(tag);
  const projects = data ?? [];

  return (
    <>
      <WithLoading
        isLoading={isLoading}
        isError={isError}
        gridConfig={gridConfig}
      >
        <div className={styles.mainContainer}>
          <CardListTemplate
            items={transformPostsToCardData(projects)}
            variant="project"
            gridConfig={gridConfig}
            title={
              <Link to="/projects" className={styles.title} >
                Наши проекты
              </Link>
            }
          />
        </div>
      </WithLoading>
    </>
  );
};

export { NewsList, LabsList, ProjectsList };
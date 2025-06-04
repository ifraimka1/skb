import { ReactNode } from "react";

import MediaBlock from "@/widgets/MediaBlock/MediaBlock";
import { PageContent, PageHeader } from "@/widgets/WpPost";
import { useResizeObserver } from "@/shared/lib/ResizeObserver/ResizeObserver";
import { App } from "@/shared/types/app";

import "./Projects.scss";
import NewSlider from "../NewSlider/NewSlider";
import { getCustomProject } from "./customProjects";
import Slider from "../Slider/Slider";

interface WpPostProps {
  post: App.WpPostPage;
  children?: ReactNode;
}

export default function WpPost({
  post,
  children,
}: WpPostProps) {
  useResizeObserver({ parentSelector: ".wp-block-pullquote", childSelector: "blockquote" });

  const categories = post.categories ?? [];
  const title = post.title;
  const customComponent = getCustomProject(categories);

  const isSpecialTitle = title === "Программно-аппаратный комплекс для мониторинга управления мусорных контейнеров";

  return (
    <div className={categories.includes("projects") ? "project" : ""}>
      {customComponent ? (
        customComponent
      ) : (
        <>
          <PageHeader className="header">
            <h1>{title}</h1>
          </PageHeader>
          {Array.isArray(post.content) &&
            post.content.map((el, index) => {
              if (el.type === "mediablock") {
                const media = <MediaBlock key={index} images={el.value} />;
                return isSpecialTitle ? media : (
                  <PageContent key={index} className="content">
                    {media}
                  </PageContent>
                );
              } else if (el.type === "slider") {
                const slider = <NewSlider key={index} images={el.value} slidesPerView={4} />;
                return isSpecialTitle ? slider : (
                  <PageContent key={index} className="content">
                    {slider}
                  </PageContent>
                );
              }
              return (
                <PageContent key={index} className="content">
                  {el.element}
                </PageContent>
              );
            })}
          {children && <PageContent className="content">{children}</PageContent>}
        </>
      )}
    </div>
  );
}

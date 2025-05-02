import { ReactNode } from "react";

import MediaBlock from "@/widgets/MediaBlock/MediaBlock";
import { PageContent, PageHeader } from "@/widgets/WpPost";
import { useResizeObserver } from "@/shared/lib/ResizeObserver/ResizeObserver";
import { App } from "@/shared/types/app";

import "./Projects.scss";
import Slider from "../Slider/Slider";

interface WpPostProps {
  post: App.WpPostPage;
  children?: ReactNode;
}

export default function WpPost({
  post,
  children,
}: WpPostProps) {
  useResizeObserver({parentSelector: '.wp-block-pullquote'});
  // useResizeObserver({parentSelector: ".swiper", childSelector: ".swiper-wrapper"});

  return (
    <div className={post.categories?.includes('projects') ? "project" : ""}>
      <PageHeader className="header">
        <h1>{post.title}</h1>
      </PageHeader>
      <PageContent className="content">
        {Array.isArray(post.content) &&
          post.content.map((el, index) => {
            if (el.type === "mediablock") {
              return <MediaBlock key={index} images={el.value} />;
            } else if (el.type === "slider") {
              return <Slider images={el.value} />
            }
            return <div key={index}>{el.element}</div>;
          })}
        {children}
      </PageContent>
    </div>
  );
}

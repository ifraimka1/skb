import { ReactNode } from "react";

import MediaBlock from "@/widgets/MediaBlock/MediaBlock";

import { PageContent, PageHeader } from "@/widgets/WpPost";
import { App } from "@/shared/types/app";

interface WpPostProps {
  post: App.WpPost;
  children?: ReactNode;
}

export default function WpPost({
  post,
  children,
}: WpPostProps) {
  return (
    <>
      <PageHeader className="header">
        <h1>{post.title}</h1>
      </PageHeader>
      <PageContent className="content">
        {Array.isArray(post.content) &&
          post.content.map((el, index) => {
            if (el.type === "mediablock") {
              return <MediaBlock key={index} images={el.value} />;
            }
            return <div key={index}>{el.element}</div>;
          })}
        {children}
      </PageContent>
    </>
  );
}

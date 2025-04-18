// posts/api/get.ts
import { wp } from "@/shared/api/wp-client";
import { parseContent } from "@/shared/api/parseContent";
import { App, WPv2 } from "@/shared/types/app";

export const fetchPostById = async (id: number): Promise<App.WpPostPage> => {
  const post = await wp.posts().id(id).get() as WPv2.Post;

  const result: App.WpPostPage = {
    id: post.id,
    title: post.title.rendered,
    content: parseContent(post.content.rendered),
    tag: post.tags[0],
  };

  return result;
};

// posts/api/get.ts
import { wp } from "@/shared/api/wp-client";
import { parseContent } from "@/shared/api/parseContent";
import { App, WPv2 } from "@/shared/types/app";

export const fetchPostById = async (id: number): Promise<App.WpPostPage> => {
  const [post, categories] = await Promise.all([
    wp.posts().id(id).get() as Promise<WPv2.Post>,
    wp.categories().get() as Promise<WPv2.Category[]>,
  ]);

  const categoryMap = new Map<number, string>(
    categories.map((c) => [c.id, c.name])
  );

  const postCategories = post.categories.map(
    (id) => categoryMap.get(id) || ""
  );

  const result: App.WpPostPage = {
    id: post.id,
    title: post.title.rendered,
    content: parseContent(post.content.rendered),
    tag: post.tags[0],
    categories: postCategories,
  };

  return result;
};

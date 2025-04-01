import { CardData } from "@/widgets/Card/types";
import { App, SKBKit } from "@/shared/types/app";
export const transformPostsToCardData = (
  posts: App.ProjectPost[]
): Record<string, CardData> => {
  return posts.reduce((acc, post) => {
    acc[post.id] = {
      id: post.id.toString(),
      name: post.title,
      previewText: post.previewText || "",
      link: `/post/${post.id}`,
      preview: post.preview || "",
    };
    return acc;
  }, {} as Record<string, CardData>);
};
export const transformNewsToCardData = (
  news: SKBKit.News[]
): Record<string, CardData> => {
  return news.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      name: item.heading,
      previewText: "", // Если нужно можно вырезать часть текста из preview
      link: `/news/${item.id}`,
      preview: item.preview || "",
    };
    return acc;
  }, {} as Record<string, CardData>);
};

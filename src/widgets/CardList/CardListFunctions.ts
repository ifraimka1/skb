import { CardData } from "@/shared/Components/Card/types";
import { App, SKBKit } from "@/shared/types/app";

function hasPreviewText(post: App.Card | App.LabCard): post is App.LabCard {
  return 'previewText' in post;
}

export const transformPostsToCardData = (
  posts: App.Card[] | App.LabCard[]
): Record<string, CardData> => {
  return posts.reduce((acc, post) => {
    acc[post.id] = {
      id: post.id.toString(),
      name: post.title,
      previewText: hasPreviewText(post) ? post.previewText : "",
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

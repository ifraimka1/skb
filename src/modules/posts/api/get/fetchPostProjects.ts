// posts/api/get/getPostProjects.ts
import { wp } from "@/shared/api/wp-client";
import { fetchMedia } from "@/modules/media/api/get";
import { App, WPv2 } from "@/shared/types/app";

export const fetchPostProjects = async (tag: number): Promise<App.Card[]> => {
  const categories = await wp.categories().get() as WPv2.Category[];
  const catId = categories.find(item => item.name === "projects")?.id || -1;
  const isLabPage = tag !== -1; // Если передали тег, значит, это страница лаборатории

  // Одновременно отфильтровать и по тегу, по категории WP не дает
  // Если тега нет, проще взять категорию projects
  // Если тег есть, надо искать по нему
  const postsRequest = wp.posts();
  if (isLabPage) {
    postsRequest.tags(tag);
  } else {
    postsRequest.categories(catId);
  }

  const [posts, mediaLibrary] = await Promise.all([
    postsRequest.get() as Promise<WPv2.Post[]>,
    fetchMedia(),
  ]);

  // При выборке по тегу подтянется еще и лаборатория, ее нужно убрать из массива
  if (isLabPage) {
    const labIndex = posts.findIndex((post) => {
      return !post.categories.includes(catId);
    });
    posts.splice(labIndex, 1);
  }

  const result: App.Card[] = [];

  for (const post of posts) {
    const image = mediaLibrary.find((item) => item.id === post.featured_media);

    const newPost: App.Card = {
      id: post.id,
      title: post.title.rendered,
      preview: image?.src || null,
    };

    result.push(newPost);
  }

  return result;
};

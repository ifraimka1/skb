// posts/api/get.ts
import { wp } from "@/shared/api/wp-client";
import { parseContent } from "@/shared/api/parseContent";
import { fetchMedia } from "@/modules/media/api/get";
import { App, WPv2 } from "@/shared/types/app";
import Parse from "html-react-parser";
import { QueryFunctionContext } from "@tanstack/query-core";

export const fetchPosts = async (): Promise<App.PostsResult> => {
  const [posts, categories, mediaLibrary] = await Promise.all([
    wp.posts().param("per_page", 100).get() as Promise<WPv2.Post[]>,
    wp.categories().get() as Promise<WPv2.Category[]>,
    fetchMedia(),
  ]);

  const categoryMap = new Map<number, string>(
    categories.map((c) => [c.id, c.name])
  );

  const result: App.PostsResult = {
    projects: {},
    labs: {},
    other: [],
  };

  for (const post of posts) {
    const image = mediaLibrary.find((item) => item.id === post.featured_media);
    const postCategories = post.categories.map(
      (id) => categoryMap.get(id) || ""
    );

    const newPost: App.WpPost = {
      id: post.id,
      title: post.title.rendered,
      categories: postCategories,
      tag: post.tags[0] || -1,
      preview: image?.src || null,
    };

    if (postCategories.includes("projects")) {
      result.projects[post.id] = newPost;
    } else if (postCategories.includes("labs")) {
      //@ts-ignore
      const excerptElement = Parse(post.excerpt.rendered)[0];
      newPost.previewText = (excerptElement as any)?.props?.children || "";
      result.labs[post.id] = newPost as App.LabPost;
    } else {
      result.other.push(newPost);
    }
  }
  console.log('postsresult', result);
  return result;
};

export const fetchPostById = async ({ queryKey }: QueryFunctionContext): Promise<App.WpPost> => {
  const [id] = queryKey as [number];

  const [post, categories] = await Promise.all([
    wp.posts().id(id).get() as Promise<WPv2.Post>,
    wp.categories().get() as Promise<WPv2.Category[]>
  ]);

  const categoryMap = new Map<number, string>(
    categories.map((c) => [c.id, c.name])
  );

  const postCategories = post.categories.map(
    (id) => categoryMap.get(id) || ""
  );

  const result: App.WpPost = {
    id: post.id,
    title: post.title.rendered,
    content: parseContent(post.content.rendered),
    categories: postCategories,
    tag: post.tags[0],
  };

  return result;
};

export const fetchProjects = async ({ queryKey }: QueryFunctionContext): Promise<App.WpPost[]> => {
  const [tag] = queryKey as [number];

  const categories = await wp.categories().get() as WPv2.Category[];
  const catId = categories.find(item => item.name === "projects")?.id || -1;

  const postsRequest = wp.posts();
  if (tag !== -1) {
    postsRequest.tags(tag);
  }

  const [posts, mediaLibrary] = await Promise.all([
    postsRequest.get() as Promise<WPv2.Post[]>,
    fetchMedia(),
  ]);

  const labIndex = posts.findIndex((post) => {
    return !post.categories.includes(catId);
  });
  posts.splice(labIndex, 1);

  const result: App.WpPost[] = [];

  for (const post of posts) {
    const image = mediaLibrary.find((item) => item.id === post.featured_media);

    const newPost: App.WpPost = {
      id: post.id,
      title: post.title.rendered,
      tag: post.tags[0] || -1,
      preview: image?.src || null,
    };

    result.push(newPost);
  }

  return result;
};

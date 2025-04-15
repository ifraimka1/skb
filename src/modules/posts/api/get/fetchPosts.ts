// posts/api/get.ts
import { wp } from "@/shared/api/wp-client";
import { fetchMedia } from "@/modules/media/api/get";
import { App, WPv2 } from "@/shared/types/app";
import Parse from "html-react-parser";
import { parseContent } from "@/shared/api/parseContent";

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
    };

    if (postCategories.includes("projects")) {
      const newProject: App.Card = {
        ...newPost,
        preview: image?.src || null,
      };
      result.projects[post.id] = newProject;
    } else if (postCategories.includes("labs")) {
      //@ts-ignore
      const excerptElement = Parse(post.excerpt.rendered)[0];
      const newLab: App.LabCard = {
        ...newPost,
        preview: image?.src || null,
        previewText: (excerptElement as any)?.props?.children || "",
      };
      result.labs[post.id] = newLab;
    } else {
      const newWpPostPage: App.WpPostPage = {
        ...newPost,
        content: parseContent(post.content.rendered),
        tag: post.tags[0],
      };
      result.other.push(newWpPostPage);
    }
  }

  return result;
};

// posts/api/get.ts
import { wp } from "@/shared/api/wp-client";
import { parseContent } from "@/shared/api/parseContent";
import { fetchMedia } from "@/modules/media/api/get";
import { App, WPv2 } from "@/shared/types/app";
import Parse from "html-react-parser";
export const fetchPosts = async (): Promise<App.PostsResult> => {
  const [posts, categories, tags, mediaLibrary] = await Promise.all([
    wp.posts().param("per_page", 100).get() as Promise<WPv2.Post[]>,
    wp.categories().get() as Promise<WPv2.Category[]>,
    wp.tags().get() as Promise<WPv2.Tag[]>,
    fetchMedia(),
  ]);

  const categoryMap = new Map<number, string>(
    categories.map((c) => [c.id, c.name])
  );
  const tagMap = new Map<number, string>(tags.map((t) => [t.id, t.name]));

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

    const newPost: App.ProjectPost = {
      id: post.id,
      title: post.title.rendered,
      content: parseContent(post.content.rendered),
      lab: "",
      preview: image?.src || null,
      categories: postCategories,
      tag: post.tags.map((id) => tagMap.get(id) || "")[0] || "",
    };

    if (postCategories.includes("projects")) {
      newPost.lab = postCategories.filter((c) => c !== "projects")[0] || "";
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

  return result;
};

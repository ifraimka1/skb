// posts/api/useProjectById.ts
import { useQuery } from "@tanstack/react-query";
import { wp } from "@/shared/api/wp-client";
import { parseContent } from "@/shared/api/parseContent";
import { App, WPv2 } from "@/shared/types/app";

export const usePostById = (id: number) => {
  return useQuery<App.ProjectPost>({
    queryKey: ["project", id],
    queryFn: async () => {
      const [post, categories] = await Promise.all([
        wp.posts().id(id).get() as Promise<WPv2.Post>,
        wp.categories().param("post", id).get() as Promise<WPv2.Category[]>,
      ]);

      const categoryNames = categories.map((c) => c.name);

      return {
        id: post.id,
        title: post.title.rendered,
        content: parseContent(post.content.rendered),
        lab: categoryNames.find((c) => c !== "projects") || "",
        preview: post.featured_media?.toString() || null,
        categories: categoryNames,
        tag: "",
      };
    },
    enabled: !!id,
  });
};

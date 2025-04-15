// posts/api/usePostById.ts
import { fetchPostById } from "@/modules/posts/api/get/fetchPostById";
import { useQuery } from "@tanstack/react-query";
import { App } from "@/shared/types/app";

export const usePostById = (id: number) => {
  return useQuery<App.WpPostPage>({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });
};

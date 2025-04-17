// posts/api/useProjects.ts
import { fetchPostProjects } from "@/modules/posts/api/get/fetchPostProjects";
import { useQuery } from "@tanstack/react-query";
import { App } from "@/shared/types/app";

export const usePostProjects = (tag: number) => {
  return useQuery<App.Card[]>({
    queryKey: ["projects", tag],
    queryFn: () => fetchPostProjects(tag),
    enabled: !!tag,
  });
};

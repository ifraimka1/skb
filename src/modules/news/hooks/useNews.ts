import { fetchNews } from "@/modules/news/api/get";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useNews = (params?: { count?: number; offset?: number }) => {
  return useQuery({
    queryKey: ["news", params],
    queryFn: () => fetchNews(params),
    select: (news) => news.data,
    placeholderData: keepPreviousData,
  });
};

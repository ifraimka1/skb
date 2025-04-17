import { useQuery } from "@tanstack/react-query";
import { skbEndpoint } from "@/shared/api/wp-client";
import { SKBKit } from "@/shared/types/app";
export const fetchNewsById = async (id: string): Promise<SKBKit.News> => {
  const response = await fetch(`${skbEndpoint}skbkit/v1/getnewsbyid?id=${id}`);
  if (!response.ok) throw new Error("Ошибка при загрузке новости");
  const data = await response.json();
  return data;
};

export const useNewsById = (id: string) => {
  return useQuery<SKBKit.News>({
    queryKey: ["news", id],
    queryFn: () => fetchNewsById(id),
    enabled: !!id,
  });
};

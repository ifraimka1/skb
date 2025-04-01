import { wp } from "@/shared/api/wp-client";
import { WPv2 } from "@/shared/types/app";

export interface MediaItem {
  id: number;
  src: string;
  category: string;
  name: string;
}

/**
 * Функция для получения всех медиафайлов с учетом пагинации
 */
export const fetchMedia = async (): Promise<MediaItem[]> => {
  let page = 1;
  let allMedia: MediaItem[] = [];
  let hasMore = true;

  while (hasMore) {
    try {
      // Запрашиваем медиа с указанной страницы
      const media = (await wp.media().page(page)) as WPv2.Media[];

      // Если медиа нет, завершаем цикл
      if (!media.length) {
        hasMore = false;
        break;
      }

      // Преобразуем данные и добавляем в общий массив
      const transformedMedia = media.map(({ id, source_url, alt_text }) => {
        const [category = "uncategorized", name = "unknown"] =
          alt_text?.split("_") || [];
        return { id, src: source_url, category, name };
      });

      allMedia = [...allMedia, ...transformedMedia];
      page++; // Переходим на следующую страницу
    } catch (error) {
      // Если произошла ошибка (например, страница не найдена), завершаем цикл
      hasMore = false;
      console.error("Ошибка при загрузке медиа:", error);
    }
  }

  return allMedia;
};

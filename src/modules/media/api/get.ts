import { wp } from "@/shared/api/wp-client";
import { WPv2 } from "@/shared/types/app";

export interface MediaItem {
  id: number;
  src: string;
  category: string;
  name: string;
  team_name?: string;
  team_job?: string;
}

function decodeHtml(html: string) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
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
      const media = (await wp.media().page(page)) as WPv2.MediaWithPaging;
      console.log('unfilteredMedia', media);

      // Преобразуем данные и добавляем в общий массив
      const transformedMedia = media.map(({ id, source_url, alt_text, caption, title }) => {
        const [category = "uncategorized", name = "unknown"] =
          alt_text?.split("_") || [];
        const newItem: MediaItem = { id, src: source_url, category, name };

        if (category === "team") {
          newItem.team_name = title.rendered;
          newItem.team_job = decodeHtml(caption.rendered);
        }

        return newItem;
      });

      allMedia = [...allMedia, ...transformedMedia];

      if (media._paging.totalPages === page) {
        hasMore = false;
        break;
      }

      page++;
    } catch (error) {
      hasMore = false;
      console.error("Ошибка при загрузке медиа:", error);
    }
  }

  console.log("media", allMedia);
  return allMedia;
};

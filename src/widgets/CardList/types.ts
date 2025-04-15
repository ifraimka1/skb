// widgets/CardList/types.ts
export interface GridConfig {
  desktop: number;
  tablet: number;
  mobile: number;
}

export interface CardData {
  id?: string; // Опционально, если используется name как уникальный идентификатор
  name: string; // Название лаборатории
  previewText: string; // Описание
  link: string; // Ссылка
  preview: string; // URL изображения
  variant?: "lab" | "news" | "project"; // Вариант карточки
}

export interface CardListProps {
  items: Record<string, CardData>; // Объект объектов
  variant?: "lab" | "news" | "project";
  gridConfig?: GridConfig;
  title: string;
}

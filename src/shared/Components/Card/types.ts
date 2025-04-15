// Тип для вариантов карточки

export interface CardData {
  id?: string; // Опционально, если используется name как уникальный идентификатор
  name: string; // Название лаборатории
  previewText: string; // Описание
  link: string; // Ссылка
  preview: string; // URL изображения
  variant?: "lab" | "news" | "project"; // Вариант карточки
}
// Пропсы компонента Card
export interface CardProps {
  data: CardData;
}

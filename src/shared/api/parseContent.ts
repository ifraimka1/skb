import Parse from "html-react-parser";

export type ParsedContent =
  | { type: "html"; element: any } // Сохраняем исходные HTML-элементы
  | { type: "mediablock"; value: string[] } // Группируем медиа-элементы
  | { type: "slider"; value: string[] }; // Группируем картинки под слайдер

export const parseContent = (html: string): ParsedContent[] => {
  const elements = Parse(html);
  const result: ParsedContent[] = [];
  let mediaBuffer: string[] = [];

  const processNode = (node: any) => {
    if (typeof node === "string") {
      // Пустые строки (например, переносы строк) игнорируем
      if (node.trim() !== "") {
        result.push({ type: "html", element: node });
      }
      return;
    }

    // Обработка медиа-элементов (img внутри figure)
    if (node.type === "figure" && node.props.className.includes('wp-block-image')) {
      const imgSrc = node.props.children?.props?.src;
      if (imgSrc) {
        mediaBuffer.push(imgSrc);
      }
      return; // Пропускаем добавление figure в результат
    }
    
    // Если есть накопленные медиа-элементы, добавляем их как mediablock
    if (mediaBuffer.length > 0) {
      result.push({ type: "mediablock", value: [...mediaBuffer] });
      mediaBuffer = [];
    }

    if (node.props.className?.includes('wp-block-gallery')) {
      const slider = [];
      for (const child of node.props.children) {
        const imgSrc = child.props?.children.props?.src;
        if (imgSrc) {
          slider.push(imgSrc);
        }
      }
      result.push({ type: "slider", value: slider });
      return;
    }
    
    // Сохраняем текущий элемент как есть
    result.push({ type: "html", element: node });
  };

  if (Array.isArray(elements)) {
    elements.forEach(processNode);
  } else {
    processNode(elements);
  }

  // Добавляем оставшиеся медиа-элементы, если они есть
  if (mediaBuffer.length > 0) {
    result.push({ type: "mediablock", value: [...mediaBuffer] });
  }

  return result;
};

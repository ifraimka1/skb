import { useEffect, useState } from "react";

interface AcfField {
  mainpage_header_bg?: {
    url: string;
  };
}

interface WpPage {
  acf?: AcfField;
}

export function useWpMainPageData() {
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    // Заменяй slug на нужный слаг твоей главной страницы в WP
    fetch("https://test.skbkit.ru/wp-json/wp/v2/pages?slug=mainpage&_fields=acf")
      .then((res) => res.json())
      .then((data: WpPage[]) => {
        if (data && data.length > 0) {
          const page = data[0];
          if (page.acf && page.acf.mainpage_header_bg) {
            setBgImage(page.acf.mainpage_header_bg.url);
          }
        }
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных WP:", err);
      });
  }, []);

  return { bgImage };
}

import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

import PartnersLogo from "./PartnersLogo";
import styles from "./Partners.module.scss";
import BlockHeading from "@/widgets/BlockHeading";

// Тип для данных партнёра
interface Partner {
  src: string;
}

// Пропсы для компонента Partners
interface PartnersProps {
  partners?: Partner[];
}

const mock: Partner[] = [
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/bmw-m4-bright-headlights-close-up-g7qtwp90l3u3c0vv-scaled.jpg",
  },
  {
    src: "https://test.skbkit.ru/wp-content/uploads/2025/03/partners_sundowner.gif",
  },
];

function Partners({ partners = mock }: PartnersProps) {
  const [mediaList, setMediaList] = useState<Partner[]>(partners);

  const updateMediaList = async () => {
    // Логика для обновления списка медиа
    // const newMediaList = await getMedia('partners');
    // setMediaList(newMediaList);
  };

  useEffect(() => {
    updateMediaList();
    window.addEventListener("resize", updateMediaList);
    return () => {
      window.removeEventListener("resize", updateMediaList);
    };
  }, []);

  return (
    <div className={styles.block} id={styles.partners}>
      <div className={styles.heading}>
        <h1>Наши партнеры</h1>
      </div>
      <div className={styles.marquee__container}>
        <Marquee
          gradient={false}
          pauseOnHover={false}
          speed={80}
          className={styles.marquee}
        >
          {mediaList.map((item, index) => (
            <div key={index} className={styles.partner}>
              <PartnersLogo partner={item} />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Partners;

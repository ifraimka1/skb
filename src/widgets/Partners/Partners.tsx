import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

import PartnersLogo from "./PartnersLogo";
import styles from "./Partners.module.scss";

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
  const [mediaList] = useState<Partner[]>(partners);
  const [play, setPlay] = useState(false);

  const updateMediaList = async () => {
    // Логика для обновления списка медиа
    // const newMediaList = await getMedia('partners');
    // setMediaList(newMediaList);

    // if (newMediaList.length >= 5) {
      setPlay(true);
    // }
  };

  useEffect(() => {
    updateMediaList();
    window.addEventListener("resize", updateMediaList);
    return () => {
      window.removeEventListener("resize", updateMediaList);
    };
  }, [mediaList.length]);

  return (
    <div className={styles.block} id={styles.partners}>
      <div className={styles.heading}>
        <h1>Наши партнеры</h1>
      </div>
      <div className={styles.marquee__container}>
        <Marquee
          gradient={false}
          pauseOnHover={false}
          play={play}
          speed={80}
          className={styles.marquee}
          autoFill={play}
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

import Marquee from "react-fast-marquee";

import { useMedia } from "@/modules/media/hooks/useMedia";
import PartnersLogo from "./PartnersLogo";
import styles from "./Partners.module.scss";

interface Partner {
  src: string;
  alt?: string;
  category?: string;
  id?: string | number;
}

function Partners() {
  const { data: mediaData, isLoading, isError } = useMedia();

  // Отфильтрованные партнёрские медиа
  const mediaList: Partner[] =
    mediaData?.filter((item: Partner) => item.category === "partners") || [];

  if (isLoading) {
    return <div className={styles.loading}>Загрузка партнеров...</div>;
  }

  if (isError || mediaList.length === 0) {
    return <div className={styles.error}>Не удалось загрузить партнеров</div>;
  }

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
          autoFill={true}
          play={true}
        >
          {mediaList.map((item, index) => (
            <div key={item.id || index} className={styles.partner}>
              <PartnersLogo partner={item} />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Partners;

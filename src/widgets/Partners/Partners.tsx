import Marquee from "react-fast-marquee";
import { useMedia } from "@/modules/media/hooks/useMedia";
import PartnersLogo from "./PartnersLogo";
import styles from "./Partners.module.scss";
import { useEffect, useState } from "react";

interface Partner {
  src: string;
  alt?: string;
  category?: string;
  id?: string | number;
}

function Partners() {
  const { data: mediaData, isLoading, isError } = useMedia();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверяем сразу при загрузке
    handleResize();
    
    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', handleResize);
    
    // Убираем слушатель при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mediaList: Partner[] =
    mediaData?.filter((item: Partner) => item.category === "partners") || [];

  // Определяем, нужно ли включать автопрокрутку
  const shouldAutoScroll = isMobile ? mediaList.length > 1 : mediaList.length > 5;

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
        {shouldAutoScroll ? (
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
        ) : (
          <div className={styles.staticPartners}>
            {mediaList.map((item, index) => (
              <div key={item.id || index} className={styles.partner}>
                <PartnersLogo partner={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Partners;
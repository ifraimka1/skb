import { useContext, useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { HashLink } from "react-router-hash-link";
import { RootContext } from "@/app/Layout/Root";
import Partners from "@/widgets/Partners";
import Gallery from "@/pages/MainPage/ui/components/Gallery";
import ContactUs from "@/widgets/ContactUs";

import {
  LabsList,
  NewsList,
  ProjectsList,
} from "@/widgets/CardList/CardList";
import Numbers from "@/widgets/Numbers";

const MainPage = () => {
  const { setRef } = useContext(RootContext);
  const [headerBgUrl, setHeaderBgUrl] = useState("");

  useEffect(() => {
    // Запрос к WP REST API для поиска медиа по ключу "art"
    fetch("https://test.skbkit.ru/wp-json/wp/v2/media?search=art")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // Берём первый объект и его URL картинки
          setHeaderBgUrl(data[0].source_url);
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки фона с WP:", err);
      });

    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.classList.add("transparent");
    }

    return () => {
      if (navbar) {
        navbar.classList.remove("transparent");
      }
    };
  }, []);

  return (
    <div>
      <div
        id={styles.mainpageheader}
        ref={(element) => setRef(element)}
        style={{
          backgroundImage:
            `url(${headerBgUrl})`,
        }}
      >
        <section className={styles.container}>
          <h1>Думай иначе, будь креативным!</h1>
          <h2>
            Студенческое конструкторское бюро
            <br />
            "Компьютерное инновационное творчество"
          </h2>
          <HashLink smooth to="#contact-us" className={"btn " + styles.btn}>
            Связаться с нами
          </HashLink>
        </section>
      </div>
      <div className={styles.mainpageContainer}>
        <ProjectsList />
        <div className={styles.NumbersContainer}>
          <Numbers />
        </div>
        <NewsList />
        <div className={styles.GalleryContainer}>
          <Gallery />
        </div>
        <div className={styles.LabListContainer}>
          <LabsList />
        </div>
        <div className={styles.mainContainer}>
          <Partners />
        </div>
        <div className={styles.mainContainer}>
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

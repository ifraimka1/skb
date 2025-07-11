import { useContext, useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { HashLink } from "react-router-hash-link";
import { RootContext } from "@/app/Layout/Root";
import Partners from "@/widgets/Partners";
import Gallery from "@/pages/MainPage/ui/components/Gallery";
import ContactUs from "@/widgets/ContactUs";
import { Helmet } from "react-helmet";
import { LabsList, NewsList, ProjectsList } from "@/widgets/CardList/CardList";
import { useMedia } from "@/modules/media/hooks/useMedia";
import Numbers from "@/widgets/Numbers";

const MainPage = () => {
  const { setRef } = useContext(RootContext);
  const [headerBgUrl, setHeaderBgUrl] = useState("");
  const { data: mediaData, isLoading, isError } = useMedia();

  useEffect(() => {
    const artMedia = mediaData?.filter((el) => el.category === "art");

    if (artMedia && artMedia.length > 0) {
      setHeaderBgUrl(artMedia[0].src);
      let index = 0;

      const intervalId = setInterval(() => {
        const nextIndex = (index + 1) % artMedia.length;
        const nextImage = artMedia[nextIndex].src;

        setTimeout(() => {
          setHeaderBgUrl(nextImage);
          index = nextIndex;
        }, 1000);
      }, 600000); // 10 минут

      return () => clearInterval(intervalId);
    }
  }, [mediaData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error loading media");
  }

  return (
    <div>
      <Helmet>
        <title>СКБ "Компьютерное инновационное творчество"</title>
        <meta
          name="keywords"
          content="СКБ, Студенческое конструкторское бюро, Компьютерное инновационное творчество, ИКТИБ, ЮФУ, программирование, IT, инновации, проекты, лаборатории, Таганрог, образование, технологии, разработка, студенческие проекты"
        />
        <meta
          name="description"
          content="Студенческое конструкторское бюро 'Компьютерное инновационное творчество' ИКТИБ ЮФУ - площадка для реализации творческих и инновационных проектов студентов в области IT, робототехники, компьютерного зрения, VR/AR и других современных технологий."
        />
        <meta name="robots" content="index,follow,archive" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div
        id={styles.mainpageheader}
        ref={(element) => setRef(element)}
        style={{
          backgroundImage: headerBgUrl ? `url(${headerBgUrl})` : "none",
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
        <ProjectsList limit={6}/>
        <div className={styles.NumbersContainer}>
          <Numbers />
        </div>
        <NewsList limit={6} />
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

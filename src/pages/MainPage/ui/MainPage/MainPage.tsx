import styles from "./MainPage.module.scss";
import { HashLink } from "react-router-hash-link";
import { useContext, useEffect } from "react";
import { RootContext } from "@/app/Layout/Root";
import Partners from "@/widgets/Partners";
import Gallery from "@/pages/MainPage/ui/components/Gallery";
import ContactUs from "@/widgets/ContactUs";
import {
  LabsList,
  NewsList,
  ProjectsList,
} from "@/pages/CardListPages/CardListPages";

const MainPage = () => {
  const { setRef } = useContext(RootContext);

  useEffect(() => {
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
      <div id={styles.mainpageheader} ref={(element) => setRef(element)}>
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
      <NewsList />
      <ProjectsList />
      <LabsList />
      <div className={styles.mainContainer}>
        <Partners />
        <Gallery />
        <ContactUs />
      </div>
    </div>
  );
};

export default MainPage;

import { Outlet, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import "./Root.styles.scss";

import up from "@/shared/assets/images/up.svg";
import useElementOnScreen from "@/shared/lib/ElementOnScreen/ElementOnScreen";
import Navbar from "@/widgets/Navbar";
import Footer from "@/widgets/Footer";

// Тип для контекста
interface RootContextType {
  setRef: (element: HTMLElement | null) => void;
}

// Создаем контекст с типом
export const RootContext = createContext<RootContextType>({ setRef: () => { } });

function Root() {
  const location = useLocation(); // Хук для получения текущего пути
  const [setRef, isTargetVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.9,
  });

  const [isOnTopVisible, setIsOnTopVisible] = useState<boolean>(false); // Состояние для видимости кнопки
  const [hasScrolled, setHasScrolled] = useState<boolean>(false); // Флаг для отслеживания прокрутки

  // Для навбара
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (isTargetVisible) {
        navbar.classList.add("transparent");
      } else {
        navbar.classList.remove("transparent");
      }
    }
  }, [isTargetVisible]);

  // Для кнопки OnTop
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add("page-loaded");
    }, 100); // Небольшая задержка, чтобы избежать мерцания

    const handleScroll = () => {
      const headerHeight =
        document.getElementById("mainpageheader")?.offsetHeight || 0;
      if (window.scrollY > headerHeight && !hasScrolled) {
        setHasScrolled(true);
      }
      setIsOnTopVisible(window.scrollY > headerHeight); // Показываем кнопку
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  // скролл вверх
  const scrollToTop = () => {
  const duration = 900;
  const start = window.scrollY;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start * (1 - ease));

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};


  // Определяем, находимся ли мы на главной странице
  const isHomePage = location.pathname === "/";

  return (
    <RootContext.Provider value={{ setRef }}>
      <div id="layout-wrapper">
        <Navbar />
        <main id="react-page" style={{ marginTop: isHomePage ? "0px" : "" }}>
          <Outlet />
        </main>
        <Footer />
      </div>
      {hasScrolled && (
        <button
          className={`scroll-to-top ${isOnTopVisible ? "visible" : "hidden"}`}
          onClick={scrollToTop}
        >
          <img src={up} alt="Scroll to top" />
        </button>
      )}
    </RootContext.Provider>
  );
}

export default Root;

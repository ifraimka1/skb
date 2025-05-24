import styles from "./LabBoard.module.scss";
import { HashLink } from "react-router-hash-link";
import { useState } from 'react';
import angle_small_down from "@/shared/assets/images/LabBoard/angle-small-down.svg";
import angle_small_down_one from "@/shared/assets/images/LabBoard/angle-small-down-one.svg";
import microcontroller_left from "@/shared/assets/images/LabBoard/microcontroller_left.svg";
import microcontroller_rear from "@/shared/assets/images/LabBoard/microcontroller_rear.svg";
import Group_one from "@/shared/assets/images/LabBoard/Group_one.svg";
import Group_two from "@/shared/assets/images/LabBoard/Group_two.svg";
import Vector from "@/shared/assets/images/LabBoard/Vector.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ContactUs from "@/widgets/ContactUs";

function LabBoard() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      title: "OLED дисплей",
      content: "Pizza ipsum dolor meat lovers buffalo. Buffalo chicken pie mozzarella tomatoes pepperoni bacon buffalo chicken. Deep parmesan Hawaiian anchovies chicken personal stuffed tomato black. Wing wing crust sausage ham Philly."
    },
    {
      title: "Драйверы для двигателей",
      content: "Описание драйверов для двигателей..."
    },
    {
      title: "Модули беспроводной связи",
      content: "Описание модулей беспроводной связи..."
    },
    {
      title: "IMU",
      content: "Описание IMU..."
    },
    {
      title: "EEPROM",
      content: "Описание EEPROM..."
    },
    {
      title: "Различные сенсоры",
      content: "Описание сенсоров..."
    },
    {
      title: "Кнопки",
      content: "Описание кнопок..."
    }
  ];

  const toggleFeature = (index) => {
    setActiveFeature(activeFeature === index ? null : index);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: Group_one, title: "Блок \"MCU\"",
      description1: "Основным вычислительным устройством лабораторного стенда является микроконтроллер STM32F407IG использующий архитектуру ARMv7-M и работающий с максимальной частотой 168MHz. На борту устройства установлено 192Kb оперативной памяти (RAM) и 1Mb постоянной FLASH (ROM). Тактирование осуществляется с помощью двух кварцевых резонаторов: 8MHz для основной системы тактирования и 32.768KHz для встроенных часов реального времени (RTC). Напряжение питания микроконтроллера и логических выводов 3.3V, но большинство контактов толерантных к 5V логике."
      , description2: "Для взаимодействия с микроконтроллером на панели блока \"MCU\" установлены три тактовых выключателя: RESET - сброс MK, TEST - пользовательская кнопка, BOOT - переход в режим встроенного загрузчика. Выключатель TEST подаёт на контакт PI10 высокий сигнал. Светодиод LD110 управляется контактом PI11 и может использоваться программой пользователя для индикации режима работы. Питания встроенных часов реального времени осуществляется с помощью батареи CR1220."
    },
    { image: Group_two, title: "Slide 2", description1: "Текст для слайда 2", description2: "222" },
    {
      image: Group_one, title: "Блок \"MCU\"",
      description1: "Основным вычислительным устройством лабораторного стенда является микроконтроллер STM32F407IG использующий архитектуру ARMv7-M и работающий с максимальной частотой 168MHz. На борту устройства установлено 192Kb оперативной памяти (RAM) и 1Mb постоянной FLASH (ROM). Тактирование осуществляется с помощью двух кварцевых резонаторов: 8MHz для основной системы тактирования и 32.768KHz для встроенных часов реального времени (RTC). Напряжение питания микроконтроллера и логических выводов 3.3V, но большинство контактов толерантных к 5V логике."

      , description2: "Для взаимодействия с микроконтроллером на панели блока \"MCU\" установлены три тактовых выключателя: RESET - сброс MK, TEST - пользовательская кнопка, BOOT - переход в режим встроенного загрузчика. Выключатель TEST подаёт на контакт PI10 высокий сигнал. Светодиод LD110 управляется контактом PI11 и может использоваться программой пользователя для индикации режима работы. Питания встроенных часов реального времени осуществляется с помощью батареи CR1220."
    },
    { image: Group_two, title: "Slide 2", description1: "Текст для слайда 2", description2: "222" }
  ];

  return (
    <div>
      <div id={styles.pageheader}>
        <div className={styles.headerContent}>
          <section className={styles.container}>
            <h1>LabBoard 1.1</h1>
            <h2>
              Лучшее устройство для изучения<br />
              принципов работы микроконтроллеров
            </h2>
            <HashLink smooth to="#contact-us" className={"btn " + styles.btn}>
              Связаться с нами
            </HashLink>
          </section>
          <img src={microcontroller_left} className={styles.microcontrollerImage} />
        </div>
      </div>
      <div id={styles.page_container}>
        <h2 className={styles.title}>LabBoard в цифрах</h2>
        <div className={styles.numbersContainer}>
          <div className={styles.numberBlock}>
            <p className={styles.number}>10</p>
            <label className={styles.numberLabel}>различных кнопок</label>
          </div>
          <div className={styles.numberBlock}>
            <p className={styles.number}>1</p>
            <label className={styles.numberLabel}>OLED дисплей</label>
          </div>
          <div className={styles.numberBlock}>
            <p className={styles.number}>25</p>
            <label className={styles.numberLabel}>микроконтроллеров</label>
          </div>
        </div>
        <h2 className={styles.title}>Об устройстве</h2>
        <p>
          Для изучения принципов работы микроконтроллеров, их<br />
          интерфейсов и подключаемой периферии был разработан<br />
          лабораторный учебный стенд “LabBoard 1.1”. Он состоит из 25<br />
          независимых блоков, соединённых с микроконтроллером.
        </p>
        <div className={styles.imagesContainer}>
          <div className={styles.imageBlock}>
            <p className={styles.imageTitle}>Лицевая сторона</p>
            <img src={microcontroller_left} />
          </div>
          <div className={styles.imageBlock}>
            <p className={styles.imageTitle}>Тыльная сторона</p>
            <img src={microcontroller_rear} />
          </div>
        </div>
        <div>
          <h2 className={styles.title}>Характеристики</h2>
          <div className={styles.featuresContainer}>
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${styles.featureItem} ${activeFeature === index ? styles.active : ''}`}
                  onClick={() => toggleFeature(index)}
                >
                  <span>{feature.title}</span>
                  <img
                    src={activeFeature === index ? angle_small_down : angle_small_down_one}
                    alt={activeFeature === index ? "Свернуть" : "Развернуть"}
                  />
                </div>
              ))}
            </div>
            <div className={styles.featureContent}>
              {activeFeature !== null && (
                <div className={styles.featureDescription}>
                  {features[activeFeature].content}
                </div>
              )}
            </div>
          </div>
        </div>


        <div className={styles.sliderHeaderContainer}>
          <h2 className={styles.title}>Подробнее о микроконтроллерах</h2>
          <div className={styles.sliderNav}>
            <button className={`${styles.sliderButton} ${styles.sliderPrevBtn}`}>
              <img src={Vector} style={{ transform: 'scaleX(-1)' }} alt="Previous" />
            </button>
            <button className={`${styles.sliderButton} ${styles.sliderNextBtn}`}>
              <img src={Vector} alt="Next" />
            </button>
          </div>
        </div>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Navigation]}
  navigation={{
    nextEl: `.${styles.sliderNextBtn}`,
    prevEl: `.${styles.sliderPrevBtn}`,
  }}
  spaceBetween={32}
  slidesPerView={2}
  centeredSlides={true}
  loop={true}
  onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
  className={styles.sliderContainer}
  allowTouchMove={false}
  breakpoints={{
    0: {
      slidesPerView: 1,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 2,
      centeredSlides: true,
    }
  }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className={`${styles.swiperSlide} ${currentSlide === index ? styles.slideActive : ""}`}
              >
                <div className={styles.slideContent}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.slideImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
        <div>
          <h4><div className={styles.slideDescription}>
            {slides[currentSlide]?.title}
          </div></h4>
          <div className={styles.mcuContainer}>
            <p>
              <div className={styles.slideDescription}>
                {slides[currentSlide]?.description1}
              </div>
            </p>
            <p>
              <div className={styles.slideDescription}>
                {slides[currentSlide]?.description2}
              </div>
            </p>
          </div>
        </div>
      </div>

      <div id={styles.padding}>
        <ContactUs /></div>
    </div>
  );
}

export default LabBoard;

import styles from "./LabBoard.module.scss";
import { HashLink } from "react-router-hash-link";
import { useState, useEffect, useRef } from 'react';
import angle_small_down from "@/shared/assets/images/LabBoard/angle-small-down.svg";
import angle_small_down_one from "@/shared/assets/images/LabBoard/angle-small-down-one.svg";
import microcontroller_left from "@/shared/assets/images/LabBoard/microcontroller_left.svg";
import microcontroller_rear from "@/shared/assets/images/LabBoard/microcontroller_rear.svg";
import Group_one from "@/shared/assets/images/LabBoard/Group_one.svg";
import Group_two from "@/shared/assets/images/LabBoard/Group_two.svg";
import Vector from "@/shared/assets/images/LabBoard/Vector.svg";
import { useSwipeable } from 'react-swipeable';

import ContactUs from "@/widgets/ContactUs";

function LabBoard() {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "USB POWER",
      content: "Встроенные силовые блоки «Motors Driver», «Voltage Regulator» и разъёмы блока «Ports» VOUT обеспечиваются отдельным питанием через блок «USB POWER». Для подачи внешнего питания нужно подключить блок через кабель USB Type-C к 5V зарядному устройству мощностью не менее 15W.\n\nСветодиодный индикатор LD71 сообщает о подачи питания от USB разъёма, а индикатор LD70 горит если самовосстанавливающийся 3A предохранитель находится в исправном состоянии и питание может быть передано в другие модули. Для активации питания силовых модулей необходимо подать высокий сигнал на: PH12 – активация блока «Voltage Regulator», PH11 – активация блока «Motors Driver», PH10 – активация блока «Ports» для разъёмов VOUT. Если установить перемычку CN34, то можно запитать основную систему от внешнего источника силовых модулей.\n\nЧтобы задействовать дополнительные режимы с питанием 9V и 12V необходимо использовать при подключении к блоку зарядное устройство с функцией QC3.0. Затем использовать PH2 и PH3 для выбора требуемого напряжения."
    },
    {
      title: "Input",
      content: "Пользователь может осуществить взаимодействие с микроконтроллером с помощью ввода данных посредством встроенных в блок «Input» элементов.\n\nДва энкодера ENC1 и ENC2 с кнопками и индикаторами оборотов, позволяют точно отслеживать поворот ручки и используют контакты микроконтроллера PB12 и PB13 с копкой PI1 для первого и PB10, PB11 с копкой PI4 для второго. Потенциометр POT1 подключён к PC3, а POT2 к PC2 напряжение из которых можно считать с помощью АЦП. Клавиатура KEYPAD с 15 тактовыми кнопками использует контакты PE0-PE3 и демонстрирует код нажатой клавиши на панели «KEY CODE». Три независимых кнопки с индикаторами нажатия подключены к PE4, PE5 и PE6. При нажатии любой из независимых кнопок или кнопок на панели KEYPAD будет выставлен высокий сигнал на PD3. Двухосевой джойстик с кнопкой на PE14 использует вывод микроконтроллера PC0 для оси X и PC1 для Y."
    },
    {
      title: "Motors Driver",
      content: "Силовой блок позволяет управлять одновременно двумя щёточными моторами постоянного тока или одним шаговым двигателем. Генерация широтно-импульсной модуляции микроконтроллером задаёт мощность вращения двигателей и переключает полярность мостовой схемы драйвера.\n\nДля подачи сигнала для двигателя M1 используются контакты микроконтроллера PI5, PI6 и активируются сигналом PD6. Двигатель M2 подключен к PI2, PI7 с активацией на PI3. Таймер TIM8 управляет генерацией ШИМ каналами CH1, CH2, CH3 и CH4 Оптимальная работа драйвера достигается при частоте ШИМ равной 16KHz. Выбор входящего питания управляется с помощью блока «USB POWER» и максимально возможное напряжение 12V. Нагрузка на каждый мост драйвера не должна превышать 8W. При длительной работе поверхность блока «Motors Driver» может нагреваться, поэтому к ней нельзя прикасаться и заслонять теплоотводные вырезы. Для возможности управления шаговым двигателем требуется задействовать оба драйвера одновременно."
    },
    {
      title: "Voltage Regulator",
      content: "С помощью силового блока регулирования напряжения или тока можно запитать устройство с напряжением от 1.5V до 11.5V, мощностью не превышающей 16W. Блок позволяет снимать показания текущего напряжения и тока на выходе.\n\nУправление исходящим напряжением осуществляется с помощью ШИМ сигнала таймером TIM12 на канале CH1 контактом микроконтроллера PH6. Оптимальная частота работы устройства 40KHz. Показания напряжения идут на вывод МК PA1 с делителем 12/3.3, показания тока на PA6 с делителем 1:1. В качестве драйвера полумоста используется микросхема IR2302S, а датчиком тока является INA139. При длительной работе поверхность блока «Voltage Regulator» может нагреваться, поэтому к ней нельзя прикасаться и заслонять теплоотводные вырезы. Исходящий ток не должен превышать 3A во избежание перегрева компонентов и выхода их из строя."
    },
    {
      title: "IO Expander",
      content: "Если при подключении к микроконтроллеру требуется большее количество портов ввода/вывода, то применяется микросхема расширения MCP23016.\n\nОна имеет 16 независимых каналов, которые могут использоваться как входы и выходы. Для связи с микроконтроллером используется шина I2C3 подключённая к выводам МК: PH7 – линия тактирования SCL, PH8 – линия данных SDA. Скорость передачи данных может достигать 400Kbps. Адрес устройства 0x20. Вывод микроконтроллера PB7 может быть использован для активации обработчика внешнего прерывания при изменении сигнала на портах ввода микросхемы. Ток каналов вывода ограничен 11mA."
    },
    {
      title: "Ports",
      content: "Для подключения внешних устройств используется панель дополнительных портов. Они напрямую подключены к микроконтроллеру и ограничены током 11mA.\n\nПанель 3-PHASE PWM позволяет задействовать таймер TIM1 для генерации ШИМ сигналов при управлении 3-х фазным инвертором. Используются каналы таймера: CH1 – вывод PE8 отрицательный и PE9 положительный, CH2 – вывод PE10 отрицательный и PE11 положительный, CH3 – вывод PE12 отрицательный и PE13 положительный.\n\nПанель DIGITAL IO использует контакты контроллера PF0-PF2 и PF11-PF15. Они могут быть запрограммированы на вход и выход, а также подсвечиваются светодиодными индикаторами при появлении на них высокого сигнала. Принимают на вход напряжение до 5V. Выводы VOUT питают подключенные к ним устройства напряжением 5V-12V в зависимости от режима QC выбранного в блоке «USB POWER». Светодиодный индикатор сообщает о наличии питания.\n\nПанель DIGITAL IO / ANALOG IN использует контакты контроллера PF3-PF10. Они могут быть запрограммированы на вход и выход, а также с помощью встроенного в микроконтроллер АЦП ADC3 измерять входящее аналоговое напряжение до 3.3V. Принимают на вход напряжение до 5V, но в аналоговом режиме входящее напряжение не должно превышать 3.3V. Выводы VOUT питают подключенные к ним устройства напряжением 5V-12V в зависимости от режима QC выбранного в блоке «USB POWER». Светодиодный индикатор сообщает о наличии питания.\n\nПанель UART-1 подключена к UART4 и использует контакты контроллера PC10 для передатчика и PC11 для приёмника.\n\nПанель UART-2 подключена к UART5 и использует контакты контроллера PC12 для передатчика и PD2 для приёмника.\n\nПанель I2C подключена к шине I2C1 и использует контакты контроллера PB8 для тактирования и PB9 для обмена данных.\n\nПанель CAN подключена к шине CAN1 и использует контакты контроллера PD1 для передатчика и PD0 для приёмника.\n\nПанель SPI подключена к шине SPI1 и использует контакты контроллера PB3 для тактирования, PB4 для приёма данных, PB5 для передачи данных и PA15 выбор устройства.\n\nПанель DAC подключена к выходам ЦАП и использует контакты контроллера PА4 – OUT1 и PA5 – OUT2. При использовании на вход подключаемое напряжение не должно превышать 3.3V."
    }
  ];

  const toggleFeature = (index: number) => {
    setActiveFeature(activeFeature === index ? null : index);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: Group_one, title: "Блок \"MCU\"",
      description1: "Основным вычислительным устройством лабораторного стенда является микроконтроллер STM32F407IG использующий архитектуру ARMv7-M и работающий с максимальной частотой 168MHz. На борту устройства установлено 192Kb оперативной памяти (RAM) и 1Mb постоянной FLASH (ROM). Тактирование осуществляется с помощью двух кварцевых резонаторов: 8MHz для основной системы тактирования и 32.768KHz для встроенных часов реального времени (RTC). Напряжение питания микроконтроллера и логических выводов 3.3V, но большинство контактов толерантных к 5V логике."
      , description2: "Для взаимодействия с микроконтроллером на панели блока \"MCU\" установлены три тактовых выключателя: RESET - сброс MK, TEST - пользовательская кнопка, BOOT - переход в режим встроенного загрузчика. Выключатель TEST подаёт на контакт PI10 высокий сигнал. Светодиод LD110 управляется контактом PI11 и может использоваться программой пользователя для индикации режима работы. Питания встроенных часов реального времени осуществляется с помощью батареи CR1220."
    },
    { image: Group_two, title: "Блок «Serial Wire Debugger»", description1: "Для загрузки и отладки программ, написанных для микроконтроллера в стенде используется блок отладки «Serial Wire Debugger». Он основан на микроконтроллере STM32F103CB и поддерживает связь с основным МК с помощью интерфейса SWD.\n\nДля работы блока требуется чтобы в разъём SWD были установлены джамперы: NRST – аппаратный сброс, CLK – линия тактирования, DIO – приём и передача отладочных данных. Если необходимо задействовать передачу пользовательской отладочной информации, то нужно установить джампер в разъём SWO. Разъём VCP позволяет задействовать драйвер виртуального серийного порта.", description2: "Чтобы задействовать блок «SWD» нужно подключить его к компьютеру используя кабель USB Type-C. Отладчик использует протокол отладки SWD ST-Link 2.1 и работает с максимальной скоростью 4MHz. Если при работе основного МК использование отладчика не нужно, то следует изъять джампер NRST из разъёма SWD (чтобы не потерять джампер можно установить его в отсек GND). Блок «SWD» питает напряжением 5V от USB разъема все блоки стенда с малой нагрузкой через самовосстанавливающийся предохранитель на 1A." },
    {
      image: Group_one, title: "Блок \"MCU\"",
      description1: "Основным вычислительным устройством лабораторного стенда является микроконтроллер STM32F407IG использующий архитектуру ARMv7-M и работающий с максимальной частотой 168MHz. На борту устройства установлено 192Kb оперативной памяти (RAM) и 1Mb постоянной FLASH (ROM). Тактирование осуществляется с помощью двух кварцевых резонаторов: 8MHz для основной системы тактирования и 32.768KHz для встроенных часов реального времени (RTC). Напряжение питания микроконтроллера и логических выводов 3.3V, но большинство контактов толерантных к 5V логике."

      , description2: "Для взаимодействия с микроконтроллером на панели блока \"MCU\" установлены три тактовых выключателя: RESET - сброс MK, TEST - пользовательская кнопка, BOOT - переход в режим встроенного загрузчика. Выключатель TEST подаёт на контакт PI10 высокий сигнал. Светодиод LD110 управляется контактом PI11 и может использоваться программой пользователя для индикации режима работы. Питания встроенных часов реального времени осуществляется с помощью батареи CR1220."
    },
    { image: Group_two, title: "Блок «Serial Wire Debugger»", description1: "Для загрузки и отладки программ, написанных для микроконтроллера в стенде используется блок отладки «Serial Wire Debugger». Он основан на микроконтроллере STM32F103CB и поддерживает связь с основным МК с помощью интерфейса SWD.\n\nДля работы блока требуется чтобы в разъём SWD были установлены джамперы: NRST – аппаратный сброс, CLK – линия тактирования, DIO – приём и передача отладочных данных. Если необходимо задействовать передачу пользовательской отладочной информации, то нужно установить джампер в разъём SWO. Разъём VCP позволяет задействовать драйвер виртуального серийного порта.", description2: "Чтобы задействовать блок «SWD» нужно подключить его к компьютеру используя кабель USB Type-C. Отладчик использует протокол отладки SWD ST-Link 2.1 и работает с максимальной скоростью 4MHz. Если при работе основного МК использование отладчика не нужно, то следует изъять джампер NRST из разъёма SWD (чтобы не потерять джампер можно установить его в отсек GND). Блок «SWD» питает напряжением 5V от USB разъема все блоки стенда с малой нагрузкой через самовосстанавливающийся предохранитель на 1A." }
  ];

  const [fade, setFade] = useState(false);

  const nextSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setFade(false);
    }, 200);
  };

  const prevSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setFade(false);
    }, 200);
  };

  // Обработчик колеса мыши
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (sliderRef.current && sliderRef.current.contains(e.target as Node)) {
        e.preventDefault();
        if (e.deltaY > 0) {
          nextSlide();
        } else if (e.deltaY < 0) {
          prevSlide();
        }
      }
    };

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSlide]);

  return (
    <div className="noMargin">
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
            <p className={styles.number}>25</p>
            <label className={styles.numberLabel}>независимых модулей</label>
          </div>
          <div className={styles.numberBlock}>
            <p className={styles.number}>1</p>
            <label className={styles.numberLabel}>микроконтроллер stm32</label>
          </div>
          <div className={styles.numberBlock}>
            <p className={styles.number}>∞</p>
            <label className={styles.numberLabel}>опыта</label>
          </div>
        </div>
        <h2 className={styles.title}>Об устройстве</h2>
        <p>
          Для изучения принципов работы микроконтроллеров, их
          интерфейсов и подключаемой периферии был разработан
          лабораторный учебный стенд «LabBoard 1.1». Он состоит из 25
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
                <div key={index} className={styles.featureItemWrapper}>
                  <div
                    className={`${styles.featureItem} ${activeFeature === index ? styles.active : ''}`}
                    onClick={() => toggleFeature(index)}
                  >
                    <span>{feature.title}</span>
                    <img
                      src={activeFeature === index ? angle_small_down : angle_small_down_one}
                      alt={activeFeature === index ? "Свернуть" : "Развернуть"}
                    />
                  </div>
                  {/* моб. версия */}
                  <div className={styles.mobileFeatureContent}>
                    {activeFeature === index && (
                      <div className={styles.featureDescription}>
                        <p>{feature.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* пк версия */}
            <div className={styles.desktopFeatureContent}>
              {activeFeature !== null && (
                <div className={styles.featureDescription}>
                  <p>{features[activeFeature].content}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.sliderHeaderContainer}>
          <h2 className={styles.title}>Подробнее о модулях стенда</h2>
          <div className={styles.sliderNav}>
            <button onClick={prevSlide} className={styles.sliderButton}>
              <img src={Vector} style={{ transform: 'scaleX(-1)' }} alt="Previous" />
            </button>
            <button onClick={nextSlide} className={styles.sliderButton}>
              <img src={Vector} alt="Next" />
            </button>
          </div>
        </div>
      </div>

      <div id={styles.padding2} className={styles.sliderWrapper} ref={sliderRef}>
        <button onClick={prevSlide} className={styles.sliderButton2}>
          <img src={Vector} style={{ transform: 'scaleX(-1)' }} alt="Previous" />
        </button>

        <div
          className={styles.sliderContainer}
          {...useSwipeable({
            onSwipedLeft: nextSlide,
            onSwipedRight: prevSlide,
            preventScrollOnSwipe: true,
            trackMouse: true,
          })}
        >
          <div className={`${styles.slideActive} ${fade ? styles.fadeOut : ''}`}>
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className={styles.activeImage}
            />
          </div>
          <div className={`${styles.slideNext} ${fade ? styles.fadeOut : ''}`}>
            <img
              src={slides[(currentSlide + 1) % slides.length].image}
              alt={slides[(currentSlide + 1) % slides.length].title}
              className={styles.nextImage}
            />
          </div>
        </div>

        <button onClick={nextSlide} className={styles.sliderButton2}>
          <img src={Vector} alt="Next" />
        </button>
      </div>

      <div id={styles.padding}>
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

      <div id={styles.padding}>
        <ContactUs /></div>
    </div>
  );
}

export default LabBoard;
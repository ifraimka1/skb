import { CategoryPage } from "@/widgets/CategoryPage/CategoryPage";
import Team from "@/widgets/Team";
import PhotoGallery from "@/widgets/PhotoGallery";
import { Helmet } from "react-helmet";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>О нас | СКБ "Компьютерное инновационное творчество"</title>
        <meta
          name="keywords"
          content="СКБ, о нас, команда, Студенческое конструкторское бюро, Компьютерное инновационное творчество, ИКТИБ, ЮФУ, история СКБ, миссия, цели, задачи, коллектив, сотрудники, преподаватели, студенты"
        />
        <meta
          name="description"
          content="Узнайте больше о Студенческом конструкторском бюро 'Компьютерное инновационное творчество' ИКТИБ ЮФУ - нашей команде, истории, миссии и целях. Мы создаем инновационные проекты и развиваем таланты в области IT."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <CategoryPage category="aboutus" />
      <Team />
      <PhotoGallery />
    </>
  );
}

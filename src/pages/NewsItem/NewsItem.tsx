import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import extLink from "@/shared/assets/images/extLink.svg";
import views from "@/shared/assets/images/views.svg";
import { SkeletonPost } from "@/shared/Components/SkeletonPost/SkeletonPost";

import "./NewsItem.styles.scss";
import { useNewsById } from "@/modules/news/hooks/useNewsById";
import { PageContent, PageHeader } from "@/widgets/WpPost";
import Slider from "@/widgets/Slider/Slider";
export const vkWallUrl = "https://vk.com/skbkit?w=wall-172789021";
function NewsItem() {
  const params = useParams();
  const newsID = params.id;

  const { data: news, isLoading, isError } = useNewsById(newsID || "");

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // DD.MM.YYYY
  };

  if (isLoading)
    return (
      <div className="mainContainer">
        {[...Array(1)].map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    );
  if (isError)
    return (
      <>
        <Helmet>
          <title>
            Ошибка загрузки новости | СКБ "Компьютерное инновационное
            творчество"
          </title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <center>Ошибка при загрузке новости</center>
      </>
    );

  const newsUrl = `${vkWallUrl}_${newsID}`;

  return (
    <>
      {news && (
        <>
          <Helmet>
            <title>
              {news.heading || "Новость"} | СКБ "Компьютерное инновационное
              творчество"
            </title>
            <meta
              name="description"
              content={
                news.text?.[0]?.replace(/<[^>]*>/g, "").slice(0, 160) ||
                "Новость СКБ 'Компьютерное инновационное творчество' ИКТИБ ЮФУ"
              }
            />
            <meta
              name="keywords"
              content={`СКБ, новости, ${
                news.heading || ""
              }, ИКТИБ, ЮФУ, студенческие проекты, инновации`}
            />
            <meta name="robots" content="index,follow" />
          </Helmet>
          <PageHeader className="header">
            <h1>{news.heading}</h1>
          </PageHeader>
          <PageContent className="content" id="news-item-page">
            {news.photos.length !== 0 && <Slider images={news.photos} />}
            {news.text.map((textRow, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: textRow }} />
            ))}
            <div className="row">
              <p>
                <a href={newsUrl} target="_blank" rel="noreferrer">
                  Ссылка на новость{" "}
                  <img className="icon" src={extLink} alt="" />
                </a>
              </p>
              <div id="right">
                <p>
                  <img className="icon" src={views} alt="" />
                  {news.views}
                </p>
                <p id="date">Дата публикации: {formatDate(news.date)}</p>
              </div>
            </div>
          </PageContent>
        </>
      )}
    </>
  );
}

export default NewsItem;

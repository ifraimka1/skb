import { Helmet } from "react-helmet";

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Страница не найдена | СКБ "Компьютерное инновационное творчество"
        </title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="description"
          content="Запрашиваемая страница не найдена. Вернитесь на главную страницу СКБ 'Компьютерное инновационное творчество'."
        />
      </Helmet>
      <div>Такой страницы нету</div>
    </>
  );
};

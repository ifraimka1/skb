import { usePostById } from "@/modules";
import { WpPost } from "@/widgets/WpPost";
import { useParams } from "react-router-dom";
import { ProjectsList } from "@/widgets/CardList/CardList";
import { SkeletonPost } from "@/shared/Components/SkeletonPost/SkeletonPost";
import { Helmet } from "react-helmet";

function WpPostPage() {
  const params = useParams();
  const postId = params.id ? parseInt(params.id, 10) : null;

  const { data: post, isLoading, isError } = usePostById(postId || -1);

  if (!postId) {
    return (
      <>
        <Helmet>
          <title>
            Пост не найден | СКБ "Компьютерное инновационное творчество"
          </title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <div>Не указан ID поста</div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="mainContainer">
        {[...Array(1)].map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <Helmet>
          <title>
            Ошибка загрузки | СКБ "Компьютерное инновационное творчество"
          </title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <center>Ошибка при загрузке данных</center>
      </>
    );
  }

  return (
    <>
      {post && (
        <>
          <Helmet>
            <title>
              {post.title || "Пост"} | СКБ "Компьютерное инновационное
              творчество"
            </title>
            <meta
              name="description"
              content={
                "Публикация СКБ 'Компьютерное инновационное творчество' ИКТИБ ЮФУ"
              }
            />
            <meta
              name="keywords"
              content={`СКБ, ${post.title || ""}, ${
                post.categories?.join(", ") || ""
              }, ИКТИБ, ЮФУ`}
            />
            <meta name="robots" content="index,follow" />
          </Helmet>
          <WpPost post={post} />
          {post?.categories?.includes("labs") && (
            <ProjectsList tag={post?.tag || -1} />
          )}
        </>
      )}
    </>
  );
}

export default WpPostPage;

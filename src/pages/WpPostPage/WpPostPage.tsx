import { usePostById } from "@/modules";
import { WpPost } from "@/widgets/WpPost";
import { useParams } from "react-router-dom";
import { ProjectsList } from "@/widgets/CardList/CardList";

function WpPostPage() {
  const params = useParams();
  const postId = params.id ? parseInt(params.id, 10) : null;

  const { data: post, isLoading, isError } = usePostById(postId || -1);

  if (!postId) {
    return <div>Не указан ID поста</div>;
  }

  if (isLoading) {
    return (
      <div className="mainContainer">
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }
  console.log('post', post);
  return (<>
    {post &&
      <>
        <WpPost post={post} />
        {post?.categories?.includes("labs") && <ProjectsList tag={post?.tag || -1} />}
      </>
    }
  </>);
}

export default WpPostPage;

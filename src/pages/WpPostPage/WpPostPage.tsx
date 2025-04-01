import { usePostById } from "@/modules";
import { PagePost } from "@/widgets/PostPage";
import { useParams } from "react-router-dom";

function PostPage() {
  const params = useParams();
  const postId = params.id ? parseInt(params.id, 10) : null;
  if (!postId) {
    return <div>Не указан ID поста</div>;
  }
  const { data: post, isLoading, isError } = usePostById(postId);

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
  return <>{post && <PagePost post={post} isLab={false} />}</>;
}

export default PostPage;

import { usePostById } from "@/modules";
import { WpPost } from "@/widgets/WpPost";
import { useParams } from "react-router-dom";
import { ProjectsList } from "@/widgets/CardList/CardList";
import { SkeletonPost } from "@/shared/Components/SkeletonPost/SkeletonPost";

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
        {[...Array(1)].map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <center>Ошибка при загрузке данных</center>;
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

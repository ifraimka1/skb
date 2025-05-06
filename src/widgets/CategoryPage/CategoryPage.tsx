import { usePosts } from "@/modules/posts/hooks/usePosts";
import { WpPost } from "@/widgets/WpPost";
import {SkeletonPost} from "@/shared/Components/SkeletonPost/SkeletonPost";

interface CategoryPageProps {
  category: string;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const { data: postsData, isLoading, isError } = usePosts();

  const categoryPosts =
    postsData?.other.filter((post) => post.categories?.includes(category)) ||
    [];

  if (isLoading)
    return (
      <div className="mainContainer">
        {[...Array(1)].map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    );
  if (isError) return <center>Ошибка при загрузке данных</center>;

  return (
    <>
      {categoryPosts.map((post) => (
        <WpPost key={post.id} post={post} />
      ))}
    </>
  );
}

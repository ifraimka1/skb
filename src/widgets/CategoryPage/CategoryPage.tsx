import { usePosts } from "@/modules/posts/hooks/usePosts";
import { PagePost } from "@/widgets/PostPage";

interface CategoryPageProps {
  category: string;
}

export function CategoryPage({ category }: CategoryPageProps) {
  const { data: postsData, isLoading, isError } = usePosts();

  const categoryPosts =
    postsData?.other.filter((post) => post.categories.includes(category)) || [];

  if (isLoading)
    return (
      <div className="mainContainer">
        <span className="loader"></span>
      </div>
    );
  if (isError) return <div>Ошибка при загрузке данных</div>;

  return (
    <>
      {categoryPosts.map((post) => (
        <PagePost key={post.id} post={post}>
          <div className="btn">Показать еще</div>
        </PagePost>
      ))}
    </>
  );
}

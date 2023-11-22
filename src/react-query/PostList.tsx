import axios from "axios";
import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const { data: posts, error, isLoading } = usePosts({ page, pageSize });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Load -
      </button>
      <button
        className="btn btn-primary my-3 ms-3"
        onClick={() => setPage(page + 1)}
      >
        Load +
      </button>
    </>
  );
};

export default PostList;

import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();

  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="content">
      <article className="postpage">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button type="button" className="edit-btn">
                Edit Post
              </button>
            </Link>

            <button
              type="button"
              className="delete-btn"
              onClick={() => handleDelete(post.id)}
            >
              🗑️ Delete
            </button>
          </>
        )}

        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;

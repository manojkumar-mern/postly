import { Link } from "react-router-dom";
import { useState } from "react";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLiked(true);
    setLikes((prev) => prev + 1);
    setTimeout(() => setLiked(false), 300);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      text: commentText,
      replies: [],
    };

    console.log("ADDING COMMENT:", newComment);

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
    setShowComments(true);
  };

  return (
    <article className="post">
      <Link to={`post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postdate">{post.datetime}</p>
      </Link>

      <p className="postbody">{post.body}</p>

      {/* ACTION BAR */}
      <div className="post-actions">
        <button
          className={`like-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          ❤️ {likes}
        </button>

        <button
          className="comment-btn"
          onClick={() => setShowComments((prev) => !prev)}
        >
          💬 {comments.length}
        </button>
      </div>

      {/* COMMENTS (TOGGLE) */}
      {showComments && (
        <div className="comments">
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>

          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment">
                <p className="comment-text">{comment.text}</p>
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </article>
  );
};

export default Post;

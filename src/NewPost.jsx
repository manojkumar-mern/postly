const NewPost = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) => {
  return (
    <main className="content">
      <div className="newpost">
        <h2>New Post</h2>

        <form className="postForm" onSubmit={handleSubmit}>
          <input
            id="postTitle"
            type="text"
            placeholder="Post Title"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />

          <textarea
            id="postBody"
            placeholder="Write your post..."
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default NewPost;

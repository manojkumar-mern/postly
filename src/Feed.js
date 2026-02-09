import Post from "./Post";

const Feed = ({ posts }) => {
  if (!Array.isArray(posts)) return null;

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;

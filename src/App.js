import Aboutt from "./Aboutt";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import { format } from "date-fns";
import api from "./api/posts"
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {

  const navigate = useNavigate()
  
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(posts)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { width } = useWindowSize()
  const { data, fetchError, isLoading } = useAxiosFetch("/posts");

  useEffect(() => {
    setPosts(data)
  },[data])
  
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const datetime = new Date().toLocaleString();

    const newPost = {
      title: postTitle,
      datetime,
      body: postBody,
    };

    try {
      const response = await api.post("/posts", newPost);

      setPosts((prev) => [...prev, response.data]);

      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = async (id) => {

    const datetime = new Date().toLocaleString();

    const updatedPost = {
      title: editTitle,
      datetime,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));

      setEditTitle("");
      setEditBody("");
      navigate("/");
    }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }

  }


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${id}`);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };


  return (
    <div className="app">
      <Header
        title="Postly"
        tagline="Small posts. Big Voices!..."
        width={width} />

      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={
          <Home
            posts={searchResults}
            fetchError={fetchError}
            isLoading={isLoading} />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              />
            }
          />

          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>

        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editBody={editBody}
              setEditBody={setEditBody}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
            />
          }
        />

        <Route path="about" element={<Aboutt />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

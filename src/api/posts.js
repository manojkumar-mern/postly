import axios from "axios";

const baseURL = import.meta.env.PROD
  ? "https://69afb73ac63dd197feb9ea20.mockapi.io"
  : "http://localhost:3500";

export default axios.create({
  baseURL,
});


// import axios from "axios";

// const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/posts";

// export default axios.create({
//   baseURL,
// });

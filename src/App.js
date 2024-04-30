import "./App.css";
import MyNavBar from "./components/Navbar";
import Blog from "./components/Blog";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavBar></MyNavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/blog" element={<Blog></Blog>}></Route>
          <Route path="/posts/:id" element={<PostDetails />}></Route>
          <Route path="/AddPost" element={<AddPost></AddPost>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

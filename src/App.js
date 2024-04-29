import logo from "./logo.svg";
import "./App.css";
import MyNavBar from "./components/Navbar";
import Blog from "./components/Blog";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavBar></MyNavBar>
        <Routes>
          <Route path="/blog" element={<Blog></Blog>}></Route>
          <Route path="/posts/:id" element={<PostDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

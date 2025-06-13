import "./App.css";
import Layout from "./components/Layout";
// import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
function App() {
  return <div>
    {/* <Navbar/> */}
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="admin" element={<Admin/>}/>
          
          <Route path="login" element={<Login/>}/>
          <Route path="cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </Router>


  </div>;
}

export default App;

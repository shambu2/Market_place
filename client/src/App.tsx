import "./App.css";
import Layout from "./components/Layout";
// import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
// import Admin from "./pages/AdminLogin";
import Cart from "./pages/Cart";
// import Login from "./pages/LoginUser";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import LoginUser from "./pages/LoginUser";
import SignupUser from "./pages/SignupUser";
function App() {
  return <div>
    {/* <Navbar/> */}
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="admin/login" element={<AdminLogin/>}/>
          <Route path="admin/signup" element={<AdminSignup/>}/>
          <Route path="user/login" element={<LoginUser/>}/>
          <Route path="user/signup" element={<SignupUser/>}/>
          <Route path="cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </Router>


  </div>;
}

export default App;

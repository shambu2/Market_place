
import LoginSignup from "@/components/LoginSignup";
// import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <div className=" flex justify-center items-center h-[calc(100vh-80px)] ">
     <LoginSignup method="Login" user="seller"/>
    </div>
  );
};

export default AdminLogin;

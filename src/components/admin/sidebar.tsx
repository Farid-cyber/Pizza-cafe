import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
// import { FiAlignJustify } from "react-icons/fi";
import "./sidebar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.auth/firebase.con.auth";
type InitialProps = {
  visibility: boolean;
};
const Sidebar = ({ visibility }: InitialProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const adminroutes = [
    {
      link: "/admin/products",
      name: "Products",
      icon: FaCartShopping,
    },
    {
      link: "/admin/categories",
      name: "Categories",
      icon: FaCartShopping,
    },
    {
      link: "/admin/orders",
      name: "Orders",
      icon: IoBagHandleSharp,
    },
    {
      link: "/admin/delivered",
      name: "Deliveries",
      icon: FaUsers,
    },
    {
      link: "/",
      name: "Home",
      icon: FaHome,
    },
  ];


  const handleLogOut = () => {
    // console.log(auth);
    signOut(auth)
      .then(() => {
        console.log("// Sign-out successful.");
        navigate("/signUp");
        // setFF(false);
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <div
      className={`${
        visibility ? "sidebar2 h-vh! w-100" : "sidebar h-vh! w-100"
      }`}
    >
      <div className="py-2 d-flex flex-column w-100">
        {adminroutes.map((route) => (
          <div
            className={`btn btn-outline-primary ${
              pathname === route.link ? "btn-primary text-white" : ""
            } w-100 my-2 d-flex align-center py-2 justify-content-center`}
            onClick={() => navigate(route.link)}
          >
            <route.icon size={20} className="mx-2" />
            {route.name}
          </div>
        ))}
        <div
          onClick={handleLogOut}
          className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <CiLogout />
          {"Logout"}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

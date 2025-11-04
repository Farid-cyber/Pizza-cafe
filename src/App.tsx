import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/home/home";
import Admin from "./components/admin/admin";
import AdminProducts from "./components/admin/adminProducts";
import AdminOrders from "./components/admin/adminOrders";
import AdminDelivered from "./components/admin/adminDelivered";
import AdminCats from "./components/admin/adminCats";
import Buyurtma from "./components/home/homeBuy";
import SignUp from "./components/registration/signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.auth/firebase.con.auth";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user && location.pathname.startsWith("/admin")) {
        const uid = user.uid;
        console.log(uid);
        if (user.email !== "farid@gmail.com") {
          navigate("/signup");
        }
      } else if (location.pathname.startsWith("/admin")) {
        navigate("/signup");
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/categories" element={<AdminCats />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/delivered" element={<AdminDelivered />} />
        </Route>
        <Route path="/buyurtma" element={<Buyurtma />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

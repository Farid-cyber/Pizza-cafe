// import { useEffect, useState } from "react";
// import { useAppSelector } from "../../redux/hooks";

// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.auth/firebase.con.auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAppSelector } from "../../redux/hooks";
// import type { Product } from "../../types";
import "./header.scss";
// import { FaCartShopping } from "react-icons/fa6";
// import type { formatProdErrorMessage } from "@reduxjs/toolkit";

const Header = () => {
  const [use, setUse] = useState(0);
  const { orders } = useAppSelector((state) => state.products);
  const [user, setUser] = useState<string | null>("");

  const func = () => {
    const change = JSON.parse(localStorage.getItem("orders") || "[]");
    setUse(change.length);
  };

  useEffect(() => {
    func();
  }, [use]);

  const [ff, setFF] = useState(false);

  const signOu = () => {
    // console.log(auth);
    signOut(auth)
      .then(() => {
        console.log("// Sign-out successful.");
        navigate("/signUp");
        setFF(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(uid);
        setUser(user.email);
        setFF(true);
      } else {
        setFF(false);
      }
    });
  };

  useEffect(() => {
    check();
  }, [ff]);

  const handleRE = () => {
    navigate("/buyurtma");
  };

  const calculateTotal = (): number => {
    let sum = 0;
    for (let index = 0; index < orders.length; index++) {
      sum += orders[index].quantity * Number(orders[index].price);
    }
    return sum;
  };

  return (
    <div className="katta-bosh w-100 mx-auto">
      <div className="bosh">
        <img className="brand" src="./brand.svg" alt="" />
        <div className="buttons">
          {ff === false ? (
            <button onClick={() => navigate("/signup")} className="bt2">
              регистрация
            </button>
          ) : (
            <button onClick={() => signOu()} className="bt2">
              выход
            </button>
          )}
          {user !== "farid@gmail.com" ? (
            <button onClick={handleRE} className="life ppp">
              <p className="l li1">{calculateTotal()}₽</p>
              <p className="l lol">|</p>
              <div className=" d-flex align-items-center gap-1">
                <img className="lllll" src="/iconfinder_shopping-cart_2561279 1.svg" alt="" />{" "}
                <p className="mt-3 llll">{orders.length}</p>
              </div>
            </button>
          ) : (
            <button
              onClick={() => navigate("/admin/products")}
              className="life"
            >
              администратор
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

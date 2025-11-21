import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.auth/firebase.con.auth";
// import { ToastContainer, toast } from "react-toastify";
import "./signup.scss";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [emailadress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name2, setEmail2] = useState("");

  const [login, setLogin] = useState(false);

  const handleSave = () => {
    if (emailadress === "" || password === "") {
      toast.error("заполните оба поля");
      return;
    }

    if (password.length < 8) {
      toast.error("пароль должен быть длиннее 8 символов");
      return;
    }
    createUserWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        alert("вы успешно зарегистрировались");
        const user = userCredential.user;
        console.log(user.displayName);
      })
      .catch((error) => {
        if (error === "invalid-credential") {
          toast.error(`${error}`);
          return;
        }
        console.log(error);
        toast.error(`${error}`);
        // toast.error("Сначала зарегистрируйтесь");
      });
    setLogin(false);
  };

  const handleEnter = () => {
    if (emailadress === "" || password === "") {
      toast.error("заполните оба поля");
      return;
    }

    if (password.length < 8) {
      toast.error("пароль должен быть длиннее 8 символов");
      return;
    }
    signInWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid === "") {
          return;
        } else {
          toast.success("успешно вошел в систему");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error === "invalid-credential") {
          toast.error(`${error}`);
          return;
        }
        console.log(error);
        toast.error(`${error}`);
        // toast.error("Сначала зарегистрируйтесь");
      });
  };

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log(uid);
        if (!user.uid || user.uid === "") {
          navigate("/signup");
        }
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="registra">
      <button onClick={() => navigate("/")} className="btn btn-primary m-3">
        Вернуться домой
      </button>
      {login !== true ? (
        <div className="d-flex card mx-auto mt-5">
          <div className="card-header text-dark text-center">Войти</div>
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Адрес электронной почты..."
              value={emailadress}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setLogin(true)}
              className="btn btn-link mt-2"
            >
              Нет аккаунта? Зарегистрируйтесь
            </button>
          </div>
          <div className="card-footer">
            <button onClick={handleEnter} className="btn btn-primary w-100">
              Сохранять
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex card mx-auto mt-5">
          <div className="card-header text-dark text-center">
            Зарегистрироваться
          </div>
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Адрес электронной почты..."
              value={emailadress}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="парол..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={() => setLogin(false)} className="btn btn-link">
            Вернуться, чтобы войти
          </button>
          <div className="card-footer">
            <button onClick={handleSave} className="btn btn-primary w-100">
              Сохранять
            </button>
          </div>
        </div>
      )}
      <>
        <Toaster />
      </>
    </div>
  );
};
export default SignUp;

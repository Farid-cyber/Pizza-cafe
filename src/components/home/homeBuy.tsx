import { useEffect, useState } from "react";
import type { Order } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getForm, reset } from "../../redux/slices/ordersSlice";
// import { useAddOrderMutation } from "../../redux/api/orderApi";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../firbase/firebase.con";
import "./homeBuy.scss";
import "rodal/lib/rodal.css";
import Rodal from "rodal";
// import { ToastContainer, toast } from "react-toastify";
import { useAddOrderMutation } from "../../redux/api/orderApi";
import toast, { Toaster } from "react-hot-toast";

const Buyurtma = () => {
  const { orderForm } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  // const { orders } = useAppSelector((state) => state.products);

  const [pros, setPros] = useState<Order[]>([]);
  const fetch = () => {
    const change = JSON.parse(localStorage.getItem("orders")!);
    setPros(change);
  };

  useEffect(() => {
    fetch();
  }, []);

  const increaseQuantity = (id: number) => {
    const index = pros.findIndex((c) => c.id === id);
    // console.log(pros[index].quantity);
    pros[index].quantity++;
    setPros([...pros]);
    localStorage.setItem("orders", JSON.stringify(pros));
    toast.success("вы успешно увеличили количество");
  };

  const decreaseQuantity = (id: number) => {
    const index = pros.findIndex((c) => c.id === id);
    // console.log(pros[index].quantity);
    if (pros[index].quantity > 1) {
      pros[index].quantity--;
    }
    setPros([...pros]);
    localStorage.setItem("orders", JSON.stringify(pros));
    toast.success("вы успешно уменьшили количество");
  };

  // const [addOrder] = useAddOrderMutation();
  const [addOrder] = useAddOrderMutation();
  const handleSave = async () => {
    // addOrder({ ...orderForm, orders: pros });
    if (
      orderForm.name === "" ||
      orderForm.location === "" ||
      orderForm.phonenumber === ""
    ) {
      toast.error("заполните форму полностью!");
      return;
    }
    try {
      // await addDoc(collection(db, "orders"), {
      //   ...orderForm,
      //   orders: pros,
      //   status: false,
      // });
      addOrder({
        ...orderForm,
        orders: pros,
        status: false,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    toast.success("Вы успешно отправили заказ");
    dispatch(reset());
    localStorage.removeItem("orders");
    setPros([]);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  // const [ll, setLL] = useState(0);

  // const calculateOne = (id) => {
  //   let sum = 0;
  //   const findedIndex = orders.findIndex(id);
  //   sum += orders[findedIndex].quantity * orders[findedIndex].price;
  //   setLL(num);
  // };

  const calculateTotal = (): number => {
    let sum: number = 0;
    for (let index = 0; index < pros.length; index++) {
      sum += pros[index].quantity * Number(pros[index].price);
    }
    return sum;
  };

  const deleteAll = () => {
    localStorage.removeItem("orders");
    setPros([]);
    toast.success("вы успешно удалили");
  };

  const deleteOne = (id: number) => {
    console.log(id);
    console.log(pros);
    const life = pros.filter((c) => c.id.toString() !== id.toString());
    console.log(pros);
    setPros(life);
    localStorage.setItem("orders", JSON.stringify(life));
    fetch();
    toast.success("вы успешно удалили");
  };

  // const [sizes, setSizes] = useState<[]>([]);
  // const [size, setSize]=useState(0)

  const navigate = useNavigate();
  return (
    <div className="pb-5">
      <div className="p-4">
        <div className="d-flex w-100 p-3">
          <img
            className="brand"
            onClick={() => navigate(-1)}
            src="./brand.svg"
            alt=""
          />
        </div>
      </div>
      <hr className="hr" />
      <div className="order mx-auto p-3">
        {!pros || pros.length === 0 ? (
          <div className="empty-con">
            <h1 className="empty">Корзина пустая</h1>
            <img
              src="/Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на главную страницу..svg"
              alt=""
              // style={{border:"1px solid"}}
            />
            <img src="/shopping-cart-colour 1.svg" alt="" />
            <img onClick={() => navigate(-1)} src="/Group 3.svg" alt="" />
          </div>
        ) : (
          <>
            <div className="d-flex w-100 justify-content-between align-items-center mt-0">
              <div className="d-flex">
                <img src="./Group 42.svg" alt="" />
              </div>
              <div className="d-flex !ml-45">
                {" "}
                <img onClick={deleteAll} src="./Group 44.svg" alt="" />
              </div>
            </div>
            <div className="order-array-wrapper">
              {pros.map((c) => (
                <div className="order-itself">
                  <div className="image-wrapper">
                    <img src={`${c.imageUrl}`} alt="" />
                    <div className="inside-image-wrapper">
                      <h6>{c.title}</h6>
                      <p>тонкое тесто, {c.sizes}см.</p>
                    </div>
                  </div>
                  <div className="right-side">
                    <div className="left-right-side">
                      <img
                        onClick={() => decreaseQuantity(c.id)}
                        src="./Group 35 (1).svg"
                        alt=""
                      />
                      <p>{c.quantity}</p>
                      <img
                        onClick={() => increaseQuantity(c.id)}
                        src="./Group 36.svg"
                        alt=""
                      />
                    </div>
                    <h3 className="middle-right-side">{c.price}₽</h3>
                    <img
                      onClick={() => deleteOne(c.id)}
                      className="right-right-side"
                      src="./Group 36 (1).svg"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="lll d-flex w-100 justify-content-between align-items-center">
              <h3>
                Всего пицц: <span>{pros.length} шт.</span>
              </h3>
              <h6>
                Сумма заказа: <span>{calculateTotal()} ₽</span>
              </h6>
            </div>
            <div className="d-flex w-100 justify-content-between llll gap-3">
              <div>
                <img onClick={() => navigate(-1)} src="/Group 43.svg" alt="" />
              </div>
              <div>
                <img onClick={() => setOpen(true)} src="/Group 45.svg" alt="" />
              </div>
            </div>
            <div>
              <Rodal
                className="rodal111 flex flex-col"
                visible={open}
                onClose={() => setOpen(false)}
                customStyles={{ height: "max-content", width: "350px" }}
              >
                <div className=" mt-4">
                  <div className="text-center text-black">
                    <h2>Order</h2>
                  </div>
                  <div className="">
                    <input
                      value={orderForm.name}
                      onChange={(e) =>
                        dispatch(
                          getForm({ key: "name", value: e.target.value })
                        )
                      }
                      type="text"
                      className="form-control mt-2 w-100"
                      placeholder="name..."
                    />
                    <input
                      value={orderForm.location}
                      onChange={(e) =>
                        dispatch(
                          getForm({ key: "location", value: e.target.value })
                        )
                      }
                      type="text"
                      className="form-control mt-2 w-100"
                      placeholder="location..."
                    />
                    <input
                      value={orderForm.phonenumber}
                      onChange={(e) =>
                        dispatch(
                          getForm({ key: "phonenumber", value: e.target.value })
                        )
                      }
                      type="text"
                      className="form-control mt-2 w-100"
                      placeholder="phonenumber..."
                    />
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={handleSave}
                      className="btn btn-primary w-100"
                    >
                      Set order
                    </button>
                  </div>
                </div>
              </Rodal>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Buyurtma;

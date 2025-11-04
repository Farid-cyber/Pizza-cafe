import { useEffect, useState } from "react";
import type { Order } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getForm, reset } from "../../redux/slices/ordersSlice";
// import { useAddOrderMutation } from "../../redux/api/orderApi";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firbase/firebase.con";
import "./homeBuy.scss";
import "rodal/lib/rodal.css";
import Rodal from "rodal";
import { ToastContainer, toast } from "react-toastify";

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
  };

  const decreaseQuantity = (id: number) => {
    const index = pros.findIndex((c) => c.id === id);
    // console.log(pros[index].quantity);
    if (pros[index].quantity > 1) {
      pros[index].quantity--;
    }
    setPros([...pros]);
    localStorage.setItem("orders", JSON.stringify(pros));
  };

  // const [addOrder] = useAddOrderMutation();

  const handleSave = async () => {
    // addOrder({ ...orderForm, orders: pros });
    if (
      orderForm.name === "" ||
      orderForm.location === "" ||
      orderForm.phonenumber === ""
    ) {
      toast.warning("заполните форму полностью!");
      return;
    }
    try {
      await addDoc(collection(db, "orders"), {
        ...orderForm,
        orders: pros,
        status: false,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
  };

  const deleteOne = (id: number) => {
    console.log(id);
    console.log(pros);
    const life = pros.filter((c) => c.id.toString() !== id.toString());
    console.log(pros);
    setPros(life);
    localStorage.setItem("orders", JSON.stringify(life));
    fetch();
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
            {pros.map((c) => (
              // <div className="ordercha d-flex gap-1">
              //   <div className="d-flex gap-2 align-items-center cn">
              //     <img src={c.imageUrl} alt="" />
              //     <h5>{c.title}</h5>
              //   </div>
              //   <div className="ml-2">
              //     {c.sizes?.map((c) => (
              //       <div className="d-flex align-items-center gap-2">
              //         <h5>{c} см</h5>
              //       </div>
              //     ))}
              //   </div>
              //   <div className="l1 d-flex align-items-center">
              //     <div className="quantity d-flex gap-2">
              //       <img
              //         onClick={() => decreaseQuantity(c.id)}
              //         src="/Group 35.svg"
              //         alt=""
              //       />
              //       <p>{c.quantity}</p>
              //       <img
              //         onClick={() => increaseQuantity(c.id)}
              //         src="/Group 36.svg"
              //         alt=""
              //       />
              //     </div>
              //     <h6>{c.price}₽</h6>
              //   </div>
              //   <img
              //     onClick={() => deleteOne(c.id)}
              //     className="img"
              //     src="/Group 36 (1).svg"
              //     alt=""
              //   />
              // </div>
              <div className="order1 d-flex flex-wrap justify-between! align-items-center w-100 pt-4">
                <img src={c.imageUrl} alt="" width={100} />
                <h4>{c.title}</h4>
                {c.sizes?.map((c) => (
                  <div className="d-flex align-items-center gap-2 w-[100px]! mt-2">
                    <h5>{c} см</h5>
                  </div>
                ))}
                <div className="w-[100px]! d-flex gap-2 align-items-center">
                  {/* {" "} */}
                  <img
                    onClick={() => decreaseQuantity(c.id)}
                    src="/Group 35.svg"
                    alt=""
                  />
                  <p className="mt-3">{c.quantity}</p>
                  <img
                    onClick={() => increaseQuantity(c.id)}
                    src="/Group 36.svg"
                    alt=""
                  />
                </div>
                <h6 className="mt-1 ml-2">{c.price}₽</h6>
                <img
                  onClick={() => deleteOne(c.id)}
                  className="img"
                  src="/Group 36 (1).svg"
                  alt=""
                />
              </div>
            ))}
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
                visible={open}
                onClose={() => setOpen(false)}
                customStyles={{ height: "max-content" }}
              >
                <div className="card mt-4">
                  <div className="card-header bg-dark text-white text-center">
                    Order
                  </div>
                  <div className="card-body">
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
                  <div className="card-footer bg-dark">
                    <button onClick={handleSave} className="btn btn-primary">
                      Set order
                    </button>
                  </div>
                </div>
              </Rodal>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Buyurtma;

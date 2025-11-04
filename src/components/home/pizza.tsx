import { useState } from "react";
import "./pizza.scss";
import type { Product } from "../../types";
import { useAppSelector } from "../../redux/hooks";
type InitialProps = {
  pizza: Product;
  handleOrders: (val: Product) => void;
};
const Pizza = ({ handleOrders, pizza }: InitialProps) => {
  const [size, setSize] = useState(0);
  // const [sizeIndex, setSizeIndex] = useState(0);
  // const [prize, setPrize] = useState(0);
  const [price, setPrice] = useState(Number(pizza.price));

  const handleSize = (value: number) => {
    // console.log(value);
    // console.log(s);
    setSize(value);
    const basePrice = Number(pizza.price);
    // console.log(basePrice);
    if (value === 0) {
      setPrice(basePrice);
    } else if (value === 1) {
      setPrice(basePrice + 50);
      // console.log(price);
    } else if (value === 2) {
      setPrice(basePrice + 100);
    }
  };

  const [type, setType] = useState(0);

  const handleType = (index: number) => {
    setType(index);
  };
  // console.log(pizza);
  

  const { orders } = useAppSelector((state) => state.products);

  const getOrder = (pizza: Product) => {
    handleOrders({
      ...pizza,
      price: price.toString(),
      sizes: [pizza.sizes[size]],
      types: [pizza.types[type]],
    });
  };

  return (
    <div className="card1 mt-3">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <div className="types-sizes">
        <div className="d-flex w-100 p-1">
          {pizza.types?.map((piz, index) => (
            <button
              onClick={() => handleType(index)}
              className={`${
                type === index ? "selected2" : "selected "
              } mx-1 w-100`}
            >
              {piz === '1' ? "традиционный" : "Тонкий"}
            </button>
          ))}
        </div>
        <div className="d-flex w-100 p-1">
          {pizza.sizes?.map((s, index) => (
            <button
              onClick={() => handleSize(index)}
              className={`${
                size === index ? "selected2" : "selected"
              } selected mx-1 w-100`}
            >
              {s} см
            </button>
          ))}
        </div>
      </div>
      <div className="d-flex w-100 p-2 justify-content-between align-items-center mt-2">
        <h3>ot {price} ₽</h3>
        <button
          onClick={() => getOrder(pizza)}
          className={`${
            orders.find((p) => p.id === pizza.id)
              ? "button-order2"
              : "button-order"
          } mx-0.5`}
        >
          + добавить заказ{" "}
        </button>
      </div>
    </div>
  );
};

export default Pizza;

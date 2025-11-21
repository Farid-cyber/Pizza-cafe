import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../redux/api/catApi";
import {
  useGetUsersByCategoryIdQuery,
  useGetUsersQuery,
  //   useGetUsersQuery,
} from "../../redux/api/productApi";
import type { Category, Product } from "../../types";
import "./allItem.scss";

import { addToOrders, getOrders } from "../../redux/slices/productsSlice";
import { useAppDispatch } from "../../redux/hooks";
import { FaSpinner } from "react-icons/fa6";
import Pizza from "./pizza";

const All = () => {
  const [id1, setId] = useState<string>("");
  const { data: categories } = useGetCategoriesQuery({});
  const dispatch = useAppDispatch();

  const handleGet = (id: string) => {
    if (id === id1) {
      setId("");
    } else {
      setId(id);
    }
  };
  const [sortType, setSortType] = useState<"popularity" | "price" | "alpha">(
    "popularity"
  );

  const { data: simple = [], isLoading: isLoading2 } = useGetUsersQuery({});
  const { data: bycategoryId = [] } = useGetUsersByCategoryIdQuery(id1);

  const pizzas = id1 === "" ? simple : bycategoryId;

  const handleOrders = (c: Product) => {
    // console.log(c);
    dispatch(addToOrders(c));
  };

  const sortedPizzas = [...pizzas].sort((a, b) => {
    console.log(a);
    if (sortType === "price") {
      return (a.price ?? 0) - (b.price ?? 0);
    }
    if (sortType === "alpha") {
      return a.title.localeCompare(b.title);
    }
    return b.rating - a.rating;
  });

  if (isLoading2) {
    <FaSpinner size={50} className="spinner-grow" />;
  }

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div>
      {isLoading2 ? (
        <>
          <FaSpinner size={40} className="spinner mx-auto mt-6" />
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between w-100 gap-2 align-items-center">
            <div className="life111 d-flex align-items-center justify-content-between w-100">
              <div className="categories d-flex gap-2 overflow-x-auto w-100">
                <button
                  onClick={() => setId("")}
                  className={` ${id1 === "" ? "cat-btn" : "cat-btn2"}`}
                >
                  все
                </button>
                {categories?.map((c: Category) => (
                  <button
                    onClick={() => handleGet(c.id)}
                    className={` ${id1 === c.id ? "cat-btn" : "cat-btn2"}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="sort-container d-flex">
                <span>Сортировка по:</span>
                <select
                  className="sort-select"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value as any)}
                >
                  <option
                    className={`${
                      sortType === "popularity" ? "option1" : "option2"
                    }`}
                    value="popularity"
                  >
                    популярности
                  </option>
                  <option  className={`${
                      sortType === "price" ? "option1" : "option2"
                    }`} value="price">по цене</option>
                  <option  className={`${
                      sortType === "alpha" ? "option1" : "option2"
                    }`} value="alpha">по алфавиту</option>
                </select>
              </div>
            </div>
          </div>
          <h1>Все пиццы</h1>
          <div className="mx-auto w-100 p-5 d-flex flex-wrap justify-content-center gap-3">
            {sortedPizzas.map((c: Product) => (
              <Pizza pizza={c} handleOrders={handleOrders} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default All;

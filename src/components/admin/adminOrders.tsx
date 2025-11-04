import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// import type { Order } from "../../types";
import { db } from "../../firbase/firebase.con";
import { useEffect, useState } from "react";
import type { Order, Order2 } from "../../types";
import Rodal from "rodal";
// import Dropdown from "react-bootstrap/Dropdown";

const AdminOrders = () => {
  const [arr1, setArr] = useState<Order2[]>([]);
  const [arr2, setArr2] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, `orders`));
    const arr = querySnapshot.docs.map((c) => ({
      id: c.id,
      ...c.data(),
    })) as Order2[];
    setArr(arr);
  };

  console.log(arr1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatus = async (id: string) => {
    console.log(id);
    await updateDoc(doc(db, "orders", id), { status: true });
    fetchProducts();
  };

  const seeOrders = async (id: string) => {
    const npm = arr1.find((c) => c.id === id)?.orders;
    if (!npm) {
      return;
    }
    // console.log(npm);
    // const life = arr1.find((c) => c.id === id).orders;
    setArr2([...npm]);
    setOpen(true);
  };

  const deleteOne = async (id: string) => {
    await deleteDoc(doc(db, `orders`, id));
    fetchProducts();
  };

  return (
    <div>
      {arr1
        .filter((c) => c.status === false)
        ?.map((c) => (
          <div className="w-75 mx-auto flex flex-wrap justify-content-between gap-4 py-6 border my-2 p-2 rounded">
            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 mr-2">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Order ID:
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                <a href="#" className="hover:underline">
                  #{c.id}
                </a>
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Customer name:
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                {c.name}
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Location:
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                {c.location}
              </dd>
            </dl>

            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                Phonenumber:
              </dt>
              <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                {c.phonenumber}
              </dd>
            </dl>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <button
                onClick={() => deleteOne(c.id)}
                type="button"
                className="w-full rounded border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
              >
                Cancel order
              </button>

              {c.status ? (
                <button className="btn btn-success mt-2 w-100">
                  Delivered
                </button>
              ) : (
                <button
                  onClick={() => handleStatus(c.id)}
                  className="btn btn-outline-danger mt-2 w-100"
                >
                  New
                </button>
              )}
              <a
                onClick={() => seeOrders(c.id)}
                href="#"
                className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
              >
                View details
              </a>
            </div>
          </div>
        ))}
      <Rodal
        visible={open}
        onClose={() => {
          setOpen(false), setArr2([]);
        }}
        customStyles={{ height: "max-content" }}
      >
        <div className="mt-4">
          {arr2.map((c: Order) => (
            <div className="border-b p-2">
              <h6>{c.title}</h6>
              <p>
                {c.sizes} x {c.quantity} x {c.price} ₽
              </p>
            </div>
          ))}
        </div>
      </Rodal>
    </div>
  );
};

export default AdminOrders;

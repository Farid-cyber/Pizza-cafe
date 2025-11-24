import {
  collection,
  // deleteDoc,
  // doc,
  getDocs,
  // updateDoc,
} from "firebase/firestore";
// import type { Order } from "../../types";
import { db } from "../../firbase/firebase.con";
import { useEffect, useState } from "react";
import type { Order, Order2 } from "../../types";
import Rodal from "rodal";
import {
  useDeleteOrdersMutation,
  // useGetOrderQuery,
  useGetOrdersQuery,
} from "../../redux/api/orderApi";
// import Dropdown from "react-bootstrap/Dropdown";

const AdminDelivered = () => {
  const [arr1, setArr] = useState<Order2[]>([]);
  const [arr2, setArr2] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  // const [id, setid] = useState<string | null>(null);

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

  const { data: orders = [] } = useGetOrdersQuery({});

  // const { data: order = {} } = useGetOrderQuery(id);

  // const handleStatus = async (id: string) => {
  //   console.log(id);
  //   await updateDoc(doc(db, "orders", id), { status: true });
  //   fetchProducts();
  // };

  const seeOrders = (id: string) => {
    console.log(id);
    if (orders.length === 0) return;

    const order = orders.find((c: Order2) => c.id === id);
    if (!order) return;

    setArr2(order.orders || []);
    setOpen(true);
  };

  const [deleteOrder] = useDeleteOrdersMutation();

  // const deleteOne = async (id: string) => {
  //   await deleteDoc(doc(db, `orders`, id));
  //   fetchProducts();
  // };

  return (
    <div>
      {/* <table className="table mt-4 table-bordered w-100">
        <tbody>
          {arr1
            .filter((c) => c.status === true)
            ?.map((c: Order2, index: number) => (
              <tr>
                <td>{index + 1}</td>
                <td>{c.name}</td>
                <td>{c.location}</td>
                <td>{c.phonenumber}</td>
                <td>
                  <button
                    onClick={() => seeOrders(c.id)}
                    className="btn btn-primary"
                  >
                    See orders
                  </button>
                </td>
                <td>
                  {c.status ? (
                    <button className="btn btn-success mt-2">Delivered</button>
                  ) : (
                    <button
                      onClick={() => handleStatus(c.id)}
                      className="btn btn-danger mt-2"
                    >
                      New
                    </button>
                  )}
                  <button
                    onClick={() => deleteOne(c.id)}
                    className="mx-2 btn btn-primary mt-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}

      <div className="overflow-x-auto bg-neutral-primary-soft shadow-xs rounded m-4 border border-default">
        <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Location
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Pnonenumber
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Details
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((c: Order2) => c.status === true)
              .map((c: Order2) => (
                <tr className="bg-neutral-primary border-b border-default">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {c.name}
                  </th>
                  <td className="px-6 py-4">{c.phonenumber}</td>
                  <td className="px-6 py-4">{c.location}</td>
                  <td className="px-6 py-4">
                    {" "}
                    <div
                      onClick={() => seeOrders(c.id)}
                      className="border cursor-pointer rounded p-2 bg-blue-600 text-white flex items-center justify-center"
                    >
                      Show orders
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {c.status === false ? (
                      <div
                        // onClick={() => handleStatus(c)}
                        className=" cursor-pointer border rounded p-2 bg-red-600 text-white flex items-center justify-center"
                      >
                        New order
                      </div>
                    ) : (
                      <div className="cursor-pointer border rounded p-2 bg-green-600 text-white flex items-center justify-center">
                        Delivered
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteOrder(c.id)}
                      className=" cursor-pointer border rounded p-2 bg-red-600
                    text-white flex items-center justify-center"
                    >
                      Delete Order
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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

export default AdminDelivered;

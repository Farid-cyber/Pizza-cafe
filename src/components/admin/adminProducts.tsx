import { useEffect, useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getForm,
  // handleSaveProduct,
  reset,
  setEditingId,
  editProduct,
} from "../../redux/slices/productsSlice";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../redux/api/productApi";
import type { Category, Product } from "../../types";
import { useGetCategoriesQuery } from "../../redux/api/catApi";
// import Dropdown from "react-bootstrap/Dropdown";

const AdminProducts = () => {
  // const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [types, setTypes] = useState<string[]>([""]);

  // const [search, setSearch] = useState("");
  const { productForm, editingId } = useAppSelector((state) => state.products);
  // console.log();

  const dispatch = useAppDispatch();
  // const [options, setOptions] = useState(["traditsionniy", "tonkiy"]);

  const handleImageUrl = (value: string, index: number) => {
    sizes[index] = value;
    setSizes([...sizes]);
  };

  const removeImage = (index: number) => {
    if (sizes.length <= 1) {
      return;
    }
    sizes.splice(index, 1);
    setSizes([...sizes]);
  };

  const addImage = () => {
    sizes.push("");
    setSizes([...sizes]);
  };

  const [addUser] = useAddUserMutation();
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: products = [] } = useGetUsersQuery({});
  const { data: categories } = useGetCategoriesQuery({});

  // console.log(products);
  function randomRating(length: number = 1): number {
    const chars = `12345`;
    let id = 0;
    for (let index = 0; index < length; index++) {
      id += Number(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    return id;
  }

  const handleSave = () => {
    // const numericSizes = sizes
    //   .map((size) => Number(size))
    //   .filter((num) => !isNaN(num));
    // const numericTypes = types
    //   .map((size) => Number(size))
    //   .filter((num) => !isNaN(num));
    if (editingId === null) {
      addUser({
        ...productForm,
        sizes: sizes,
        types: types,
        id: Date.now().toString(),
        rating: randomRating(),
      });
    } else {
      editUser({ ...productForm, sizes: sizes, types: types, id: editingId });
      console.log(productForm.types);
      dispatch(setEditingId());
      console.log(productForm);
    }
    dispatch(reset());
    setSizes([""]);
    setTypes([""]);
    setOpen(false);
  };

  const handleEditUser = (user: Product) => {
    console.log(user);
    setOpen(true);
    console.log(user.sizes);

    setSizes(user.sizes.length > 0 ? [...user.sizes] : [""]);
    setTypes(user.types.length > 0 ? [...user.types] : [""]);
    // console.log(types);
    dispatch(editProduct(user));
  };

  const handleTypr = (value: string, index: number) => {
    types[index] = value;
    setSizes([...sizes]);
  };

  const removeType = (index: number) => {
    if (types.length <= 1) {
      return;
    }
    types.splice(index, 1);
    setTypes([...types]);
    // handleImageUrl(value, index);
  };

  const addType = () => {
    if (types.length >= 2) {
      return;
    }
    types.push("");
    setTypes([...types]);
  };

  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState("");

  // const findCat = (id: string) => {
  //   let name = categories?.find((c: Category) => c.id === id).name;
  //   return name;
  // };

  useEffect(() => {}, [searched]);

  return (
    <div className="p-4 w-100" style={{ width: "100%" }}>
      <div className="w-100 d-flex p-4 justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="search proudct by name..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          + product
        </button>
      </div>
      <div className="d-flex w-100 p-3 flex-wrap justify-content-between gap-2 ">
        {/* <table className="table mt-4 table-bordered w-100">
        <tbody> */}
        {(searched === ""
          ? products
          : products.filter((c: Product) =>
              c.title.toUpperCase().includes(searched?.toUpperCase())
            )
        )?.map((c: Product) => (
          // <tr>
          //   <td>{index + 1}</td>
          //   <td>
          //     <img src={c.imageUrl} alt="" width={100} />
          //   </td>
          //   <td>{c.title}</td>
          //   {/* <td>{() => findCat(c.categoryId)}</td> */}
          //   <td>{c.price} ₽</td>
          //   <td>
          //     <Dropdown>
          //       <Dropdown.Toggle variant="success" id="dropdown-basic">
          //         Types
          //       </Dropdown.Toggle>
          //       <Dropdown.Menu>
          //         {c.types?.map((c) => (
          //           <Dropdown.Item href="#/action-1">
          //             {c === 0 ? "Tonkiy" : "traditional"}
          //           </Dropdown.Item>
          //         ))}{" "}
          //       </Dropdown.Menu>
          //     </Dropdown>
          //   </td>
          //   <td>
          //     <Dropdown>
          //       <Dropdown.Toggle variant="success" id="dropdown-basic">
          //         Sizes
          //       </Dropdown.Toggle>
          //       <Dropdown.Menu>
          //         {c.sizes?.map((c) => (
          //           <Dropdown.Item href="#/action-1">{c} SM</Dropdown.Item>
          //         ))}{" "}
          //       </Dropdown.Menu>
          //     </Dropdown>
          //   </td>
          //   <td className="">
          //     <button
          //       onClick={() => deleteUser(c.id.toString())}
          //       className="btn btn-light"
          //     >
          //       ❌
          //     </button>
          //     <button
          //       onClick={() => handleEditUser(c)}
          //       className="btn btn-light mx-2"
          //     >
          //       ✏
          //     </button>
          //   </td>
          // </tr>
          <div className="bg-white border rounded mt-2 p-2 d-flex flex-column align-items-center text-center">
            <img src={c.imageUrl} alt="" width={200} />
            <h2 className="text-center">{c.title}</h2>
            <div className="types-sizes">
              <div className="d-flex w-100 p-1">
                {c.types?.map((c) => (
                  <button
                    // onClick={() => handleType(index)}
                    className={`selected2 mx-1 w-100`}
                  >
                    {c === "1" ? "традиционный" : "Тонкий"}
                  </button>
                ))}
              </div>
              <div className="d-flex w-100 p-1">
                {c.sizes?.map((s) => (
                  <button
                    // onClick={() => handleSize(index)}
                    className={`selected2 mx-1 w-100`}
                  >
                    {s} см
                  </button>
                ))}
              </div>
            </div>
            <div className="d-flex flex-column w-100 p-2 justify-content-between align-items-center mt-2">
              <h3>ot {c.price} ₽</h3>
              <div className="mt-2 d-flex justify-content-between w-100 gap-2">
                <button
                  onClick={() => deleteUser(c.id)}
                  className="w-100 btn btn-danger"
                >
                  X
                </button>
                <button
                  onClick={() => handleEditUser(c)}
                  className="w-100 btn btn-warning"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* </tbody>
      </table> */}
      </div>
      <Rodal
        onClose={() => {
          setOpen(false), dispatch(reset());
        }}
        visible={open}
        customStyles={{ height: "max-content" }}
      >
        <input
          value={productForm.imageUrl}
          onChange={(e) =>
            dispatch(getForm({ key: "imageUrl", value: e.target.value }))
          }
          type="text"
          className="form-control mt-4 w-100"
          placeholder="imageUrl..."
        />
        <input
          value={productForm.title}
          onChange={(e) =>
            dispatch(getForm({ key: "title", value: e.target.value }))
          }
          type="text"
          className="form-control mt-2 w-100"
          placeholder="title..."
        />
        <input
          value={productForm.price}
          onChange={(e) =>
            dispatch(getForm({ key: "price", value: e.target.value }))
          }
          type="number"
          className="form-control mt-2 w-100"
          placeholder="price..."
        />
        <select
          value={productForm.categoryId}
          onChange={(e) =>
            dispatch(getForm({ key: "categoryId", value: e.target.value }))
          }
          className="form-select my-2"
        >
          <option value="0" disabled selected>
            add category
          </option>
          {categories?.map((c: Category) => (
            <option value={c.id}>{c.name}</option>
          ))}
        </select>
        <div>
          1. Traditional
          <br />
          2. Triyoki
        </div>
        {types.map((image, index) => (
          <div className="d-flex gap-2">
            <input
              value={image}
              onChange={(e) => handleTypr(e.target.value, index)}
              type="number"
              className="form-control mt-2"
              placeholder="types..."
            />
            <button
              onClick={() => removeType(index)}
              className="btn btn-close"
            ></button>
          </div>
        ))}
        <button onClick={addType} className="btn btn-success w-100 mt-2">
          Add type
        </button>
        {sizes.map((image, index) => (
          <div className="d-flex gap-2">
            <input
              value={image}
              onChange={(e) => handleImageUrl(e.target.value, index)}
              type="text"
              className="form-control mt-2"
              placeholder="new sizes..."
            />
            <button
              onClick={() => removeImage(index)}
              className="btn btn-close"
            ></button>
          </div>
        ))}
        <button onClick={addImage} className="btn btn-success w-100 mt-2">
          Add size
        </button>
        <button onClick={handleSave} className="btn btn-primary w-100 mt-2">
          Save
        </button>
      </Rodal>
    </div>
  );
};

export default AdminProducts;

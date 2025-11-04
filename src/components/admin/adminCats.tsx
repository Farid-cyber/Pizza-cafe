import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getForm,
  // handleSaveProduct,
  reset,
  setEditingIdCat,
  deleteCategory,
  editCategory,
} from "../../redux/slices/catsSlice";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "../../redux/api/catApi";
import type { Category } from "../../types";

const AdminCats = () => {
  const [open, setOpen] = useState(false);

  console.log(2);
  const { categoryForm, editingId } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  const [addUser] = useAddCategoryMutation();
  const [updateUser] = useEditCategoryMutation();
  const [deleteUser] = useDeleteCategoryMutation();
  const { data: categories = [] } = useGetCategoriesQuery({});

  const handleSave = () => {
    if (editingId === null) {
      addUser({ ...categoryForm, id: Date.now() });
    } else {
      updateUser({ ...categoryForm, id: editingId });
      dispatch(setEditingIdCat());
    }
    dispatch(reset());
    setOpen(false);
  };

  const handleEditUser = (user: Category) => {
    console.log(user);
    setOpen(true)
    dispatch(editCategory(user));
  };
  const handleDel = (id: string) => {
    deleteUser(id), dispatch(deleteCategory(id));
  };

  return (
    <div className="p-4">
      <div className="w-100 d-flex justify-content-end">
        <button onClick={() => setOpen(true)} className="btn btn-primary my-3">
          + Category
        </button>
      </div>
      <table className="table mt-4">
        <tbody>
          {categories?.map((c: Category, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>
                <button
                  onClick={() => handleDel(c.id)}
                  className="btn btn-danger"
                >
                  X
                </button>
                <button
                  onClick={() => handleEditUser(c)}
                  className="btn btn-warning mx-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Rodal
        onClose={() => setOpen(false)}
        visible={open}
        customStyles={{ height: "max-content" }}
      >
        <input
          value={categoryForm.name}
          onChange={(e) =>
            dispatch(getForm({ key: "name", value: e.target.value }))
          }
          type="text"
          className="form-control mt-4 w-100"
          placeholder="name..."
        />

        <button onClick={handleSave} className="btn btn-primary w-100 mt-2">
          Save
        </button>
      </Rodal>
    </div>
  );
};

export default AdminCats;

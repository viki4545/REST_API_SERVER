import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Crud from "../crud/crud";
import CrudForm from "../crudForm/crudForm";
import {
  deleteCrudThunk,
  fetchCrudThunk,
  updateCrudThunk,
  addCrudThunk,
} from "../../features/crud/crudSlice";

import "./crudList.css";

const CrudList = () => {
  const dispatch = useDispatch();
  const crud = useSelector((state) => state.cruds.items);
  const status = useSelector((state) => state.cruds.status);
  const error = useSelector((state) => state.cruds.error);
  const [editingCrud, setEditingCrud] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCrudThunk());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const handleEdit = (crud) => {
    setEditingCrud(crud);
    setIsFormVisible(true);
  };

  const handleUpdate = (updatedCrud) => {
    dispatch(updateCrudThunk({ id: editingCrud._id, data: updatedCrud }));
    setEditingCrud(null);
    setIsFormVisible(false);
    toast.success("Data updated successfully!");
  };

  const handleAdd = (newCrud) => {
    dispatch(addCrudThunk(newCrud));
    setIsFormVisible(false);
    toast.success("Data added successfully!");
  };

  const handleDelete = (id) => {
    dispatch(deleteCrudThunk(id));
    toast.success("Data deleted successfully!");
  };

  const handleCancel = () => {
    setEditingCrud(null);
    setIsFormVisible(false);
  };

  return (
    <div className="crud-list-container">
      <button className="show-form-btn" onClick={() => setIsFormVisible(true)}>
        Add New Item
      </button>
      {isFormVisible && (
        <CrudForm
          initialData={editingCrud || {}}
          onSubmit={editingCrud ? handleUpdate : handleAdd}
          onCancel={handleCancel}
        />
      )}
      <div className="data-list">
        {crud.map((item) => (
          <Crud
            key={item._id}
            data={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CrudList;

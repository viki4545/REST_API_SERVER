import React, { useState, useEffect } from "react";
import "./crudForm.css";

const CrudForm = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData.name || "");
  const [img, setImg] = useState(initialData.img || "");
  const [summary, setSummary] = useState(initialData.summary || "");

  useEffect(() => {
    setName(initialData.name || "");
    setImg(initialData.img || "");
    setSummary(initialData.summary || "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCrud = { name, img, summary };
    onSubmit(updatedCrud);
  };

  return (
    <form className="crud-form" onSubmit={handleSubmit}>
      <h3>{initialData._id ? "Edit Book" : "Add New Book"}</h3>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </label>
      <label>
        Summary:
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </label>
      <button type="submit">{initialData._id ? "Update" : "Add"}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CrudForm;

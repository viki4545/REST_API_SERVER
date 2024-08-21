import React from "react";
import "./crud.css";

const Crud = ({ data, onEdit, onDelete }) => {
  return (
    <div className="data">
      <img src={data?.img} alt={""} className="data-img" />
      <div className="data-details">
        <h3>{data?.name}</h3>
        <p>{data?.summary}</p>
        <div className="data-actions">
          <button onClick={() => onEdit(data)} className="edit-btn">
            Edit
          </button>
          <button onClick={onDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Crud;

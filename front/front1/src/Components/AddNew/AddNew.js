import "./AddNew.css";
import React from "react";

const AddNew = (props) => {
  return (
    <div className="add-new">
      <div className="add-new-form">
        <div className="Project-name">
          <label className="label">
            <input
              type="text"
              id="name"
              className="text"
              placeholder=" "
              value={props.text}
              onChange={props.new}
            />
            <span className="input-type">{props.name} Name </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddNew;

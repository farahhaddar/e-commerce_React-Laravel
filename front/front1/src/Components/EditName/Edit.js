import "../AddNew/AddNew.css";
import React from "react";

const Edit = (props) => {
  return (
    <div className="add-new">
      <div className="add-new-form">
        <div className="Project-name">
          <label className="label">
            <input
              type="text"
              id=""
              className="text"
              placeholder=""
              value={props.text}
              onChange={props.update}
            />
            <span className="input-type">Updated Name </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Edit;

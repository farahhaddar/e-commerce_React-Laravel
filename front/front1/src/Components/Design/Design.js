import React, { Component } from "react";

const token = localStorage.getItem("token");
class Design extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label className="label">
          <input
            id="name"
            name="name"
            aria-invalid="false"
            type="text"
            placeholder=" "
            onChange="{this.handleInputChange}"
            className="text"
          />
          <span className="input-type">Name </span>
        </label>
        <div>
          <button className="add">Add</button>
        </div>
        <div className="new" onClick="...">
          <h6>New Project</h6>
        </div>

        <div className="App top-margin"></div>
      </div>
    );
  }
}

export default Design;

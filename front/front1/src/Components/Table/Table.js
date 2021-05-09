import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Table.css";

let page = 0,
  rows = 0;
class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
  }
  // page(e) {
  //   console.log("hi");
  //   console.log(e);
  // }
  pageOptions() {
    let a = document.getElementsByClassName("pageOptions");
    if (page == 0) {
      page = 1;
      a[0].style.display = "";
      let addClass = document.getElementsByClassName("page");
      addClass[0].classList.remove("pageborder");
    } else {
      page = 0;
      a[0].style.display = "none";
      let addClass = document.getElementsByClassName("page");
      addClass[0].classList.add("pageborder");
      // a[0].classList.remove("page1");
    }
  }
  page = (value) => () => {
    console.log(value);
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    page = 0;
    let pageOptions = document.getElementsByClassName("page");
    pageOptions[0].innerHTML = "Page " + value;
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
  };

  rowsOptions() {
    let a = document.getElementsByClassName("rowsOptions");
    if (rows == 0) {
      rows = 1;
      a[0].style.display = "";
      let addClassRows = document.getElementsByClassName("rows");
      addClassRows[0].classList.remove("rowsborder");
    } else {
      rows = 0;
      a[0].style.display = "none";
      let addClassRows = document.getElementsByClassName("rows");
      addClassRows[0].classList.add("rowsborder");
    }
  }
  rows = (value) => () => {
    console.log(value);
    let a = document.getElementsByClassName("rowsOptions");
    a[0].style.display = "none";
    rows = 0;
    let rowsOptions = document.getElementsByClassName("rows");
    rowsOptions[0].innerHTML = "Rows " + value;
    let addClass = document.getElementsByClassName("rows");
    addClass[0].classList.add("rowsborder");
  };
  componentDidMount() {
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");
  }
  render() {
    var x = [];
    x.push(
      <div class="container">
        <div className="page page1">Page 1</div>
        {/* the size of this below is 3*number of pages + 10 */}
        <div className="pageOptions">
          {/* the size of this above is 3*number of pages + 10 */}
          <div>
            <div onClick={this.page("1")}>Page 1</div>
            <div onClick={this.page("2")}>Page 2</div>
            <div onClick={this.page("3")}>Page 3</div>
          </div>
        </div>
      </div>
    );
    // alert(window.innerWidth);
    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 4; j++) {

    //   }
    // }
    return (
      <div className="App">
        {/* <input
          aria-invalid="false"
          placeholder="Search 42 records..."
          type="text"
          class="MuiInputBase-input MuiInput-input jss168"
          value=""
        /> */}
        <div className="table">
          <div className="pn">
            <input type="button" className="previous" value="Previous" />
            {/* input here */}
            {/* <div id="userList">
              <div>profile</div>
              <div>profile</div>
              <div>profile</div>
            </div> */}
            <div class="container">
              <div onClick={this.pageOptions} className="page">
                Page 1
              </div>
              {/* the size of this below is 3*number of pages + 10 */}
              <div className="pageOptions">
                {/* the size of this above is 3*number of pages + 10 */}
                <div>
                  <div onClick={this.page("1")}>Page 1</div>
                  <div onClick={this.page("2")}>Page 2</div>
                  <div onClick={this.page("3")}>Page 3</div>
                </div>
              </div>
            </div>

            {/* input here */}
            <div class="container">
              <div onClick={this.rowsOptions} className="rows">
                Rows 1
              </div>
              {/* the size of this below is 3*number of pages + 10 */}
              <div className="rowsOptions">
                {/* the size of this above is 3*number of pages + 10 */}
                <div>
                  <div onClick={this.rows("1")}>Row 1</div>
                  <div onClick={this.rows("2")}>Row 2</div>
                  <div onClick={this.rows("3")}>Row 3</div>
                </div>
              </div>
            </div>
            {/* <div>asdsad</div> */}
            <input type="button" className="next" value="Next" />
          </div>
          <div>
            <div className="row1">
              <div className="col0 col3">Name</div>
              <div className="col0 col3">Position</div>
              <div className="col0 col3">Office</div>
              <div className="col0 col3 hide">Office</div>
              <div className="actionTitle col0 col3">Action</div>
            </div>
          </div>
          <div className="row1">
            <div className="col0 col3 search">
              <input
                aria-invalid="false"
                placeholder="Search 42 records..."
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col3 search">
              <input
                aria-invalid="false"
                placeholder="Search 42 records..."
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col3 search">
              <input
                aria-invalid="false"
                placeholder="Search 42 records..."
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col3 search hide">
              <input
                aria-invalid="false"
                placeholder="Search 42 records..."
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
          </div>
          <div className="row0 rowData">
            <div className="col0 col3">adssadasd asdsad sdfdsfdsd </div>
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">
              <div className="action">
                <div>
                  <FontAwesomeIcon className="blueHeart" icon={faHeart} />
                </div>
                <div>
                  <FontAwesomeIcon className="redTrash" icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
          <div className="row1 rowData">
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">
              <div className="action">
                <div>
                  <FontAwesomeIcon className="blueHeart" icon={faHeart} />
                </div>
                <div>
                  <FontAwesomeIcon className="redTrash" icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
          <div className="row0 rowData">
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">adssadasdasdsad</div>
            <div className="col0 col3">
              <div className="action">
                <div>
                  <FontAwesomeIcon className="blueHeart" icon={faHeart} />
                </div>
                <div>
                  <FontAwesomeIcon className="redTrash" icon={faTrash} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Table;

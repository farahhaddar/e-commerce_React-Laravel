import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faTasks,
  faEdit,
  faUser,
  faLevelUpAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import "../AddNew/AddNew";
import "./Orders.css";
import "../Table/Table.css";
import ManageProject from "../ManageProjects/ManageProject";
import AddNew from "../AddNew/AddNew";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

// import EditName from "../EditName/EditName";

let page = 0,
  rows = 0;
let edit,
  manage = 0;
const token = localStorage.getItem("token");
class OrderDetailsPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      name: "",
      user: "",
      delivery_fees: "",
      showAdd: false,
      showManage: false,
      showEdit: false,
      newName: "",
      editName: "",
      search1: "",
      search2: "",
      search3: "",
      orderProducts: "",
      orderPackages: "",
      orderEdited: "",
      rows: 5,
      userName: "",
      userEmail: "",
      orderId: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
  }
  deleteOrder(e) {
    fetch("http://localhost:8000/api/OrderPackages/" + e, {
      method: "delete",
      // body: formData,
      headers: {
        Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((res) => {
        this.componentDidMount();
      });
  }
  search() {
    fetch(
      "http://localhost:8000/api/OrderPackages/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1 +
        "&order_id=" +
        this.state.orderId,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ orderProducts: JSON.parse(res).data }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(
      n + "&name=" + this.state.search1 + "&order_id=" + this.state.orderId,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ orderProducts: JSON.parse(res).data }));
  }
  last() {
    let n = document.getElementById("last").getAttribute("data");
    fetch(
      n + "&name=" + this.state.search1 + "&order_id=" + this.state.orderId,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ orderProducts: JSON.parse(res).data }));
  }
  handleAddModal() {
    this.setState({ orderEdited: "" });
    this.setState({ showAdd: !this.state.showAdd });
  }
  handleManageModal(e) {
    manage = e;
    this.setState({ showManage: !this.state.showManage });
  }
  userInfo(e) {
    // alert(e);
    fetch("http://localhost:8000/api/user/" + e, {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(JSON.parse(res).data);
        // this.setState({ user: JSON.parse(res) });
        this.setState({ userName: JSON.parse(res).data.name });
        this.setState({ userEmail: JSON.parse(res).data.email });
      });
    this.setState({ showEdit: !this.state.showEdit });
  }
  handleEditModal(e) {
    if (e != undefined) {
      edit = e;
      fetch("http://localhost:8000/api/Order/" + e, {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.text())
        .then((res) => {
          this.setState({ orderEdited: JSON.parse(res) });
          this.setState({ name: this.state.orderEdited.name });
          this.setState({
            delivery_fees: this.state.orderEdited.delivery_fees,
          });
        });
      this.setState({ editName: this.state.orderEdited.name });
    } else this.setState({ orderEdited: "" });
    this.setState({ showEdit: !this.state.showEdit });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleEditChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clear() {
    this.setState({ newName: "" });
  }
  handleEdit = async (e) => {
    e.preventDefault();
    try {
      // var newDate = new Date();
      // console.log(newDate);
      // var d =
      //   newDate.getFullYear() +
      //   "/" +
      //   (newDate.getMonth() + 1) +
      //   "/" +
      //   newDate.getDate();
      var d = new Date();
      var dd = String(d.getDate()).padStart(2, "0");
      var mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = d.getFullYear();

      d = yyyy + "/" + mm + "/" + dd;
      console.log(d);

      // d = "2021/01/01";
      // var date = d.toString();
      await Axios.post(
        "http://localhost:8000/api/Order/" + edit,
        {
          name: this.state.name,
          delivery_fees: this.state.delivery_fees,
          _method: "PUT",
        },
        {
          headers: {
            // Accept: "application/json",
            // Authorization: "Bearer " + token,
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          this.componentDidMount();
        }
      });
    } catch (err) {
      console.log(err);
    }
    this.clear();
  };
  handleAddNew = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(
        "http://localhost:8000/api/Order",
        {
          name: this.state.name,
          delivery_fees: this.state.delivery_fees,
        },
        {
          headers: {
            // Accept: "application/json",
            // Authorization: "Bearer " + token,
          },
        }
      ).then((response) => {
        // if (response.status === 200) {
        console.log(response);
        this.componentDidMount();
        // }
      });
    } catch (err) {
      console.log(err);
    }
    this.clear();
    this.handleAddModal();
  };
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
    pageOptions[0].innerHTML = "Page " + value.k;
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    fetch(
      "http://localhost:8000/api/OrderPackages/" +
        this.state.rows +
        "?page=" +
        value.k +
        "&name=" +
        this.state.search1 +
        "&order_id=" +
        this.state.orderId,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ orderProducts: JSON.parse(res).data }));
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
    rowsOptions[0].innerHTML = value + " rows";
    let addClass = document.getElementsByClassName("rows");
    addClass[0].classList.add("rowsborder");

    fetch(
      "http://localhost:8000/api/OrderPackages/" +
        value +
        "?page=1&name=" +
        this.state.search1 +
        "&order_id=" +
        this.state.orderId,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ orderProducts: JSON.parse(res).data }));
    this.setState({ rows: value });

    this.setState({ rows: value });
  };
  componentDidMount() {
    const { orderId } = this.props.location.state;
    this.setState({ orderId: orderId });
    this.props.title("Orders");
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");

    fetch(
      "http://localhost:8000/api/OrderPackages/" +
        this.state.rows +
        "?order_id=" +
        orderId,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ orderProducts: JSON.parse(res).data }));
    var search1 = document.getElementById("search1");
    search1.addEventListener("input", (event) => {
      this.setState({ search1: search1.value });
      this.search();
    });
    var search2 = document.getElementById("search2");
    search2.addEventListener("input", (event) => {
      this.setState({ search2: search2.value });
      this.search();
    });
    var search3 = document.getElementById("search3");
    search3.addEventListener("input", (event) => {
      this.setState({ search3: search3.value });
      this.search();
    });
  }
  componentDidUpdate() {
    // var search0 = document.getElementById("search0");
    // if (search0 && flag == 0) {
    //   flag = 1;
    //   if (flagNav == 0) flag = 0;
    // search0.removeEventListener("input", this.Input);
    // search0.addEventListener("input", () => this.Input(search0.value));
    // search0.addEventListener("input", () => this.Input(search0.value));
    // }
    let l = document.getElementById("last").getAttribute("data");
    if (l == null) {
      document.getElementById("last").classList.add("not_clickable");
    } else {
      document.getElementById("last").classList.remove("not_clickable");
    }
    let n = document.getElementById("next").getAttribute("data");
    if (n == null) {
      document.getElementById("next").classList.add("not_clickable");
    } else {
      document.getElementById("next").classList.remove("not_clickable");
    }
  }
  render() {
    console.log(this.state.orderProducts);
    let count = "";
    if (this.state.orderProducts.data != undefined) {
      count = this.state.orderProducts.total;
      var last_page = this.state.orderProducts.prev_page_url;
      var next_page = this.state.orderProducts.next_page_url;
      var nbPages = this.state.orderProducts.last_page;
      var sizePage = 30 * nbPages + 10;
      var pageList = [];
      var pageList1 = [];
      for (let i = 0; i < nbPages; i++) {
        let k = i + 1;
        pageList1.push(<div onClick={this.page({ k })}>Page {k}</div>);
      }

      pageList.push(<div>{pageList1}</div>);
    }
    var array = [];
    if (this.state.orderProducts.data != undefined) {
      for (let i = 0; i < this.state.orderProducts.data.length; i++) {
        let c = i % 2;
        {
          /* ttt */
        }
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col4">
              {this.state.orderProducts.data[i].packages.name}
            </div>
            <div className="col0 col4">
              {this.state.orderProducts.data[i].packages.price}
            </div>
            <div className="col0 col4">
              {this.state.orderProducts.data[i].quantity}
            </div>
            <div className="col0 col4">Package</div>

            <div className="col0 col4">
              <div className="action"></div>
            </div>
          </div>
        );
      }
    }
    console.log(this.state.orderEdited);
    return (
      <div className="App">
        {/* <div className="project-title">
          <div
            className="add-project"
            onClick={() => {
              this.handleAddModal();
            }}
          >
            <h6> New Project</h6>
          </div>
        </div> */}
        {/* <div
          className="new add-background"
          onClick={() => {
            this.handleAddModal();
          }}
        >
          New Order
        </div> */}

        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showAdd}
        >
          <Modal.Header centered>
            <h4> New Order</h4>
          </Modal.Header>
          <Modal.Body>
            <label className="label">
              <input
                name="address"
                id="address"
                className="text"
                aria-invalid="false"
                type="text"
                placeholder=" "
                onChange={this.handleChange}
              />
              <span className="input-type"> Address </span>
            </label>
            <label className="label">
              <input
                name="comment"
                id="comment"
                className="text"
                aria-invalid="false"
                type="text"
                placeholder=" "
                onChange={this.handleChange}
              />
              <span className="input-type"> Comment </span>
            </label>
            <label className="label">
              <input
                name="price"
                id="price"
                className="text"
                aria-invalid="false"
                type="text"
                placeholder=" "
                onChange={this.handleChange}
              />
              <span className="input-type"> Price </span>
            </label>
          </Modal.Body>
          <Modal.Footer className="footer">
            <button className="add add-background" onClick={this.handleAddNew}>
              Add
            </button>
            <button
              className="add add-background"
              onClick={() => {
                this.handleAddModal();
              }}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showEdit}
        >
          <Modal.Header centered>
            {/* <div className="userInfoHeader"> */}
            <h4>User Info</h4>
            <h4
              className="userInfoHeaderClose"
              onClick={() => {
                this.handleEditModal();
              }}
            >
              x
            </h4>
            {/* </div> */}
          </Modal.Header>
          <Modal.Body>
            {/* <AddNew
              name="Project"
              new={this.handleEditChange}
              text={this.state.editName}
            /> */}
            <label className="label">
              <input
                type="text"
                id="address"
                name="address"
                className="text"
                placeholder=" "
                defaultValue={this.state.userName}
                // onChange={this.handleEditChange}
                readOnly
              />
              <span className="input-type">User Name </span>
            </label>
            <label className="label">
              <input
                type="text"
                id="comment"
                name="comment"
                className="text"
                placeholder=" "
                defaultValue={this.state.userEmail}
                // onChange={this.handleEditChange}
                readOnly
              />
              <span className="input-type">User Email </span>
            </label>
          </Modal.Body>
          <Modal.Footer className="footer">
            {/* <button onClick={this.handleEdit} className="add add-background">
              Update
            </button> */}
            {/* <button
              className="add add-background"
              onClick={() => {
                this.handleEditModal();
              }}
            >
              Cancel
            </button> */}
          </Modal.Footer>
        </Modal>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          className="manage-modal"
          show={this.state.showManage}
        >
          <Modal.Header centered>
            <h6> Manage Project Teams</h6>
          </Modal.Header>
          <Modal.Body>
            <ManageProject projectId={manage} cancel={this.handleManageModal} />
          </Modal.Body>
          <Modal.Footer className="footer">
            <div></div>
            <button
              className="add add-background"
              onClick={() => {
                this.handleManageModal();
              }}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
        <Link
          className="link-to"
          to={{
            pathname: "/admin/OrderDetails",
            state: {
              orderId: this.state.orderId,
            },
          }}
        >
          Products Ordered
        </Link>
        <div className="table project-tbl">
          <div className="pn">
            <input
              id="last"
              onClick={() => {
                this.last();
              }}
              type="button"
              className="previous"
              value="Previous"
              data={last_page}
            />

            <div class="container">
              <div onClick={this.pageOptions} className="page">
                Page 1
              </div>
              <div className="pageOptions" style={{ height: sizePage + "px" }}>
                {pageList}
              </div>
            </div>
            <div class="container">
              <div onClick={this.rowsOptions} className="rows">
                5 rows
              </div>
              <div className="rowsOptions">
                <div>
                  <div onClick={this.rows("5")}>5 rows</div>
                  <div onClick={this.rows("10")}>10 rows</div>
                  <div onClick={this.rows("20")}>20 rows</div>
                  <div onClick={this.rows("25")}>25 rows</div>
                  <div onClick={this.rows("50")}>50 rows</div>
                  <div onClick={this.rows("100")}>100 rows</div>
                </div>
              </div>
            </div>

            <input
              id="next"
              onClick={() => {
                this.next();
              }}
              type="button"
              className="next"
              value="Next"
              data={next_page}
            />
          </div>
          <div>
            <div className="row1">
              <div className="col0 col4">Name</div>
              <div className="col0 col4">Price</div>
              <div className="col0 col4">Quantity</div>
              <div className="col0 col4">Description</div>

              <div className="col0 col4 hide">Date</div>
              <div className="actionTitle col0 col4">Action</div>
            </div>
          </div>
          <div className="row1">
            <div className="col0 col4 search">
              <input
                id="search1"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col4 search">
              <input
                id="search2"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col4 search">
              <input
                id="search3"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col4 search">
              <input
                id="search4"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col4 search hide">
              <input
                id="search2"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
          </div>
          {/* ttt */}
          {array}
        </div>
      </div>
    );
  }
}
export default OrderDetailsPackages;

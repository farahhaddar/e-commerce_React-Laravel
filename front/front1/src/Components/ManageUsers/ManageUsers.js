import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form } from "react-bootstrap";
let page = 0,
  rows = 0;
let flag = 0,
  flagNav = 0;
let id = 0;
const token = localStorage.getItem("token");
class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      show: false,
      users: "",
      search1: "",
      search2: "",
      search3: "",
      rows: 5,
      searchTeam: "",
      teams: "",
      name: "",
      email: "",
      password: "",
      AllCity: [],
      image: "",
      phoneNb: "",
      adress: "",
      extraInfo: "",
      city_id: "",
      teamId: "",
      userEdited: "",
      modalHeader: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.test = this.test.bind(this);
  }
  search() {
    fetch(
      "http://localhost:8000/api/admin/users/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1 +
        "&email=" +
        this.state.search2,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ users: JSON.parse(res) }));
  }
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(l + "&name=" + this.state.search1, {
      headers: {
        // Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ users: JSON.parse(res) }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(n + "&name=" + this.state.search1, {
      headers: {
        // Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ users: JSON.parse(res) }));
  }
  handleModal() {
    this.setState({ userEdited: "" });
    this.setState({ image: "" });
    id = 0;
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      // document
      //   .getElementById("search0")
      //   .removeEventListener("input", this.Input);
      // this.setState({ teams: "" });
    } else {
      flagNav = 1;
    }
    this.setState({ show: !this.state.show });
  }
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
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    page = 0;
    let pageOptions = document.getElementsByClassName("page");
    pageOptions[0].innerHTML = "Page " + value.k;
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    fetch(
      "http://localhost:8000/api/admin/users/" +
        this.state.rows +
        "?page=" +
        value.k +
        "&name=" +
        this.state.search1 +
        "&email=" +
        this.state.search2,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ users: JSON.parse(res) }));
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
    let a = document.getElementsByClassName("rowsOptions");
    a[0].style.display = "none";
    rows = 0;
    let rowsOptions = document.getElementsByClassName("rows");
    rowsOptions[0].innerHTML = value + " rows";
    let addClass = document.getElementsByClassName("rows");
    addClass[0].classList.add("rowsborder");
    fetch(
      "http://localhost:8000/api/admin/users/" +
        value +
        "?page=1&name=" +
        this.state.search1 +
        "&email=" +
        this.state.search2,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ users: JSON.parse(res) }));
    this.setState({ rows: value });
  };
  componentDidMount() {
    this.state.city_id = 1;
    this.props.title("Users");
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");
    //
    fetch(
      "http://localhost:8000/api/admin/users/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1 +
        "&email=" +
        this.state.search2,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        this.setState({ users: JSON.parse(res) });
      });

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

    const urlCity = "http://localhost:8000/api/cities/1000";
    const response2 = fetch(urlCity, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ AllCity: res.data });
      });
  }
  // select(e, q) {
  //   document.getElementById("search0").setAttribute("data", e);
  //   document.getElementById("search0").value = q;
  //   this.setState({ teams: "" });
  // }
  // searchTeam() {
  //   fetch("http://localhost:8000/api/teams/7?name=" + this.state.searchTeam)
  //     .then((res) => res.text())
  //     .then((res) => this.setState({ teams: JSON.parse(res) }));
  // }
  // Input(e) {
  //   this.setState({ searchTeam: e });
  //   this.searchTeam();
  // }
  componentDidUpdate() {
    var search0 = document.getElementById("search0");
    if (search0 && flag == 0) {
      flag = 1;
      if (flagNav == 0) flag = 0;
      // search0.removeEventListener("input", this.Input);
      search0.addEventListener("input", () => this.Input(search0.value));
      search0.addEventListener("input", () => this.Input(search0.value));
    }
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
  onSubmit(e) {
    e.preventDefault();
    const data = this.state;
    let formData = new FormData();
    console.log(this.state.name);
    console.log(this.state.image);

    formData.append("image", this.state.image);
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("phoneNb", this.state.phoneNb);
    formData.append("adress", this.state.adress);
    formData.append("extraInfo", this.state.extraInfo);
    formData.append("city_id", this.state.city_id);
    formData.append("password", this.state.password);
    console.log(this.state.image);
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.phoneNb);
    console.log(this.state.adress);
    console.log(this.state.extraInfo);
    console.log(this.state.city_id);
    console.log(this.state.password);
    formData.append("password", this.state.password);
    if (id == 0)
      fetch("http://localhost:8000/api/admin/user", {
        method: "post",
        body: formData,
        headers: {
          // Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          this.componentDidMount();
          this.state.image = "";
          this.state.name = "";
          this.state.email = "";
          this.state.phoneNb = "";
          this.state.adress = "";
          this.state.extraInfo = "";
          this.state.city_id = 1;
          this.state.password = "";
        });
    else {
      formData.append("_method", "PUT");
      fetch("http://localhost:8000/api/admin/user/" + id, {
        method: "post",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          this.componentDidMount();
        });
      id = 0;
    }
    this.handleModal();
  }
  handleInputChange = (e) => {
    // console.log("a");
    // let file;
    // if (e.target.files) file = e.target.files[0];
    // console.log(file);
    this.setState({
      [e.target.name]: e.target.value,
    });
    // this.setState({
    //   image: file,
    // });
  };
  handleInputFileChange = (e) => {
    console.log("a");
    let file;
    if (e.target.files) file = e.target.files[0];
    // console.log(file);
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    this.setState({
      image: file,
    });
  };
  deleteUser(e) {
    fetch("http://localhost:8000/api/admin/user/" + e, {
      method: "delete",
      headers: {
        // Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      // body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
    // alert(e);
  }
  editUser(e) {
    id = e;
    fetch("http://localhost:8000/api/admin/user/" + e, {
      headers: {
        // Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ userEdited: JSON.parse(res) });
        console.log(this.state.userEdited.data.email);
        this.setState({ name: this.state.userEdited.data.name });
        this.setState({ email: this.state.userEdited.data.email });
        this.setState({ password: "" });
      });
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      // document
      //   .getElementById("search0")
      //   .removeEventListener("input", this.Input);
      // this.setState({ teams: "" });
    } else {
      flagNav = 1;
    }
    this.setState({ show: !this.state.show });
  }
  render() {
    let City = [];

    if (this.state.AllCity != undefined) {
      for (let i = 0; i < this.state.AllCity.length; i++) {
        City.push(
          this.state.cityName == this.state.AllCity[i].name ? (
            <option value={this.state.AllCity[i].id} selected>
              {this.state.AllCity[i].name}
            </option>
          ) : (
            <option value={this.state.AllCity[i].id}>
              {this.state.AllCity[i].name}
            </option>
          )
        );
      }
      console.log(City);
    }

    console.log(this.state.users);
    let count = "";
    if (this.state.users.data != undefined) {
      count = this.state.users.data.total;
      var last_page = this.state.users.data.prev_page_url;
      var next_page = this.state.users.data.next_page_url;
      var nbPages = this.state.users.data.last_page;
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

    if (this.state.users.data != undefined) {
      console.log(this.state.users.data.data.length);

      for (let i = 0; i < this.state.users.data.data.length; i++) {
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col2">
              <img
                src={
                  "http://localhost:8000/storage/" +
                  this.state.users.data.data[i].image
                }
                height="50px"
                width="50px"
                style={{ borderRadius: "50%" }}
              />
              {this.state.users.data.data[i].name}
            </div>
            <div className="col0 col2">
              {this.state.users.data.data[i].email}
            </div>
            <div className="col0 col2">
              <div className="action">
                {/* <div title="Edit">
                  <FontAwesomeIcon
                    color={" #e55d87"}
                    onClick={() => {
                      this.editUser(this.state.users.data.data[i].id);
                    }}
                    className="pen"
                    title="Edit"
                    icon={faPen}
                  />
                </div> */}
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      this.deleteUser(this.state.users.data.data[i].id);
                    }}
                    className="trash"
                    icon={faTrash}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    let form = [];
    if (this.state.userEdited == "")
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header className="modal-header">
            <h4>New User</h4>
          </Modal.Header>
          <Modal.Body>
            <label className="label">
              <input
                type="text"
                id="name"
                name="name"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Name </span>
            </label>
            <label className="label">
              <input
                type="email"
                id="email"
                name="email"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Email Address </span>
            </label>
            <label className="label">
              <input
                type="text"
                id="phoneNb"
                name="phoneNb"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Phone Number </span>
            </label>
            <label className="label">
              <input
                type="text"
                id="adress"
                name="adress"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Address </span>
            </label>
            <label className="label">
              <input
                type="text"
                id="extraInfo"
                name="extraInfo"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Extra Info </span>
            </label>
            {/* <label className="label">
              <input
                type="text"
                id="city_id"
                name="city_id"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> City Id </span>
            </label> */}
            <Form.Control
              as="select"
              custom
              id="city_id"
              name="city_id"
              onChange={this.handleInputChange}
              style={{ maxWidth: "50%" }}
            >
              {City}
            </Form.Control>

            <label className="label">
              <input
                type="password"
                id="password"
                name="password"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Password </span>
            </label>

            <div className="input-file-div">
              <label className="image-file">Image</label>
              <label class="file-label">
                <input
                  name="image"
                  id="image"
                  aria-invalid="false"
                  type="file"
                  className="file-input"
                  onChange={this.handleInputFileChange}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <svg
                      className="svg-inline--fa fa-upload fa-w-16"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="upload"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                      ></path>
                    </svg>
                  </span>
                  <span className="file-label pointer">
                    Select your image here
                  </span>
                </span>
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer className="footer">
            <button className="add add-background">Add</button>
            <div
              className="add add-background"
              onClick={() => {
                this.handleModal();
              }}
            >
              Cancel
            </div>
          </Modal.Footer>
        </form>
      );
    else
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header className="modal-header">
            <h4>Edit User</h4>
          </Modal.Header>
          <Modal.Body>
            <label className="label">
              <input
                type="text"
                id="name"
                name="name"
                aria-invalid="false"
                className="text"
                placeholder=" "
                defaultValue={this.state.userEdited.data.name}
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Name </span>
            </label>
            <label className="label">
              <input
                type="email"
                id="email"
                name="email"
                aria-invalid="false"
                className="text"
                placeholder=" "
                defaultValue={this.state.userEdited.data.email}
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Email Address </span>
            </label>
            <label className="label">
              <input
                type="password"
                id="password"
                name="password"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Password </span>
            </label>

            <div className="input-file-div">
              <label className="image-file">Image</label>
              <label class="file-label">
                <input
                  name="image"
                  id="image"
                  aria-invalid="false"
                  type="file"
                  className="file-input"
                  onChange={this.handleInputFileChange}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <svg
                      className="svg-inline--fa fa-upload fa-w-16"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="upload"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                      ></path>
                    </svg>
                  </span>
                  <span className="file-label pointer">
                    Select your image here
                  </span>
                </span>
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer className="footer">
            <button className="add add-background">Update</button>
            <div
              className="add add-background"
              onClick={() => {
                this.handleModal();
              }}
            >
              Cancel
            </div>
          </Modal.Footer>
        </form>
      );

    return (
      <div className="App">
        <div
          className="new add-background"
          onClick={() => {
            this.handleModal();
          }}
        >
          New User
        </div>
        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
        >
          {form}
        </Modal>
        <div className="table">
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
              <div className="col0 col2">Name</div>
              <div className="col0 col2">Email</div>
              <div className="col0 col2 hide">Office</div>
              <div className="actionTitle col0 col2">Action</div>
            </div>
          </div>
          <div className="row1">
            <div className="col0 col2 search">
              <input
                id="search1"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col2 search">
              <input
                id="search2"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col2 search hide">
              <input
                aria-invalid="false"
                placeholder="Search 42 records..."
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
          </div>

          {array}
        </div>
      </div>
    );
  }
}
export default ManageUsers;

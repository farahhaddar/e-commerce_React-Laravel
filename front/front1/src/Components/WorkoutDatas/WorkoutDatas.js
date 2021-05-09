import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  // #e55d87
  faPen,
  faEdit,
  faProjectDiagram,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
let page = 0,
  rows = 0;
let flag = 0,
  flagNav = 0;
let id = 0;
const token = localStorage.getItem("token");
class WorkoutDatas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      show: false,
      products: "",
      search1: "",
      search2: "",
      search3: "",
      search4: "",
      rows: 5,
      searchTeam: "",
      teams: "",
      title: "",
      price: "",
      description: "",
      image: "",
      video: "",
      workout_id: "",
      productEdited: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.test = this.test.bind(this);
  }
  search() {
    fetch(
      "http://localhost:8000/api/workoutDatas/" +
        this.state.rows +
        "?page=1&title=" +
        this.state.search1,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ products: JSON.parse(res).data }));
  }
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(l + "&title=" + this.state.search1, {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ products: JSON.parse(res).data }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(n + "&title=" + this.state.search1, {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ products: JSON.parse(res).data }));
  }
  handleModal() {
    this.setState({ productEdited: "" });
    this.setState({ image: "" });
    this.setState({ video: "" });
    id = 0;
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      document
        .getElementById("search0")
        .removeEventListener("input", this.Input);
      this.setState({ teams: "" });
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
      "http://localhost:8000/api/workoutDatas/" +
        this.state.rows +
        "?page=" +
        value.k +
        "&title=" +
        this.state.search1,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ products: JSON.parse(res).data }));
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
      "http://localhost:8000/api/workoutDatas/" +
        value +
        "?page=1&title=" +
        this.state.search1,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ products: JSON.parse(res).data }));
    this.setState({ rows: value });
  };
  componentDidMount() {
    this.props.title("Workout Data");
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
      "http://localhost:8000/api/workoutDatas/" +
        this.state.rows +
        "?page=1&title=" +
        this.state.search1,

      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ products: JSON.parse(res).data }));
    var search1 = document.getElementById("search1");
    search1.addEventListener("input", (event) => {
      this.setState({ search1: search1.value });
      this.search();
    });
  }
  select(e, q) {
    document.getElementById("search0").setAttribute("data", e);
    document.getElementById("search0").value = q;
    this.setState({ teams: "" });
  }
  searchTeam() {
    fetch(
      "http://localhost:8000/api/workouts/7?title=" + this.state.searchTeam,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res).data }));
  }
  Input(e) {
    this.setState({ searchTeam: e });
    this.searchTeam();
  }
  componentDidUpdate() {
    var search0 = document.getElementById("search0");
    if (search0 && flag == 0) {
      flag = 1;
      if (flagNav == 0) flag = 0;
      search0.removeEventListener("input", this.Input);
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
    console.log(e);
    e.preventDefault();
    console.log(this.state.image);
    const data = this.state;
    let formData = new FormData();
    console.log(this.state.title);
    console.log(this.state.image);

    console.log(this.state.video, this.state.image);
    if (this.state.image != "" && this.state.image)
      formData.append("image", this.state.image);
    if (this.state.video != "" && this.state.video)
      formData.append("video", this.state.video);

    formData.append("title", this.state.title);

    formData.append(
      "workout_id",
      document.getElementById("search0").getAttribute("data")
    );
    console.log(this.state.title);

    formData.append(
      "workout_id",
      document.getElementById("search0").getAttribute("data")
    );
    console.log(this.state.image);
    if (id == 0)
      fetch("http://localhost:8000/api/admin/workoutDatas", {
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
    else {
      formData.append("_method", "PUT");
      fetch("http://localhost:8000/api/admin/workoutDatas/" + id, {
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
    // this.setState({ show: false });
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
    console.log(this.state.title);
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
  handleInputFileChangeVideo = (e) => {
    console.log("a");
    let file;
    if (e.target.files) file = e.target.files[0];
    // console.log(file);
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    this.setState({
      video: file,
    });
  };
  deleteProduct(e) {
    // alert(e);
    // let formData = new FormData();
    fetch("http://localhost:8000/api/admin/workoutDatas/" + e, {
      method: "delete",
      // body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((res) => {
        this.componentDidMount();
      });
  }
  editProduct(e) {
    id = e;
    fetch("http://localhost:8000/api/workoutData/" + e, {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        // console.log(JSON.parse(res).data.workout_id);
        this.setState({ productEdited: JSON.parse(res).data });
        this.setState({ title: this.state.productEdited.title });
        this.setState({ video: this.state.productEdited.video });
        this.setState({ image: this.state.productEdited.image });
        this.setState({ workout_id: this.state.productEdited.workout_id });
      });
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      document
        .getElementById("search0")
        .removeEventListener("input", this.Input);
      this.setState({ teams: "" });
    } else {
      flagNav = 1;
    }
    this.setState({ show: !this.state.show });
  }
  render() {
    console.log(this.state.productEdited);

    var form = [];

    if (this.state.products.data != undefined) {
      var last_page = this.state.products.prev_page_url;
      var next_page = this.state.products.next_page_url;
      var nbPages = this.state.products.last_page;
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
    let count = "";
    if (this.state.products.data != undefined) {
      count = this.state.products.total;
      for (let i = 0; i < this.state.products.data.length; i++) {
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col4">{this.state.products.data[i].title}</div>
            <div className="col0 col4">
              <img
                src={
                  "http://localhost:8000/storage/" +
                  this.state.products.data[i].image
                }
                height="50px"
                width="50px"
                alt="avatar"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="col0 col4">
              {" "}
              <video controls style={{ maxWidth: "25%" }}>
                {this.state.products.data[i].video ? (
                  <source
                    src={`http://localhost:8000/storage/${this.state.products.data[i].video}`}
                    alt="avatar"
                  />
                ) : (
                  ""
                )}
              </video>
            </div>
            <div className="col0 col4">
              {this.state.products.data[i].workout.title}
            </div>

            <div className="col0 col4">
              <div className="action">
                <div title="Edit">
                  <FontAwesomeIcon
                    color={"#e55d87"}
                    onClick={() => {
                      this.editProduct(this.state.products.data[i].id);
                    }}
                    className="pen"
                    icon={faPen}
                  />
                </div>
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      this.deleteProduct(this.state.products.data[i].id);
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
    let teams = [];
    if (this.state.teams != "") {
      for (let i = 0; i < this.state.teams.data.length; i++) {
        teams.push(
          <div
            onClick={() => {
              this.select(
                this.state.teams.data[i].id,
                this.state.teams.data[i].title
              );
            }}
            className="chooseTeam"
          >
            {this.state.teams.data[i].title}
          </div>
        );
      }
    }
    if (this.state.productEdited == "")
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header className="modal-header">
            <h4>New Workout Data</h4>
          </Modal.Header>
          <Modal.Body>
            <label className="label">
              <input
                type="text"
                id="name"
                name="title"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Title </span>
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
            <div className="input-file-div">
              <label className="image-file">Video</label>
              <label class="file-label">
                <input
                  name="video"
                  id="image"
                  aria-invalid="false"
                  type="file"
                  className="file-input"
                  onChange={this.handleInputFileChangeVideo}
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
                    Select your Video here
                  </span>
                </span>
              </label>
            </div>
            <div>
              {console.log(this.state.productEdited)}
              <input
                name="workout_id"
                id="search0"
                className="text"
                placeholder="choose the category"
                autoComplete="off"
                aria-invalid="false"
                type="text"
                onChange={this.handleInputChange}
              />
            </div>
            <div id="chooseTeamList" className="chooseTeamList">
              {teams}
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
    else {
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header className="modal-header">
            <h4>Edit Data</h4>
          </Modal.Header>
          <Modal.Body>
            <label className="label">
              <input
                type="text"
                id="name"
                name="title"
                aria-invalid="false"
                className="text"
                placeholder=" "
                defaultValue={this.state.productEdited.title}
                onChange={this.handleInputChange}
              />
              {console.log(this.state.productEdited)}
              <span className="input-type"> Title </span>
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

            <div className="input-file-div">
              <label className="image-file">Video</label>
              <label class="file-label">
                <input
                  name="video"
                  id="image"
                  aria-invalid="false"
                  type="file"
                  className="file-input"
                  onChange={this.handleInputFileChangeVideo}
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
                    Select your Video here
                  </span>
                </span>
              </label>
            </div>

            {/* <video controls style={{ maxWidth: "25%" }}>
                <source
                  src={`http://localhost:8000/storage/${this.state.products.data[i].video}`}
                />
              </video> */}
            <div>
              <input
                name="workout_id"
                id="search0"
                className="text"
                placeholder="choose the category(optional)"
                autoComplete="off"
                aria-invalid="false"
                type="text"
                data={this.state.productEdited.workout_id}
                onChange={this.handleInputChange.workout_id}
              >
                {/* {this.state.productEdited.workout.title} */}
              </input>
            </div>
            <div id="chooseTeamList" className="chooseTeamList">
              {teams}
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
    }
    return (
      <div className="App">
        <div
          className="new add-background"
          onClick={() => {
            this.handleModal();
          }}
        >
          New Data
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
              <div className="col0 col4">Title</div>
              <div className="col0 col4">Image</div>
              <div className="col0 col4">Video</div>
              <div className="col0 col4">Workout</div>
              <div className="col0 col4 hide">Office</div>
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
          </div>

          {array}
        </div>
      </div>
    );
  }
}
export default WorkoutDatas;

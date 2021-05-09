import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faTasks,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import "../AddNew/AddNew";
import "./ArticleCategories.css";
import "../Table/Table.css";
import ManageProject from "../ManageProjects/ManageProject";
import AddNew from "../AddNew/AddNew";
import Axios from "axios";

// import EditName from "../EditName/EditName";

let page = 0,
  rows = 0;
let edit,
  manage = 0;
const token = localStorage.getItem("token");
class ArticleCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      showAdd: false,
      showManage: false,
      showEdit: false,
      newName: "",
      editName: "",
      search1: "",
      ArticleCategories: "",
      articlesCategoryEdited: "",
      rows: 5,
      image: "",
      imageEdit: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
  }
  deleteArticleCategory(e) {
    fetch("http://localhost:8000/api/admin/articlesCategories/" + e, {
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
  search() {
    fetch(
      "http://localhost:8000/api/articlesCategories" +
        "?page=1&name=" +
        this.state.search1,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) =>
        this.setState({ ArticleCategories: JSON.parse(res).data })
      );
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(n + "&name=" + this.state.search1, {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) =>
        this.setState({ ArticleCategories: JSON.parse(res).data })
      );
  }
  last() {
    let n = document.getElementById("last").getAttribute("data");
    fetch(n + "&name=" + this.state.search1, {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) =>
        this.setState({ ArticleCategories: JSON.parse(res).data })
      );
  }
  handleAddModal() {
    this.setState({ articlesCategoryEdited: "" });
    this.setState({ image: "" });

    this.setState({ showAdd: !this.state.showAdd });
  }
  handleManageModal(e) {
    manage = e;
    this.setState({ showManage: !this.state.showManage });
  }
  handleEditModal(e) {
    if (e != undefined) {
      edit = e;
      fetch("http://localhost:8000/api/articlesCategories/" + e, {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.text())
        .then((res) =>
          this.setState({
            articlesCategoryEdited: JSON.parse(res).data,
            editName: JSON.parse(res).data.name,
          })
        );
      // this.setState({ editName: this.state.articlesCategoryEdited.name });
    } else this.setState({ articlesCategoryEdited: "" });
    this.setState({ showEdit: !this.state.showEdit });
  }
  handleChange = (e) => {
    this.setState({ newName: e.target.value });
  };
  handleEditChange = (e) => {
    this.setState({ editName: e.target.value });
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
      let formData = new FormData();
      formData.append("image", this.state.imageEdit);
      formData.append("name", this.state.editName);

      formData.append("_method", "PUT");
      fetch("http://localhost:8000/api/admin/articlesCategories/" + edit, {
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
          if (res.status === 200) {
            this.componentDidMount();
            this.setState({ showEdit: !this.state.showEdit });
            this.setState({ articlesCategoryEdited: "" });
          }
        });
    } catch (err) {
      console.log(err);
    }
    this.clear();
  };
  handleInputFileChange = (e) => {
    console.log("a");
    let file;

    if (e.target.files) file = e.target.files[0];
    // console.log(file);
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    console.log(file);
    this.setState({
      imageEdit: file,
    });
    console.log(this.state.imageEdit);
  };
  handleInputFileAdd = (e) => {
    console.log("a");
    let file;

    if (e.target.files) file = e.target.files[0];
    // console.log(file);
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    console.log(file);
    this.setState({
      image: file,
    });
    console.log(this.state.image);
  };

  handleAddNew = async (e) => {
    e.preventDefault();
    console.log(this.state.newName);
    try {
      let formData = new FormData();
      formData.append("image", this.state.image);
      formData.append("name", this.state.newName);

      fetch("http://localhost:8000/api/admin/articlesCategories", {
        method: "post",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
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
      "http://localhost:8000/api/articlesCategories" +
        "?page=" +
        value.k +
        "&name=" +
        this.state.search1,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) =>
        this.setState({ ArticleCategories: JSON.parse(res).data })
      );
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
    // console.log(value);
    // let a = document.getElementsByClassName("rowsOptions");
    // a[0].style.display = "none";
    // rows = 0;
    // let rowsOptions = document.getElementsByClassName("rows");
    // rowsOptions[0].innerHTML = value + " rows";
    // let addClass = document.getElementsByClassName("rows");
    // addClass[0].classList.add("rowsborder");
    // fetch(
    //   "http://localhost:8000/api/articlesCategories/" +
    //     value +
    //     "?page=1&name=" +
    //     this.state.search1,
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // )
    //   .then((res) => res.text())
    //   .then((res) =>
    //     this.setState({ ArticleCategories: JSON.parse(res).data })
    //   );
    // this.setState({ rows: value });
    // this.setState({ rows: value });
  };
  componentDidMount() {
    this.props.title("Article Categories");
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");

    fetch(
      "http://localhost:8000/api/articlesCategories" +
        "?page=1&name=" +
        this.state.search1,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) =>
        this.setState({ ArticleCategories: JSON.parse(res).data })
      );
    var search1 = document.getElementById("search1");
    search1.addEventListener("input", (event) => {
      this.setState({ search1: search1.value });
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
    console.log(this.state.editName);

    console.log(this.state.ArticleCategories.data);
    let count = "";
    if (this.state.ArticleCategories.data != undefined) {
      count = this.state.ArticleCategories.total;
      var last_page = this.state.ArticleCategories.prev_page_url;
      var next_page = this.state.ArticleCategories.next_page_url;
      var nbPages = this.state.ArticleCategories.last_page;
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
    if (this.state.ArticleCategories.data != undefined) {
      for (let i = 0; i < this.state.ArticleCategories.data.length; i++) {
        let c = i % 2;
        {
          /* ttt */
        }
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col2">
              <img
                src={
                  "http://localhost:8000/storage/" +
                  this.state.ArticleCategories.data[i].image
                }
                height="50px"
                width="50px"
                style={{ borderRadius: "50%" }}
              />
              {this.state.ArticleCategories.data[i].name}
            </div>
            <div className="col0 col1">
              {this.state.ArticleCategories.data[i].date}
            </div>
            <div className="col0 col1">
              <div className="action">
                <div
                  itle="Edit"
                  onClick={() => {
                    this.handleEditModal(
                      this.state.ArticleCategories.data[i].id
                    );
                  }}
                >
                  <FontAwesomeIcon
                    className="pen"
                    color={"#e55d87"}
                    icon={faPen}
                  />
                </div>
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        this.deleteArticleCategory(
                          this.state.ArticleCategories.data[i].id
                        );
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
    console.log(this.state.articlesCategoryEdited);
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
        <div
          className="new add-background"
          onClick={() => {
            this.handleAddModal();
          }}
        >
          New Category
        </div>

        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showAdd}
        >
          <Modal.Header centered>
            <h4> New Category</h4>
          </Modal.Header>
          <Modal.Body>
            <AddNew
              name="ArticleCategories"
              new={this.handleChange}
              text={this.state.newName}
            />
            <div className="input-file-div">
              <label className="image-file">Image</label>
              <label class="file-label">
                <input
                  name="image"
                  id="image"
                  aria-invalid="false"
                  type="file"
                  className="file-input"
                  onChange={this.handleInputFileAdd}
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
            <h4> Update Category Name</h4>
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
                id="name"
                name="name"
                className="text"
                placeholder=" "
                defaultValue={this.state.articlesCategoryEdited.name}
                onChange={this.handleEditChange}
              />
              <span className="input-type">Category Name </span>
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
            <button onClick={this.handleEdit} className="add add-background">
              Update
            </button>
            <button
              className="add add-background"
              onClick={() => {
                this.handleEditModal();
              }}
            >
              Cancel
            </button>
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
              <div className="col0 col1">Category Name</div>
              <div className="col0 col1 hide">Date</div>
              <div className="actionTitle col0 col1">Action</div>
            </div>
          </div>
          <div className="row1">
            <div className="col0 col1 search">
              <input
                id="search1"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col1 search hide">
              <input
                id="search2"
                aria-invalid="false"
                // placeholder={"Search " + count + " records..."}
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
export default ArticleCategories;

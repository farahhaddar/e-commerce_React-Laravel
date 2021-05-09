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
import { Modal, Form } from "react-bootstrap";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import ReactHtmlParser from "react-html-parser";

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
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      show: false,
      articles: "",
      search1: "",
      search2: "",
      search3: "",
      rows: 5,
      searchTeam: "",
      teams: "",
      name: "",
      content: "",
      article_category_id: "",
      teamId: "",
      articleEdited: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.test = this.test.bind(this);
  }

  search() {
    fetch(
      "http://localhost:8000/api/articles" +
        "?page=1&title=" +
        this.state.search1 +
        "&content=" +
        this.state.search2,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        this.setState({ articles: JSON.parse(res).data });
      });
  }
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(
      l + "&name=" + this.state.search1 + "&content=" + this.state.search2,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ articles: JSON.parse(res).data }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(
      n + "&name=" + this.state.search1 + "&content=" + this.state.search2,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ articles: JSON.parse(res).data }));
  }
  handleModal() {
    this.setState({ articleEdited: "" });
    id = 0;
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      document
        .getElementById("search0")
        .removeEventListener("input", this.Input);
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
      "http://localhost:8000/api/articles" +
        "?page=" +
        value.k +
        "&title=" +
        this.state.search1 +
        "&content=" +
        this.state.search2,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ articles: JSON.parse(res).data }));
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
    // let a = document.getElementsByClassName("rowsOptions");
    // a[0].style.display = "none";
    // rows = 0;
    // let rowsOptions = document.getElementsByClassName("rows");
    // rowsOptions[0].innerHTML = value + " rows";
    // let addClass = document.getElementsByClassName("rows");
    // addClass[0].classList.add("rowsborder");
    // fetch(
    //   "http://localhost:8000/api/articles/" +
    //     value +
    //     "?page=1&name=" +
    //     this.state.search1 +
    //     "&content=" +
    //     this.state.search2,
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // )
    //   .then((res) => res.text())
    //   .then((res) => this.setState({ articles: JSON.parse(res) }));
    // this.setState({ rows: value });
  };
  componentDidMount() {
    this.props.title("articles");
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
      "http://localhost:8000/api/articles" +
        "?page=1&name=" +
        this.state.search1 +
        "&content=" +
        this.state.search2,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(JSON.parse(res).data);
        this.setState({ articles: JSON.parse(res).data });
      });
    this.searchTeam();
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
    var search3 = document.getElementById("search2");
    search3.addEventListener("input", (event) => {
      this.setState({ search3: search3.value });
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
      "http://localhost:8000/api/articlesCategories?name=" +
        this.state.searchTeam,
      {
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(JSON.parse(res));
        this.setState({ teams: JSON.parse(res).data });
      });
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
    const data = this.state;
    let formData = new FormData();
    console.log(this.state.name);

    formData.append("title", this.state.name);
    formData.append("content", this.state.content);
    formData.append(
      "article_category_id",
      document.getElementById("assign").value
    );
    formData.append("_method", "PUT");

    console.log(this.state.teamId);
    console.log(this.state.name);
    console.log(this.state.content);
    if (id == 0) console.log(1);
    else {
      formData.append("_method", "PUT");
      fetch("http://localhost:8000/api/articles/" + id, {
        method: "post",
        body: formData,
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
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
    console.log(e.target.value);
    // this.setState({
    //   image: file,
    // });
  };

  deletePackage(e) {
    // alert(e);
    // let formData = new FormData();
    fetch("http://localhost:8000/api/admin/articles/" + e, {
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
  editPackage(e) {
    id = e;
    fetch("http://localhost:8000/api/articles/" + e, {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ articleEdited: JSON.parse(res).data });
        this.setState({ name: this.state.articleEdited.title });
        this.setState({ content: this.state.articleEdited.content });

        this.setState({ teamId: this.state.articleEdited.article_category_id });
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
    console.log(this.state.articleEdited);

    var form = [];

    if (this.state.articles.data != undefined) {
      var last_page = this.state.articles.prev_page_url;
      var next_page = this.state.articles.next_page_url;
      var nbPages = this.state.articles.last_page;
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
    console.log(this.state.articles.data);
    if (this.state.articles.data != undefined) {
      count = this.state.articles.total;
      for (let i = 0; i < this.state.articles.data.length; i++) {
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col3">{this.state.articles.data[i].title}</div>
            <div className="col0 col3">
              {ReactHtmlParser(this.state.articles.data[i].content)}
              {/* {console.log(this.state.articles.data[i].content)}
              {this.state.articles.data[i].content} */}
            </div>
            <div className="col0 col3">
              {this.state.articles.data[i].article_category.name}
            </div>
            <div className="col0 col3">
              <div className="action">
                <div title="Edit">
                  <Link
                    to={{
                      pathname: `/admin/EditArticle/${this.state.articles.data[i].id}`,
                    }}
                  >
                    <FontAwesomeIcon
                      color={"#e55d87"}
                      onClick={() => {
                        // this.editPackage(this.state.articles.data[i].id);
                      }}
                      className="pen"
                      icon={faPen}
                    />
                  </Link>
                </div>
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        this.deletePackage(this.state.articles.data[i].id);
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
    // let teams = [];
    // if (this.state.teams != "") {
    //   for (let i = 0; i < this.state.teams.data.length; i++) {
    //     teams.push(
    //       <div
    //         onClick={() => {
    //           this.select(
    //             this.state.teams.data[i].id,
    //             this.state.teams.data[i].name
    //           );
    //         }}
    //         className="chooseTeam"
    //       >
    //         {this.state.teams.data[i].name}
    //       </div>
    //     );
    //   }
    // }
    let teams = [];
    if (this.state.teams.data)
      if (this.state.teams.data[0] != undefined) {
        for (let i = 0; i < this.state.teams.data.length; i++) {
          teams.push(
            <option value={this.state.teams.data[i].id}>
              {this.state.teams.data[i].name}
            </option>
          );
        }
      }
    if (this.state.articleEdited == "") console.log(1);
    else {
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header className="modal-header">
            <h4>Edit Package</h4>
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
                defaultValue={this.state.articleEdited.title}
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Name </span>
            </label>
            <label className="label">
              <input
                type="content"
                id="content"
                name="content"
                aria-invalid="false"
                className="text"
                placeholder=" "
                defaultValue={this.state.articleEdited.content}
                onChange={this.handleInputChange}
              />
              <span className="input-type"> content </span>
            </label>

            <div>
              <input
                name="teamId"
                id="search0"
                className="text"
                placeholder="choose the category"
                autoComplete="off"
                aria-invalid="false"
                type="text"
                data={this.state.articleEdited.teamId}
                onChange={this.handleInputChange}
              />
            </div>
            <Form.Control as="select" custom id="assign">
              {teams}
            </Form.Control>
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
          // onClick={() => {
          //   this.handleModal();
          // }}
        >
          <Link className="Link profilePic" to="/admin/AddArticle">
            {" "}
            New Article
          </Link>
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
              <div className="col0 col3">Title</div>
              <div className="col0 col3">Content</div>
              <div className="col0 col3 ">Article category name</div>
              <div className="col0 col3 hide">Article category name</div>
              <div className="actionTitle col0 col3">Action</div>
            </div>
          </div>
          <div className="row1">
            <div className="col0 col3 search">
              <input
                id="search1"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col3 search">
              <input
                id="search2"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col3 search">
              <input
                id="search3"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col3 search hide">
              <input
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
export default Articles;

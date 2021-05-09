import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faTasks,faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import "./Teams.css";
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
class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      teams: "",
      search1: "",
      rows: 5,
      searchTeam: "",
      teamEdited: "",
      name: "",
      show: false,
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  search() {
    fetch(
      "http://localhost:8000/api/employees/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
  }
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(l + "&name=" + this.state.search1, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(n + "&name=" + this.state.search1, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
  }
  handleModal() {
    this.setState({ teamEdited: "" });
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
    console.log(value);
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    page = 0;
    let pageOptions = document.getElementsByClassName("page");
    pageOptions[0].innerHTML = "Page " + value.k;
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    fetch(
      "http://localhost:8000/api/teams/" +
        this.state.rows +
        "?page=" +
        value.k +
        "&name=" +
        this.state.search1,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
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
      "http://localhost:8000/api/teams/" +
        value +
        "?page=1&name=" +
        this.state.search1,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
    this.setState({ rows: value });
  };
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
  onSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    console.log(this.state.name);

    formData.append("name", this.state.name);
    if (id == 0)
      fetch("http://localhost:8000/api/team", {
        method: "post",
        body: formData,
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.componentDidMount();
        });
    else {
      formData.append("_method", "PUT");
      fetch("http://localhost:8000/api/team/" + id, {
        method: "post",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.componentDidMount();
        });
      id = 0;
    }
    this.handleModal();
  }
  deleteTeam(e) {
    // alert(e);
    fetch("http://localhost:8000/api/team/" + e, {
      method: "delete",
      // body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
  }
  editTeam(e) {
    // alert(e);
    id = e;
    fetch("http://localhost:8000/api/team/" + e, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ teamEdited: JSON.parse(res) });
        this.setState({ name: this.state.teamEdited.name });
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
  componentDidMount() {
    this.props.title("Teams");
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");

    fetch(
      "http://localhost:8000/api/teams/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
    var search1 = document.getElementById("search1");
    search1.addEventListener("input", (event) => {
      this.setState({ search1: search1.value });
      this.search();
    });
  }
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
  f(e) {
    e.preventDefault();
    alert("e");
  }
  render() {
    console.log(this.state.teams);
    let count = "";
    if (this.state.teams.data != undefined) {
      count = this.state.teams.total;
      var last_page = this.state.teams.prev_page_url;
      var next_page = this.state.teams.next_page_url;
      var nbPages = this.state.teams.last_page;
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
    if (this.state.teams.data != undefined) {
      for (let i = 0; i < this.state.teams.data.length; i++) {
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col1">{this.state.teams.data[i].name}</div>
            <div className="col0 col1">
              <div className="action">
              <div title="Manage Team Members">
                  <Link
                    className="link-to"
                    to={{
                      pathname: "/manage_team_members",
                      state: {
                        fromNotifications: this.state.teams.data[i].id,
                      },
                    }}
                  >
                    <FontAwesomeIcon className="task" color={"black"} icon={faEdit} />
                  </Link>
                </div>
                
                <div
                  title="Edit"
                  className="pointer"
                  onClick={() => {
                    this.editTeam(this.state.teams.data[i].id);
                  }}
                >
                  <FontAwesomeIcon className="pen" color={"#e55d87"} icon={faPen} />
                </div>
               
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      this.deleteTeam(this.state.teams.data[i].id);
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
    var form = [];
    if (this.state.teamEdited == "")
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header>
            <h4>New Team</h4>
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
          <Modal.Header>
            <h4>New Team</h4>
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
                defaultValue={this.state.teamEdited.name}
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Name </span>
            </label>
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
          New Team
        </div>
        <Modal
          size=""
          centered
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
        >
          {form}
        </Modal>
        {/* <input
          aria-invalid="false"
          placeholder="Search 42 records..."
          type="text"
          class="MuiInputBase-input MuiInput-input jss168"
          value=""
        /> */}
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
              <div className="pageOptions" style={{ height: sizePage + "px" }}>
                {/* the size of this above is 3*number of pages + 10 */}
                {pageList}
              </div>
            </div>

            {/* input here */}
            <div class="container">
              <div onClick={this.rowsOptions} className="rows">
                5 rows
              </div>
              {/* the size of this below is 3*number of pages + 10 */}
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
            {/* <div>asdsad</div> */}
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
              <div className="col0 col1">Team Name</div>
              <div className="col0 col1 hide">Office</div>
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
export default Teams;

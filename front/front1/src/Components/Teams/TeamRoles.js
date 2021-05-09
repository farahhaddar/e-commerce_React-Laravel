import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import "./TeamRoles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
let page = 0,
  rows = 5;
let flag = 0,
  flagNav = 0;
let projectId = 0,
  teamId = 0;
const token = localStorage.getItem("token");
class TeamRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      show: false,
      rows: 5,
      search1: "",
      teamRoles: "",
      roles: "",
      employees: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.Submit = this.Submit.bind(this);
  }
  handleModal() {
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
      "http://localhost:8000/api/employeesProjectsRoles/" +
        this.state.rows +
        "?page=" +
        value.k +
        "&name=" +
        this.state.search1 +
        "&teamId=" +
        teamId +
        "&projectId=" +
        projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teamRoles: JSON.parse(res) }));
  };
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(
      l +
        "&name=" +
        this.state.search1 +
        "&teamId=" +
        teamId +
        "&projectId=" +
        projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teamRoles: JSON.parse(res) }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(
      n +
        "&name=" +
        this.state.search1 +
        "&teamId=" +
        teamId +
        "&projectId=" +
        projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teamRoles: JSON.parse(res) }));
  }

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
      "http://localhost:8000/api/employeesProjectsRoles/" +
        value +
        "?page=1&name=" +
        this.state.search1 +
        "&teamId=" +
        teamId +
        "&projectId=" +
        projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teamRoles: JSON.parse(res) }));
  };
  search() {
    fetch(
      "http://localhost:8000/api/employeesProjectsRoles/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1 +
        "&teamId=" +
        teamId +
        "&projectId=" +
        projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teamRoles: JSON.parse(res) }));
  }
  deleteEmployeeRole(e) {
    fetch(
      "http://localhost:8000/api/employeeProjectRole/" + projectId + "/" + e,
      {
        method: "delete",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        this.componentDidMount();
      });
    // employeeProjectRole
    //delete this record from employee_project_roles
  }
  dropdown(e) {
    // alert(e);
    // alert("hi");
    let a = document.getElementsByClassName("myDropdown");
    // alert(a[0].getAttribute("data"));
    let i;
    for (i = 0; i < a.length; i++) {
      if (a[i].getAttribute("data") == e) break;
    }
    a[i].classList.toggle("show");
  }
  choice(e, d, name) {
    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("employeeId", e);
    formData.append("projectId", projectId);
    formData.append("roleId", d);

    fetch("http://localhost:8000/api/updateRole/", {
      method: "post",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {});
    document.getElementsByClassName("dropDown" + e)[0].innerHTML = name;
  }
  componentDidMount() {
    let z = 1;
    const {
      fromNotificationsProject,
      fromNotificationsTeam,
    } = this.props.location.state;
    projectId = fromNotificationsProject;
    teamId = fromNotificationsTeam;
    fetch(
      "http://localhost:8000/api/employeesProjectsRoles/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1 +
        "&teamId=" +
        teamId +
        "&projectId=" +
        projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teamRoles: JSON.parse(res) }));
    fetch("http://localhost:8000/api/roles/1000", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ roles: JSON.parse(res) }));
    // alert(fromNotificationsProject);
    // alert(fromNotificationsTeam);
    // teamId = fromNotifications;
    fetch("http://localhost:8000/api/employeeProjectRoleNotAssigned", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ employees: JSON.parse(res) }));
    this.props.title("Team Roles");
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");
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
  Submit(e) {
    e.preventDefault();
    var emp = document.getElementById("employee").value;
    var rol = document.getElementById("role").value;

    // projectId
    // employeeProjectRole
    let formData = new FormData();
    formData.append("employeeId", emp);
    formData.append("projectId", projectId);
    formData.append("roleId", rol);

    fetch("http://localhost:8000/api/employeeProjectRole/", {
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
  }
  render() {
    let count = "";
    console.log(this.state.roles.data);
    let role = [];
    if (this.state.roles.data != undefined) {
      for (let i = 0; i < this.state.roles.data.length; i++) {
        role.push(
          <option value={this.state.roles.data[i].id}>
            {this.state.roles.data[i].name}
          </option>
        );
      }
    }
    let employee = [];
    if (this.state.employees != "") {
      for (let i = 0; i < this.state.employees.length; i++) {
        employee.push(
          <option value={this.state.employees[i].id}>
            {this.state.employees[i].name}
          </option>
        );
      }
    }
    if (this.state.teamRoles.data != undefined) {
      count = this.state.teamRoles.total;
      var last_page = this.state.teamRoles.prev_page_url;
      var next_page = this.state.teamRoles.next_page_url;
      var nbPages = this.state.teamRoles.last_page;
      var sizePage = 30 * nbPages + 10;
      var pageList = [];
      var pageList1 = [];
      for (let i = 0; i < nbPages; i++) {
        let k = i + 1;
        pageList1.push(<div onClick={this.page({ k })}>Page {k}</div>);
      }

      pageList.push(<div>{pageList1}</div>);
    }
    let roles = [];
    console.log(this.state.roles.data);

    // if (this.state.roles.data != undefined) {
    // }
    let z = 1;
    var array = [];
    if (
      this.state.teamRoles.data != undefined &&
      this.state.roles.data != undefined
    ) {
      for (let i = 0; i < this.state.teamRoles.data.length; i++) {
        var choose = [];
        for (let j = 0; j < this.state.roles.data.length; j++) {
          choose.push(
            <Dropdown.Item
              onClick={() =>
                this.choice(
                  this.state.teamRoles.data[i].employee_id,
                  this.state.roles.data[j].id,
                  this.state.roles.data[j].name
                )
              }
              // href="#/action-1"
            >
              {this.state.roles.data[j].name}
            </Dropdown.Item>
          );
        }
        console.log(this.state.teamRoles.data[0].id);
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col2">
              {this.state.teamRoles.data[i].employee_name}
            </div>
            <div className="col00 col2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  className={
                    "dropDown" + this.state.teamRoles.data[i].employee_id
                  }
                  id={"dropdown-basic"}
                >
                  {this.state.teamRoles.data[i].roles_name}
                </Dropdown.Toggle>

                <Dropdown.Menu>{choose}</Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col0 col2">
              <div className="action">
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      this.deleteEmployeeRole(
                        this.state.teamRoles.data[i].employee_id
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
    return (
      <div className="App">
        <div
          className="new add-background"
          onClick={() => {
            this.handleModal();
          }}
        >
          Assign Roles to Members
        </div>

        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
        >
          <Modal.Header>
            <h4>Assign Roles To Members</h4>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.Submit}>
              <Form.Label>Choose Employee</Form.Label>
              <Form.Control as="select" custom id="employee">
                {employee}
              </Form.Control>
              <Form.Label>Choose Role</Form.Label>
              <Form.Control as="select" custom id="role">
                {role}
              </Form.Control>

              <Modal.Footer className="footer">
                <button className="add add-background">Assign</button>
                <div
                  className="add add-background"
                  onClick={() => {
                    this.handleModal();
                  }}
                >
                  Cancel
                </div>
              </Modal.Footer>
            </Form>
          </Modal.Body>
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
                {/* the size of this above is 3*number of pages + 10 */}
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
              <div className="col0 col2">Team Member</div>
              <div className="col0 col2 hide">Office</div>
              {/* <div className="actionTitle col0 col2">Action</div> */}
            </div>
          </div>
          <div className="row1">
            <div className="col0 col2 search">
              <input
                aria-invalid="false"
                id="search1"
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
export default TeamRoles;

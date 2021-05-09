import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faChartLine,
  faLevelUpAlt,
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
let KpiId = 0,
  employeeId = 1;
const token = localStorage.getItem("token");
class Kpis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      rows: 5,
      show: false,
      search1: "",
      name: "",
      searchTeam: "",
      kpis: "",
      employees: "",
      employeeId: "",
      kpisEdited: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleModal() {
    KpiId = 0;
    this.setState({ kpisEdited: "" });
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      document
        .getElementById("search0")
        .removeEventListener("input", this.Input);
      this.setState({ employees: "" });
    } else {
      flagNav = 1;
    }
    this.setState({ show: !this.state.show });
  }
  search() {
    fetch(
      "http://localhost:8000/api/kpis/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1 +
        "&employeeId=" +
        employeeId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpis: JSON.parse(res) }));
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
      "http://localhost:8000/api/kpis/" +
        this.state.rows +
        "?page=" +
        value.k +
        "&name=" +
        this.state.search1 +
        "&employeeId=" +
        employeeId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpis: JSON.parse(res) }));
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
    fetch(
      "http://localhost:8000/api/kpis/" +
        value +
        "?page=1&name=" +
        this.state.search1 +
        "&employeeId=" +
        employeeId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpis: JSON.parse(res) }));
    this.setState({ rows: value });
  };
  select(e, q) {
    document.getElementById("search0").setAttribute("data", e);
    document.getElementById("search0").value = q;
    this.setState({ employees: "" });
  }
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(l + "&name=" + this.state.search1 + "&employeeId=" + employeeId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ kpis: JSON.parse(res) }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(n + "&name=" + this.state.search1 + "&employeeId=" + employeeId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ kpis: JSON.parse(res) }));
  }
  componentDidMount() {
    // if (this.props.location.state != undefined)
    // const { fromNotifications } = this.props.location.state;
    console.log(this.props.location.state);
    if (this.props.location.state != undefined) {
      const { fromNotifications } = this.props.location.state;
      employeeId = fromNotifications;
    } else employeeId = "";
    this.props.title("KPI");
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");

    fetch(
      "http://localhost:8000/api/kpis/" +
        this.state.rows +
        "?page=1&name=" +
        this.state.search1 +
        "&employeeId=" +
        employeeId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpis: JSON.parse(res) }));
    var search1 = document.getElementById("search1");
    search1.addEventListener("input", (event) => {
      this.setState({ search1: search1.value });
      this.search();
    });
  }
  searchTeam() {
    fetch(
      "http://localhost:8000/api/employees/7?name=" +
        this.state.searchTeam +
        "&employeeId=" +
        employeeId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ employees: JSON.parse(res) }));
  }
  Input(e) {
    this.setState({ searchTeam: e });
    this.searchTeam();
  }
  onSubmit(e) {
    e.preventDefault();
    const data = this.state;
    let formData = new FormData();

    formData.append("name", this.state.name);
    formData.append(
      "employeeId",
      document.getElementById("search0").getAttribute("data")
    );
    if (KpiId == 0)
      fetch("http://localhost:8000/api/kpi", {
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
    else {
      formData.append("_method", "PUT");
      fetch("http://localhost:8000/api/kpi/" + KpiId, {
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
      KpiId = 0;
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
  deleteKpi(e) {
    // alert(e);
    fetch("http://localhost:8000/api/kpi/" + e, {
      method: "delete",
      // body: formData,
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
  editKpi(e) {
    KpiId = e;
    fetch("http://localhost:8000/api/kpi/" + e, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ kpisEdited: JSON.parse(res) });
        this.setState({ name: this.state.kpisEdited.name });
        this.setState({ employeeId: this.state.kpisEdited.employeeId });
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
  render() {
    let count = "";
    if (this.state.kpis.data != undefined) {
      count = this.state.kpis.total;
      var last_page = this.state.kpis.prev_page_url;
      var next_page = this.state.kpis.next_page_url;
      var nbPages = this.state.kpis.last_page;
      var sizePage = 30 * nbPages + 10;
      var pageList = [];
      var pageList1 = [];
      for (let i = 0; i < nbPages; i++) {
        let k = i + 1;
        pageList1.push(<div onClick={this.page({ k })}>Page {k}</div>);
      }

      pageList.push(<div>{pageList1}</div>);
    }

    //
    var array = [];
    if (this.state.kpis.data != undefined) {
      for (let i = 0; i < this.state.kpis.data.length; i++) {
        console.log(this.state.kpis.data[0].id);
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col3">{this.state.kpis.data[i].name}</div>
            <div className="col0 col3">
              <div className="action">
                <div title="Show KPI Progress Over Time">
                  <Link
                    className="link-to"
                    to={{
                      pathname: "/graph",
                      state: {
                        fromNotifications: this.state.kpis.data[i].id,
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      color={"#e55d87"}
                      className="pen"
                      icon={faChartLine}
                    />
                  </Link>
                </div>
                <div title="Show KPI Level">
                  <Link
                    className="link-to"
                    to={{
                      pathname: "/Kpi_level",
                      state: {
                        fromNotifications: this.state.kpis.data[i].id,
                      },
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      color={"black"}
                      className="pen"
                      icon={faLevelUpAlt}
                    />
                  </Link>
                </div>
                <div
                  title="Edit"
                  className="pointer"
                  onClick={() => {
                    this.editKpi(this.state.kpis.data[i].id);
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
                      this.deleteKpi(this.state.kpis.data[i].id);
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
    let employees = [];
    if (this.state.employees != "") {
      for (let i = 0; i < this.state.employees.data.length; i++) {
        employees.push(
          <div
            onClick={() => {
              this.select(
                this.state.employees.data[i].id,
                this.state.employees.data[i].name
              );
            }}
            className="chooseTeam"
          >
            {this.state.employees.data[i].name}
          </div>
        );
      }
    }
    var form = [];
    if (this.state.kpisEdited == "")
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header>
            <h4>New KPI</h4>
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
            <div>
              <input
                name="employeeId"
                id="search0"
                className="text"
                placeholder="Choose Team"
                autoComplete="off"
                aria-invalid="false"
                type="text"
                onChange={this.handleInputChange}
              />
            </div>
            <div id="chooseTeamList" className="chooseTeamList">
              {employees}
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
          <Modal.Header>
            <h4>Edit KPI</h4>
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
                defaultValue={this.state.kpisEdited.name}
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Name </span>
            </label>
            <div>
              <input
                name="employeeId"
                id="search0"
                className="text"
                data={this.state.kpisEdited.employeeId}
                placeholder="Change team(optional)"
                autoComplete="off"
                aria-invalid="false"
                type="text"
                onChange={this.handleInputChange}
              />
            </div>
            <div id="chooseTeamList" className="chooseTeamList">
              {employees}
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
    }
    return (
      <div className="App">
        <div
          className="new add-background"
          onClick={() => {
            this.handleModal();
          }}
        >
          New KPI
        </div>
        <Modal
          size=""
          centered
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
              {/* the size of this below is 3*number of pages + 10 */}
              <div className="pageOptions" style={{ height: sizePage + "px" }}>
                {pageList}
              </div>
            </div>

            {/* input here */}
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
              <div className="col0 col1">KPI Name</div>
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
export default Kpis;

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
let page = 0,
  rows = 0;
let flag = 0,
  flagNav = 0;
let id = 0;
const token = localStorage.getItem("token");
class KpiReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      show: false,
      kpiCurrent: "",
      search1: "",
      search2: "",
      search3: "",
      rows: 5,
      searchTeam: "",
      teams: "",
      name: "",
      email: "",
      phoneNb: "",
      image: "",
      teamId: "",
      employeeEdited: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.test = this.test.bind(this);
  }
  search() {
    fetch(
      "http://localhost:8000/api/kpiCurrent/" +
        this.state.rows +
        "?page=1&empName=" +
        this.state.search1 +
        "&name=" +
        this.state.search2 +
        "&level=" +
        this.state.search3,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpiCurrent: JSON.parse(res) }));
  }
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(l + "&name=" + this.state.search2, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ kpiCurrent: JSON.parse(res) }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(n + "&name=" + this.state.search2, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ kpiCurrent: JSON.parse(res) }));
  }
  handleModal() {
    this.setState({ employeeEdited: "" });
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
      "http://localhost:8000/api/kpiCurrent/" +
        this.state.rows +
        "?page=1&empName=" +
        this.state.search1 +
        "&name=" +
        this.state.search2 +
        "&level=" +
        this.state.search3,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpiCurrent: JSON.parse(res) }));
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
      "http://localhost:8000/api/kpiCurrent/" +
        value +
        "?page=1&empName=" +
        this.state.search1 +
        "&name=" +
        this.state.search2 +
        "&level=" +
        this.state.search3,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpiCurrent: JSON.parse(res) }));
    this.setState({ rows: value });
  };
  componentDidMount() {
    this.props.title("kPI Current Value");
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
      "http://localhost:8000/api/kpiCurrent/" +
        this.state.rows +
        "?page=1&empName=" +
        this.state.search1 +
        "&name=" +
        this.state.search2 +
        "&level=" +
        this.state.search3,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpiCurrent: JSON.parse(res) }));
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
  select(e, q) {
    document.getElementById("search0").setAttribute("data", e);
    document.getElementById("search0").value = q;
    this.setState({ teams: "" });
  }
  searchTeam() {
    fetch("http://localhost:8000/api/teams/7?name=" + this.state.searchTeam, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
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
    e.preventDefault();
    const data = this.state;
    let formData = new FormData();
    console.log(this.state.name);
    console.log(this.state.image);

    formData.append("image", this.state.image);
    formData.append("name", this.state.name);
    formData.append("level", this.state.level);
    formData.append("phoneNb", this.state.phoneNb);
    formData.append(
      "teamId",
      document.getElementById("search0").getAttribute("data")
    );
    console.log(this.state.image);
    if (id == 0)
      fetch("http://localhost:8000/api/employee", {
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
      fetch("http://localhost:8000/api/employee/" + id, {
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
    this.setState({ show: false });
  }
  handleInputChange = (e) => {
    // console.log("a");
    // let file;
    // if (e.target.files) file = e.target.files[0];
    // console.log(file);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.name);
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
  editEmployee(e) {
    id = e;
    fetch("http://localhost:8000/api/employee/" + e, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ employeeEdited: JSON.parse(res) });
        this.setState({ name: this.state.employeeEdited.name });
        this.setState({ level: this.state.employeeEdited.level });
        this.setState({ phoneNb: this.state.employeeEdited.phoneNb });
        this.setState({ teamId: this.state.employeeEdited.teamId });
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
    console.log(this.state.employeeEdited);

    var form = [];

    if (this.state.kpiCurrent.data != undefined) {
      var last_page = this.state.kpiCurrent.prev_page_url;
      var next_page = this.state.kpiCurrent.next_page_url;
      var nbPages = this.state.kpiCurrent.last_page;
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
    if (this.state.kpiCurrent.data != undefined) {
      count = this.state.kpiCurrent.total;
      for (let i = 0; i < this.state.kpiCurrent.data.length; i++) {
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col2">
              {this.state.kpiCurrent.data[i].empName}
            </div>
            <div className="col0 col2">
              {this.state.kpiCurrent.data[i].name}
            </div>
            <div className="col0 col2">
              {this.state.kpiCurrent.data[i].level}
            </div>
            <div className="col0 col2">
              <div className="action"></div>
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
                this.state.teams.data[i].name
              );
            }}
            className="chooseTeam"
          >
            {this.state.teams.data[i].name}
          </div>
        );
      }
    }
    if (this.state.employeeEdited == "")
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <label>Name</label>
          <br />
          <input
            id="name"
            name="name"
            aria-invalid="false"
            type="text"
            onChange={this.handleInputChange}
          />
          <br />
          <label>Level</label>
          <br />
          <input
            name="level"
            id="level"
            aria-invalid="false"
            type="text"
            onChange={this.handleInputChange}
          />
          <br />
          <label>Phone</label>
          <br />
          <input
            name="phoneNb"
            id="phoneNb"
            aria-invalid="false"
            type="text"
            onChange={this.handleInputChange}
          />
          <br />
          <label>Image</label>
          <br />
          <input
            name="image"
            id="image"
            aria-invalid="false"
            type="file"
            onChange={this.handleInputFileChange}
          />
          <div>
            <input
              name="teamId"
              id="search0"
              placeholder="choose a team"
              aria-invalid="false"
              type="text"
              onChange={this.handleInputChange}
            />
          </div>
          <div id="chooseTeamList" className="chooseTeamList">
            {teams}
          </div>
          <Modal.Footer className="footer">
            <button className="add">Add</button>
            <div
              className="add closePopUp"
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
      console.log(this.state.employeeEdited);
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <label>Name</label>
          <br />
          <input
            id="name"
            name="name"
            defaultValue={this.state.employeeEdited.name}
            aria-invalid="false"
            type="text"
            onChange={this.handleInputChange}
          />
          <br />
          <label>Level</label>
          <br />
          <input
            name="level"
            id="level"
            defaultValue={this.state.employeeEdited.level}
            aria-invalid="false"
            type="text"
            onChange={this.handleInputChange}
          />
          <br />
          <label>Phone</label>
          <br />
          <input
            name="phoneNb"
            id="phoneNb"
            aria-invalid="false"
            type="text"
            defaultValue={this.state.employeeEdited.phoneNb}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Image</label>
          <br />
          <input
            name="image"
            id="image"
            aria-invalid="false"
            type="file"
            onChange={this.handleInputFileChange}
          />
          <div>
            {/* aaaa */}
            <input
              name="teamId"
              id="search0"
              data={this.state.employeeEdited.teamId}
              placeholder="Change team(optional)"
              aria-invalid="false"
              type="text"
              onChange={this.handleInputChange}
            />
          </div>
          <div id="chooseTeamList" className="chooseTeamList">
            {teams}
          </div>
          <Modal.Footer className="footer">
            <button className="add">Add</button>
            <div
              className="add closePopUp"
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
              <div className="col0 col2">Employee Name</div>
              <div className="col0 col2">Kpi Name</div>
              <div className="col0 col2">Level</div>
              <div className="col0 col2 hide">Office</div>
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
            <div className="col0 col2 search">
              <input
                id="search3"
                aria-invalid="false"
                placeholder={"Search " + count + " records..."}
                type="text"
                class="MuiInputBase-input MuiInput-input jss168"
              />
            </div>
            <div className="col0 col2 search hide">
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
export default KpiReport;

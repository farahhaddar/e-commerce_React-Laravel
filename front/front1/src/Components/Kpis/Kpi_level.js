import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
let page = 0,
  rows = 0;
let flag = 0,
  flagNav = 0;
let id, kpi_level_id;
const token = localStorage.getItem("token");
class Kpi_level extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      kpisd: "",
      show: false,
      search1: "",
      search2: "",
      date: "",
      name: "",
      kpis: "",
      level: "",
      rows: 5,
      kpiId: "",
      kpisdEdited: "",
    };
    this.pageOptions = this.pageOptions.bind(this);
    this.page = this.page.bind(this);
    this.rows = this.rows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  deleteLevel(e) {
    // alert(e);
    fetch("http://localhost:8000/api/kpid/" + e, {
      method: "delete",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      // body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
  }
  last() {
    let l = document.getElementById("last").getAttribute("data");
    fetch(
      l +
        "&date=" +
        this.state.search1 +
        "&level=" +
        this.state.search2 +
        "&kpiId=" +
        id,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpisd: JSON.parse(res) }));
  }
  next() {
    let n = document.getElementById("next").getAttribute("data");
    fetch(
      n +
        "&date=" +
        this.state.search1 +
        "&level=" +
        this.state.search2 +
        "&kpiId=" +
        id,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpisd: JSON.parse(res) }));
  }
  handleModal() {
    this.setState({ kpisdEdited: "" });
    kpi_level_id = 0;
    this.setState({});
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      // document
      //   .getElementById("search0")
      //   .removeEventListener("input", this.Input);
      this.setState({ teams: "" });
    } else {
      flagNav = 1;
    }
    this.setState({ show: !this.state.show });
  }
  search() {
    fetch(
      "http://localhost:8000/api/kpisd/" +
        this.state.rows +
        "?page=1&date=" +
        this.state.search1 +
        "&level=" +
        this.state.search2 +
        "&kpiId=" +
        id,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpisd: JSON.parse(res) }));
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
      "http://localhost:8000/api/kpisd/" +
        this.state.rows +
        "?page=" +
        value.k +
        "&date=" +
        this.state.search1 +
        "&level=" +
        this.state.search2 +
        "&kpiId=" +
        id,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpisd: JSON.parse(res) }));
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
      "http://localhost:8000/api/kpisd/" +
        value +
        "?page=1&date=" +
        this.state.search1 +
        "&level=" +
        this.state.search2 +
        "&kpiId=" +
        id,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpisd: JSON.parse(res) }));
    this.setState({ rows: value });
  };
  componentDidMount() {
    this.props.title("KPI Level");
    const { fromNotifications } = this.props.location.state;
    // this.props.location.state("hi");
    // alert(fromNotifications);
    id = fromNotifications;
    let a = document.getElementsByClassName("pageOptions");
    a[0].style.display = "none";
    let a1 = document.getElementsByClassName("rowsOptions");
    a1[0].style.display = "none";
    let addClass = document.getElementsByClassName("page");
    addClass[0].classList.add("pageborder");
    let addClassRows = document.getElementsByClassName("rows");
    addClassRows[0].classList.add("rowsborder");

    fetch(
      "http://localhost:8000/api/kpisd/" +
        this.state.rows +
        "?page=1&date=" +
        this.state.search1 +
        "&level=" +
        this.state.search2 +
        "&kpiId=" +
        id,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ kpisd: JSON.parse(res) }));
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
  }
  select(e, q) {
    document.getElementById("search0").setAttribute("data", e);
    document.getElementById("search0").value = q;
    this.setState({ kpis: "" });
  }
  searchTeam() {
    fetch("http://localhost:8000/api/kpis/7?name=" + this.state.searchTeam, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ kpis: JSON.parse(res) }));
  }
  Input(e) {
    this.setState({ searchTeam: e });
    this.searchTeam();
  }
  editLevel(e) {
    // alert(e);
    kpi_level_id = e;
    fetch("http://localhost:8000/api/kpid/" + e, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ kpisdEdited: JSON.parse(res) });
        this.setState({ level: this.state.kpisdEdited.level });
        this.setState({ date: this.state.kpisdEdited.date });
      });
    if (this.state.show == true) {
      flag = 0;
      flagNav = 0;
      // document
      //   .getElementById("search0")
      //   .removeEventListener("input", this.Input);
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
  onSubmit(e) {
    e.preventDefault();
    const data = this.state;
    let formData = new FormData();

    formData.append("level", this.state.level);
    // formData.append(
    //   "kpiId",
    //   document.getElementById("search0").getAttribute("data")
    // );

    formData.append("kpiId", id);
    if (kpi_level_id == 0)
      fetch("http://localhost:8000/api/kpid", {
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
      fetch("http://localhost:8000/api/kpid/" + kpi_level_id, {
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
      kpi_level_id = 0;
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
  render() {
    let count = "";
    if (this.state.kpisd.data != undefined) {
      count = this.state.kpisd.total;
      var last_page = this.state.kpisd.prev_page_url;
      var next_page = this.state.kpisd.next_page_url;
      var nbPages = this.state.kpisd.last_page;
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
    if (this.state.kpisd.data != undefined) {
      for (let i = 0; i < this.state.kpisd.data.length; i++) {
        let c = i % 2;
        array.push(
          <div className={"row" + c + " rowData"}>
            <div className="col0 col2">{this.state.kpisd.data[i].date}</div>
            <div className="col0 col2">{this.state.kpisd.data[i].level}</div>
            <div className="col0 col2">
              <div className="action">
                <div title="Edit">
                  <FontAwesomeIcon
                    onClick={() => {
                      this.editLevel(this.state.kpisd.data[i].id);
                    }}
                    className="pen"
                    icon={faPen}
                    color={"#e55d87"}
                  />
                </div>
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      this.deleteLevel(this.state.kpisd.data[i].id);
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
    let kpis = [];
    if (this.state.kpis != "") {
      for (let i = 0; i < this.state.kpis.data.length; i++) {
        kpis.push(
          <div
            onClick={() => {
              this.select(
                this.state.kpis.data[i].id,
                this.state.kpis.data[i].name
              );
            }}
            className="chooseTeam"
          >
            {this.state.kpis.data[i].name}
          </div>
        );
      }
    }
    let form = [];
    if (this.state.kpisdEdited == "")
      form.push(
        <form method="post" onSubmit={this.onSubmit}>
          <Modal.Header>New Level</Modal.Header>
          <Modal.Body>
            <label className="label">
              <input
                type="text"
                id="level"
                name="level"
                aria-invalid="false"
                className="text"
                placeholder=" "
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Level Value</span>
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
          <Modal.Header>Edit Level</Modal.Header>
          <Modal.Body>
            <label className="label">
              <input
                type="text"
                id="level"
                name="level"
                aria-invalid="false"
                className="text"
                placeholder=" "
                defaultValue={this.state.kpisdEdited.level}
                onChange={this.handleInputChange}
              />
              <span className="input-type"> Level Value </span>
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
          className="add-background new"
          onClick={() => {
            this.handleModal();
          }}
        >
          New KPI Level
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
              <div className="col0 col2">Date</div>
              <div className="col0 col2">Level</div>
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
export default Kpi_level;

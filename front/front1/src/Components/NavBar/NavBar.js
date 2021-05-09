import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLock,
  faSignOutAlt,
  faUser,
  faUsers,
  faProjectDiagram,
  faLayerGroup,
  faTasks,
  faChartPie,
  faCity,
  faCubes,
  faProductHunt,
  faColumns,
  faBoxOpen,
  faNewspaper,
  faImage,
  faFileVideo,
  faDatabase,
  faShare,
  faComment,
  faPuzzlePiece,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import "./NavBar.css";

var nav = 0;
var tables = "none",
  profile = "none";
var border = "border0";
var tuggle = "navclose";
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resize: "",
      nav: "sidenavclose",
      name: "",
      email: "",
      image: "",
    };
    this.openNav = this.openNav.bind(this);
    this.activateLasers = this.activateLasers.bind(this);
    this.profilePic = this.profilePic.bind(this);
    this.userList = this.userList.bind(this);
    this.userListChoice = this.userListChoice.bind(this);
    this.activeElement = this.activeElement.bind(this);
  }
  activeElement(e) {
    console.log(e);
  }
  userList() {
    var user = document.getElementById("userList");
    if (user.style.display != "none") user.style.display = "none";
    else user.style.display = "flex";
  }
  userListChoice() {
    var user = document.getElementById("userList");
    if (user.style.display != "none") user.style.display = "none";
    else user.style.display = "flex";
  }
  profilePic() {
    var table = document.getElementsByClassName("profilePic");
    if (table[0].style.display == "none") {
      for (let i = 0; i < table.length; i++) {
        table[i].style.display = "block";
      }
      profile = 1;
    } else {
      for (let i = 0; i < table.length; i++) {
        table[i].style.display = "none";
      }
      profile = "none";
    }
  }
  activateLasers() {
    var table = document.getElementsByClassName("tableSubElement");
    if (table[0].style.display == "none") {
      for (let i = 0; i < table.length; i++) {
        table[i].style.display = "block";
      }
      tables = 1;
    } else {
      for (let i = 0; i < table.length; i++) {
        table[i].style.display = "none";
      }
      tables = "none";
    }
  }
  openNav() {
    if (nav == 0) {
      tuggle = "navopen";
      this.props.resize("1");

      nav = 1;
      border = "border1";
      let b = document.getElementsByClassName("bborder");
      b[0].classList.add("border1");
      b[0].classList.remove("border0");
      b[1].classList.add("border1");
      b[1].classList.remove("border0");

      // document.getElementById("mySidenav").style.width = "200px";
      document.getElementById("mySidenav").classList.remove("closeNav");
      document.getElementById("mySidenav").classList.add("openNav");
      var element = document.getElementsByClassName("element");
      for (let i = 0; i < element.length; i++) {
        element[i].classList.add("element1");
        element[i].classList.remove("element0");
      }
    } else {
      tuggle = "navclose";
      this.props.resize("0");
      nav = 0;
      border = "border0";
      let b = document.getElementsByClassName("bborder");
      b[0].classList.add("border0");
      b[0].classList.remove("border1");
      b[1].classList.add("border0");
      b[1].classList.remove("border1");
      // document.getElementById("mySidenav").style.width = "50px";
      document.getElementById("mySidenav").classList.add("closeNav");
      document.getElementById("mySidenav").classList.remove("openNav");
      var element = document.getElementsByClassName("element");
      for (let i = 0; i < element.length; i++) {
        element[i].classList.add("element0");
        element[i].classList.remove("element1");
      }
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("Admin");
    const id = JSON.parse(data);
    const url = "http://localhost:8000/api/admin/admin/" + id;

    const response = fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.data &&
          this.setState({
            name: res.data.name,
            email: res.data.email,
            image: res.data.image,
          });
      });

    window.addEventListener("resize", (event) => {
      this.setState({ resize: "" });
    });
    var element = document.getElementsByClassName("element");
    for (let i = 0; i < element.length; i++) {
      element[i].classList.add("element0");
      element[i].classList.remove("element1");
    }
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Admin");
    window.location.replace("/admin/login");
  };

  render() {
    let nav = "sidenav";
    nav += " " + this.state.nav;
    var height = window.innerHeight;
    return (
      <div className="App si">
        <div
          id="mySidenav"
          className="sidenav closeNav"
          style={{ height: height }}
        >
          <div className="reactElement top divLink">
            {/* <img className="react-logo" src="react-brands.svg" width="16px" /> */}
            <div className="sidenavTitle headNav element"> Gym Supplements</div>
          </div>
          <div className="bborder border0"></div>
          {/* start here */}
          <div className="divLink">
            <div>
              <div
                onClick={this.profilePic}
                className="Link tableElement"
                to="#"
              >
                <div className="top">
                  <img
                    className="profile"
                    src={"http://localhost:8000/storage/" + this.state.image}
                    width="30px"
                  />
                  <div className="headNav profilen element">
                    {this.state.name}
                  </div>
                </div>
              </div>
              {/* elements */}
              <div className="subList">
                <NavLink
                  style={{ display: profile }}
                  className="Link profilePic"
                  to="/admin/profile"
                >
                  <div className="element">My Profile</div>
                </NavLink>
              </div>
              {/* elements */}
            </div>
          </div>
          {/* end here */}
          <div className="bborder border0"></div>

          {/* <div className="divLink elementActive active1">
            <NavLink className="Link" to="/admin/Dashboard">
              <svg
                class="MuiSvgIcon-root jss375 "
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
              </svg>
              <div className="element">Dashboard</div>
            </NavLink>
          </div> */}
          <div className="divLink active2">
            <NavLink className="Link" to="/admin/manageAdmins">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faUserLock}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Admins</div>
            </NavLink>
          </div>
          <div className="divLink active3">
            <NavLink className="Link" to="/admin/manageUsers">
              <div className="Icons">
                <FontAwesomeIcon icon={faUser} className="fa-icon" style={{}} />
              </div>
              <div className="element"> Users</div>
            </NavLink>

            {/* <NavLink className="Link" to="/admin/Teams">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Teams</div>
            </NavLink> */}

            {/* <NavLink className="Link" to="/admin/Kpis">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faTasks}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Kpis</div>
            </NavLink> */}
            {/* <NavLink className="Link" to="/graph">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faChartPie}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Graph</div>
            </NavLink> */}
          </div>
          <div className="divLink active4"></div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/ProductCategories">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faColumns}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Product Categories</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/Products">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Products</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/Packages">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faCubes}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Packages</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/Cities">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faCity}
                  className="fas fa-city"
                  style={{}}
                />
              </div>
              <div className="element">Cities</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/ArticleCategories">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Article Categories</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/Articles">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Articles</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/Workouts">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faFileVideo}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Workouts</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/WorkoutDatas">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faDatabase}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Workout Datas</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/WorkoutCategories">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faPuzzlePiece}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Workout Categories</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/Orders">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faShare}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Orders</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/chat">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faComment}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Feedback</div>
            </NavLink>
          </div>
          <div className="divLink active4">
            <NavLink className="Link" to="/admin/Testimonials">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Testimonials</div>
            </NavLink>
          </div>

          <div className="divLink">
          <NavLink className="Link" to="/admin/heroimages">
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faImage}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">Hero Images</div>
            </NavLink>
          </div>

          <div className="divLink active5">
            <div className="Link" onClick={this.handleLogout}>
              <div className="Icons">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="fa-icon"
                  style={{}}
                />
              </div>
              <div className="element">LogOut</div>
            </div>
          </div>
          {/* end here */}
        </div>
        {/* end of side nav */}
        <div className={"topnav" + " " + tuggle}>
          <div className="topnavLeft">
            <div className="open" onClick={this.openNav}>
              &#9776;
              <div className="navTitle topNavTitle">{this.props.title}</div>
            </div>
          </div>
          <div className="topnavRight">
            <img
              onClick={this.userList}
              className="user"
              src="/user-solid.svg"
              width="15px"
            />
            <div id="userList" style={{ display: "none" }}>
              <div onClick={this.userListChoice}>
                <NavLink className="tope" to="/admin/profile">
                  Profile
                </NavLink>
              </div>

              <div onClick={this.handleLogout}>
                <NavLink className="tope" to="/admin/profile">
                  Log Out
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NavBar;

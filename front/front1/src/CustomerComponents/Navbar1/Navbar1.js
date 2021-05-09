import React, { Component } from "react";
import * as RBS from "react-bootstrap";
import mainLogo from "./logo2.png";
import "./Navbar1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartPlus,
  faDumbbell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
// import flag1 from "./flag3.png";
import flag from "./flag1.svg";
import { Modal, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import UserLog from "../UserLog/UserLog";

let rows = 0;
var singedInn;
var outt;

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showlog: false,
    };
  }
  updateShared = (e) => {
    console.log(e.target.value);
    this.props.updateShared(e.target.value);
  };
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  handleModal() {
    this.setState({
      show: !this.state.show,
    });
  }

  rowsOptions = () => {
    let a = document.getElementsByClassName("menunav");
    if (rows == 0) {
      rows = 1;
      a[0].style.display = "";
    } else {
      rows = 0;
      a[0].style.display = "none";
    }
  };

  handleLogout = () => {
    localStorage.removeItem("tokenUser");
    localStorage.removeItem("user");
    window.location.replace("/Home");
  };

  handleModalLog = () => {
    this.setState({
      showlog: !this.state.showlog,
    });
  };
  handleModalLogSuccess = () => {
    this.setState(
      {
        showlog: !this.state.showlog,
      },
      () => this.Success()
    );
  };
  Success = () => {
    // alert('hi')
    window.location.reload();
  };

  render() {
    const logo = { mainLogo };

    console.log(this.props);
    let singed = localStorage.getItem("user");

    if (!singed) {
      var singedInn = "singedIn";
    } else {
      var outt = "isout";
    }

    return (
      <>
        <UserLog
          showlog={this.state.showlog || this.props.open}
          handleModalLog={this.handleModalLogSuccess}
        />

        <div>
          <RBS.Navbar collapseOnSelect className="navbar-style" expand="lg">
            <RBS.Navbar.Brand href="/">
              <img className="logo" src={mainLogo} />
            </RBS.Navbar.Brand>

            <RBS.Navbar.Toggle aria-controls="responsive-navbar-nav mr-auto">
              <FontAwesomeIcon
                icon={faDumbbell}
                style={{ color: "white", "font-size": "30px" }}
              />
            </RBS.Navbar.Toggle>

            <RBS.Navbar.Collapse id="responsive-navbar-nav">
              <div className="mr-auto">
                <div className="linksNav">
                  <RBS.Nav.Link className="homenav" href="/">
                    Home
                  </RBS.Nav.Link>

                  <RBS.Nav.Link href="/Shop/product">Shop</RBS.Nav.Link>

                  <RBS.Nav.Link href="/WorkoutCategories">
                    Workouts
                  </RBS.Nav.Link>

                  {/* <RBS.Nav.Link href="">Blogs</RBS.Nav.Link> */}

                  <RBS.Nav.Link href="/#about">About Us</RBS.Nav.Link>

                  <RBS.Nav.Link href="/ArticleCategories">
                    Articles
                  </RBS.Nav.Link>

                  <RBS.Nav.Link href="/Contact">Contact Us</RBS.Nav.Link>

                  <RBS.Nav.Link href="/Feedback">FeedBack</RBS.Nav.Link>
                </div>
              </div>
              <RBS.Nav>
                <span className="flexrownav">
                  <RBS.Nav.Link href="">
                    <img
                      onClick={this.handleModal.bind(this)}
                      // className="flagimg"
                      style={{ width: "50px", height: "30px" }}
                      src={flag}
                    />
                  </RBS.Nav.Link>

                  <RBS.Nav.Link className="cartt" href="/cart">
                    <FontAwesomeIcon
                      id="cart"
                      className="cart-icon"
                      icon={faCartPlus}
                      style={{
                        color: "white",
                        //   "font-size": "30px",
                        //   // marginTop: "3px",
                      }}
                    />
                  </RBS.Nav.Link>

                  <RBS.Nav.Link className="userr" href="">
                    <div class="container">
                      <div onClick={this.rowsOptions} className="rows ">
                        <FontAwesomeIcon
                          className="user-icon"
                          icon={faUser}
                          style={{
                            color: "white",
                            // "font-size": "30px",
                            marginTop: "3px",
                          }}
                        />
                      </div>
                      <div style={{ display: "none" }} className="menunav">
                        <div>
                          <div className={outt}>
                            <Link
                              className="menulink"
                              onClick={this.handleModalLog}
                              to=""
                            >
                              Sign in
                            </Link>
                          </div>
                          <div className={singedInn}>
                            <Link className="menulink" to="/useProfile">
                              Profile
                            </Link>
                          </div>
                          <div className={singedInn}>
                            <Link
                              className="menulink"
                              onClick={this.handleLogout}
                              to=""
                            >
                              Sign Out
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RBS.Nav.Link>
                </span>

                <RBS.Form inline className="linkform" id="desktop">
                  <div className="searchDiv">
                    <input
                      type="text"
                      placeholder="Search"
                      className=" searchnav"
                      onChange={this.updateShared}
                      disabled={
                        window.location.pathname == "/" ||
                        window.location.pathname == "/Home"
                          ? true
                          : false
                      }
                    />

                    <button className="searchbtn">
                      <FontAwesomeIcon
                        className="schicon"
                        icon={faSearch}
                        style={{ color: "white" }}
                      />
                    </button>
                  </div>
                </RBS.Form>
              </RBS.Nav>
            </RBS.Navbar.Collapse>
            <RBS.Form inline className="linkform" id="phone">
              <div className="searchDiv">
                <input
                  type="text"
                  placeholder="Search"
                  className=" searchnav"
                  onChange={this.updateShared}
                  disabled={
                    window.location.pathname == "/" ||
                    window.location.pathname == "/Home"
                      ? true
                      : false
                  }
                />

                <button className="searchbtn">
                  <FontAwesomeIcon
                    className="schicon"
                    icon={faSearch}
                    style={{ color: "white" }}
                  />
                </button>
              </div>
            </RBS.Form>
          </RBS.Navbar>
        </div>

        <div>
          <Modal
            centered
            className="ModelFlag"
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            show={this.state.show}
          >
            <Modal.Header className="no-gutters modelheader">
              <img className="headerimage" src={flag} />
            </Modal.Header>

            <Modal.Body className="firsts">
              Please note that we only accept <br></br>
              <span className="lira">Lebanese Lira (L.L)</span> <br></br>
              as a payment currency
              <br></br>
              <br></br>
              Sorry for the inconvenience.
              <br></br>
              <br></br>
            </Modal.Body>
            <Modal.Footer className="Modelfooter">
              <button
                className=""
                className="popupbtn"
                onClick={() => {
                  this.handleModal();
                }}
              >
                {" "}
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

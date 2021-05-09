import React, { Component } from "react";
import * as RBS from "react-bootstrap";
import mainLogo from "./logo.png";
// import "./Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartPlus,
  faDumbbell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import flag1 from "./flag1.svg";
import { Modal, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

let rows = 0;
var singedInn;
var outt;

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showPopup: false,
      screen: "",
      show: false,
    };
  }
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

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        screen: window.innerWidth,
      });
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

  render() {
    const logo = { mainLogo };
    let expandclass = this.state.screen > 1200 ? "xll" : "xl";

    let singed = localStorage.getItem("user");

    if (!singed) {
      var singedInn = "singedIn";
    } else {
      var outt = "isout";
    }

    return (
      <>
        <div>
          <RBS.Navbar
            collapseOnSelect
            className="navbar-style"
            expand={expandclass}
          >
            <RBS.Navbar.Brand href="/">
              <img style={{ width: "280px", height: "150px" }} src={mainLogo} />
            </RBS.Navbar.Brand>

            <RBS.Navbar.Toggle aria-controls="responsive-navbar-nav mr-auto">
              <FontAwesomeIcon
                icon={faDumbbell}
                style={{ color: "white", "font-size": "30px" }}
              />
            </RBS.Navbar.Toggle>

            <RBS.Navbar.Collapse id="responsive-navbar-nav">
              <RBS.Nav className="" style={{ marginRight: "5%" }}>
                <RBS.Nav.Link className="homenav" href="/Home">
                  Home
                </RBS.Nav.Link>

                <RBS.Nav.Link href="/shop/product">Shop</RBS.Nav.Link>

                <RBS.Nav.Link href="">Workouts</RBS.Nav.Link>

                <RBS.Nav.Link href="">Blogs</RBS.Nav.Link>

                <RBS.Nav.Link href="/#about">About Us</RBS.Nav.Link>

                <RBS.Nav.Link href="">Contact Us</RBS.Nav.Link>

                <span className="flexrownav">
                  <RBS.Nav.Link href="">
                    <button
                      className="flag"
                      onClick={this.handleModal.bind(this)}
                    >
                      <img
                        className="flagimg"
                        style={{ width: "60px", height: "30px" }}
                        src={flag1}
                      />
                    </button>
                  </RBS.Nav.Link>

                  <RBS.Nav.Link className="cartt" href="">
                    <FontAwesomeIcon
                      className="cart-icon"
                      icon={faCartPlus}
                      style={{
                        color: "white",
                        "font-size": "30px",
                        marginTop: "3px",
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
                            "font-size": "30px",
                            marginTop: "3px",
                          }}
                        />
                      </div>
                      <div style={{ display: "none" }} className="menunav">
                        <div>
                          <div className={outt}>
                            <Link className="menulink" to="/Home">
                              {" "}
                              Sign in
                            </Link>{" "}
                          </div>
                          <div className={singedInn}>
                            {" "}
                            <Link className="menulink" to="/Home">
                              Profile
                            </Link>{" "}
                          </div>
                          <div className={singedInn}>
                            {" "}
                            <Link className="menulink" to="/Home">
                              Sign out
                            </Link>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </RBS.Nav.Link>
                </span>

                <RBS.Form inline className="linkform">
                  <input
                    type="text"
                    placeholder="Search"
                    className=" searchnav"
                  />

                  <button className="searchbtn">
                    <FontAwesomeIcon
                      className="schicon"
                      icon={faSearch}
                      style={{ color: "white" }}
                    />
                  </button>
                </RBS.Form>
              </RBS.Nav>
            </RBS.Navbar.Collapse>
          </RBS.Navbar>
        </div>

        <div>
          <Modal
            centered
            className="ModelFlag"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={this.state.show}
          >
            <Modal.Header className="no-gutters modelheader">
              <img className="headerimage" src={flag1} />
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

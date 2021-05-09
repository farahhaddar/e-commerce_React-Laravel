import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./UseLog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import { Link } from "react-router-dom";

export default class UserLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autho: 0,
      error: "",
      test: "",
    };
  }

  componentDidUpdate() {
    let x = document.getElementsByClassName("modal-body");
    if (x.length > 0) {
      x[0].classList.add("modalBodyUser");
    }
    let z = document.getElementById("LoginId");
    if(z){
    let x1 = document.getElementsByClassName("modelheader");
    if (x1.length > 0) {
      x1[0].classList.add("modelheaderUser22");
    }
  }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/user/login";
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch(function (error) {
      console.log(error);
    });

    const res = await response.json();
    const result = await response.status;

    if (result === 200) {
      var accessToken = res.access_token;
      var user = res.user;
      var userId = user.id;
      var id = JSON.stringify(userId);
      this.setState({ autho: result });
      window.localStorage.setItem("tokenUser", accessToken);
      window.localStorage.setItem("user", id);
      toast.info("You Seccsussfuly loged in !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        onClose: () => this.props.handleModalLog(),
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert( ");
      // this.props.handleModalLog();
    } else {
      this.setState({ error: res.error });
    }
  };

  render() {
    console.log(this.props.showlog);
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Modal
          centered
          className="ModelFlag"
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.props.showlog}
        >
          <Modal.Header
            className="no-gutters modelheader LogH"
            id="LoginId"
          >
            <div className="LogHText">Login </div>
            <div
              className="exitbtn"
              onClick={() => {
                this.props.handleModalLog();
              }}
            >
              X
            </div>
          </Modal.Header>

          <Modal.Body
          // style={{padding:' 0vh !important',
          // backgroundColor: 'rgb(255, 255, 255)'}}
          >
            <div className="login2">
              <div className="login-wrapper2">
                <div className="login-form2">
                  <form className="Formuser" onSubmit={this.handleSubmit}>
                    <div className="email2">
                      <h6 style={{ color: "red" }}>{this.state.error}</h6>
                      <label className="login-label2">
                        <span className="icons2">
                          <div className="icon2">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="envelope"
                            />
                          </div>
                          Email
                        </span>
                      </label>
                      <input
                        type="email"
                        className="text-login2"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                      />
                      <br />
                    </div>
                    <div className="password2">
                      <label className="login-label2">
                        <span className="icons2">
                          <div className="icon2">
                            <FontAwesomeIcon
                              icon={faLock}
                              className="password-icon"
                            />
                          </div>
                          Password
                        </span>
                      </label>
                      <input
                        type="password"
                        className="text-login2"
                        name="password"
                        placeholder="Password"
                        required
                      />
                      <br />
                    </div>
                    <input
                      type="submit"
                      className="signinbuttn"
                      name="Sign In"
                      value="Sign In"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="Modelfooter2">
            <div>Don't have an account ?</div>
            <div>
              <Link  onClick={() => {
                this.props.handleModalLog();
              }} 
              to="/register"> Register Here</Link>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

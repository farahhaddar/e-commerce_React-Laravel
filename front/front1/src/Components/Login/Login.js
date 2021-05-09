import React from "react";
import "../Login/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Background from "../Login/login.jpg";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autho: 0,
      error: "",
    };
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/admin/login";
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
      console.log(res+'hi')
      var accessToken = res.access_token;
      var Admin = res.Admin;
      var userId = Admin.id;
      var s = JSON.stringify(userId);
      this.setState({ autho: result });
      window.localStorage.setItem("token", accessToken);
      window.localStorage.setItem("Admin", s);
    } else {
      this.setState({ error: res.error });
    }
  };

  render() {
    if (this.state.autho === 200) window.location.replace("/admin/profile");
    // <Redirect  to='/Dashboard'  />

    return (
      <div className="login" >
        <div className="login-wrapper">
          <div className="login-form">
            <h2 className="titleLog">Login Now</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="email">
                <h6 style={{ color: "red" }}>{this.state.error}</h6>
                <label className="login-label">
                  <span className="icons">
                    <div className="icon">
                      <FontAwesomeIcon icon={faEnvelope} className="envelope" />
                    </div>
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  className="text-login"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />
                <br />
              </div>
              <div className="password">
                <label className="login-label">
                  <span className="icons">
                    <div className="icon">
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
                  className="text-login"
                  name="password"
                  placeholder="Password"
                  required
                />
                <br />
              </div>
              <input
                type="submit"
                className="signin"
                name="Sign In"
                value="Sign In"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

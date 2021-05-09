import React, { Component } from "react";
import "./Register.css";
import {
  Card,
  Container,
  Row,
  Button,
  Col,
  Form,
  Table,
} from "react-bootstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cities: "",
      name: "",
      Address: "",
      Comment: "",
      password: "",
      confirmPassword: "",
      token: "",
      user: "",
      email: "",
      phoneNb: "",
      // image:"",
      confPassErr: "",
      nameErr: "",
      emailErr: "",
      passwordErr: "",
      phoneNbErr: "",
      adressErr: "",
      city_idErr: "",
    };
  }

  componentDidMount() {
    try {
      fetch("http://localhost:8000/api/cities/1000", {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({ cities: json.data });
          console.log(json.data[0].id);
          this.setState({ city: json.data[0].id });
        });
    } catch (err) {
      console.log(err);
    }
  }

  Submit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ confPassErr: "Your password must match !" });
    } else {
      let formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);
      formData.append("phoneNb", this.state.phoneNb);
      formData.append("adress", this.state.Address);
      formData.append("extraInfo", this.state.Comment);
      formData.append("city_id", this.state.city);

      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "post",
        body: formData,
        headers: {},
      }).catch(function (error) {
        console.log(error);
      });
      const res = await response.json();
      const result = await response.status;
      console.log(result, res);
      if (result === 200) {
        window.localStorage.setItem("tokenUser", res.access_token);
        window.localStorage.setItem("user", res.user.id);
        window.location.replace("/Home");
      } else {
        // this.setState({ error: res.error.message });
        res.error.message &&
          res.error.message.name &&
          res.error.message.name[0] &&
          this.setState({ nameErr: res.error.message.name[0] });

        res.error.message &&
          res.error.message.email &&
          res.error.message.email[0] &&
          this.setState({ emailErr: res.error.message.email[0] });

        res.error.message &&
          res.error.message.password &&
          res.error.message.password[0] &&
          this.setState({ passwordErr: res.error.message.password[0] });

        res.error.message &&
          res.error.message.phoneNb &&
          res.error.message.phoneNb[0] &&
          this.setState({ phoneNbErr: res.error.message.phoneNb[0] });

        res.error.message &&
          res.error.message.city_id &&
          res.error.message.city_id[0] &&
          this.setState({ city_idErr: res.error.message.city_id[0] });

        res.error.message &&
          res.error.message.adress &&
          res.error.message.adress[0] &&
          this.setState({ adressErr: res.error.message.adress[0] });
      }
    }
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ City: e.target.value });
  };
  handleChangeName = (e) => {
    console.log(e.target.value);
    this.setState({ name: e.target.value });
  };
  handleChangeEmail = (e) => {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  };
  handleChangePassword = (e) => {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  };
  handleChangePasswordConfirm = (e) => {
    console.log(e.target.value);
    this.setState({ confirmPassword: e.target.value });
  };
  handleChangePhone = (e) => {
    console.log(e.target.value);
    this.setState({ phoneNb: e.target.value });
  };
  handleAddress = (e) => {
    console.log(e.target.value);
    this.setState({ Address: e.target.value });
  };
  handleComment = (e) => {
    console.log(e.target.value);
    this.setState({ Comment: e.target.value });
  };

  render() {
    let City = [];
    if (this.state.cities)
      if (this.state.cities[0] != undefined) {
        for (let i = 0; i < this.state.cities.length; i++) {
          console.log(this.state.cities[i]);
          City.push(
            <option value={this.state.cities[i].id}>
              {this.state.cities[i].name}
            </option>
          );
        }
      }
    console.log(City);

    return (
      <div>
        <div className="AboutUsHome" id="about">
          <div className="ptitle">
            <h2>Register</h2>
          </div>
          <div className="registerCenter">
            <Form method="post" onSubmit={this.Submit}>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <h6 className="errREg">{this.state.nameErr} </h6>
                <label>Name</label>
                <Form.Control
                  as="input"
                  custom
                  id="assign"
                  // defaultValue={name}
                  // style={{ maxWidth: "50%" }}
                  onChange={this.handleChangeName}
                ></Form.Control>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <h6 className="errREg"> {this.state.emailErr}</h6>
                <label>Email</label>
                <Form.Control
                  as="input"
                  custom
                  id="assign"
                  // defaultValue={name}
                  // style={{ maxWidth: "50%" }}
                  onChange={this.handleChangeEmail}
                ></Form.Control>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <h6 className="errREg"> {this.state.passwordErr}</h6>
                <label>Password</label>
                <Form.Control
                  as="input"
                  type="password"
                  custom
                  id="assign"
                  // defaultValue={name}
                  // style={{ maxWidth: "50%" }}
                  onChange={this.handleChangePassword}
                ></Form.Control>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <h6 className="errREg"> {this.state.confPassErr}</h6>
                <label>Confirm Password</label>
                <Form.Control
                  as="input"
                  custom
                  type="password"
                  id="assign"
                  // defaultValue={name}
                  // style={{ maxWidth: "50%" }}
                  onChange={this.handleChangePasswordConfirm}
                ></Form.Control>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <h6 className="errREg"> {this.state.phoneNbErr}</h6>
                <label>Phone Number</label>
                <Form.Control
                  as="input"
                  custom
                  id="assign"
                  // style={{ maxWidth: "50%" }}
                  onChange={this.handleChangePhone}
                ></Form.Control>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <h6 className="errREg"> {this.state.city_idErr}</h6>
                <label>City</label>
                <Form.Control
                  as="select"
                  custom
                  id="city"
                  onChange={this.handleChange}
                  // style={{ maxWidth: "50%" }}
                >
                  {City}
                </Form.Control>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <h6 className="errREg"> {this.state.adressErr}</h6>
                <label>Address</label>
                <Form.Control
                  as="input"
                  custom
                  id="assign"
                  // style={{ maxWidth: "50%" }}
                  // defaultValue={address}
                  onChange={this.handleAddress}
                ></Form.Control>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                id="div1"
              >
                <label> Address Comment</label>
                <Form.Control
                  as="input"
                  custom
                  id="assign"
                  // style={{ maxWidth: "50%" }}
                  onChange={this.handleComment}
                ></Form.Control>
              </div>

              <Button onClick={this.Submit}> Submit </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

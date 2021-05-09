import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "./Customer.css";
import Login from "../Login/Login";

var navState;
var compSize;
class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
      resize: "",
      title: "Dashboard",
    };
    this.title = this.title.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", (event) => {
      this.setState({ resize: "" });
    });
  }
  title(e) {
    this.props.title(e);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/Login"
            render={(props) => <Login {...props} title={this.title} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Customer;

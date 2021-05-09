import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Contactus from "./Components/Contactus";
import Account from "./Components/Account";
import NavBar from "./Components/NavBar/NavBar";
import Table from "./Components/Table/Table";
import All from "./Components/All/All";
import Customer from "./CustomerComponents/Customer/Customer";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Template from "./views/overview/Multiseries Chart";
import { Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
      resize: 0,
      title: "Dashboard",
    };
    this.resize = this.resize.bind(this);
    this.title = this.title.bind(this);
  }
  resize(e) {
    this.setState({ resize: e });
  }
  title(e) {
    this.setState({ title: e });
  }
  render() {
    const token = window.localStorage.getItem("token");
    const admin = window.localStorage.getItem("Admin");
    const route= window.location.href;
    if(route.includes("/admin")&&(!token && !admin))return( <Login />)

    return (
      <Switch>
        <Route
          path="/admin"
          render={(props) => (
            <div className="App">
              <NavBar
                title={this.state.title}
                tuggle={this.state.resize}
                resize={this.resize}
              />
              <All title={this.title} tuggle={this.state.resize} />
            </div>
          )}
        />
        <Route
          path="/"
          render={(props) => (
            <div className="App">
              <Customer title={this.title} tuggle={this.state.resize} />
            </div>
          )}
        />
      </Switch>
    );
  }
}

export default App;

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Table from "../Table/Table";
import Contactus from "../Contactus";
import Account from "../Account";
import "./All.css";
import ManageAdmins from "../ManageAdmins/ManageAdmins";
import ManageUsers from "../ManageUsers/ManageUsers";
import Projects from "../Projects/Projects";
import ProductCategories from "../ProductCategories/ProductCategories";
import Products from "../Products/Products";
import Cities from "../Cities/Cities";
import Packages from "../Packages/Packages";
// import PackageProducts from "../PackageProducts/PackageProducts";
import Orders from "../Orders/Orders";
import OrderDetails from "../Orders/OrderDetails";
import OrderDetailsPackages from "../Orders/OrderDetailsPackages";
import Chat from "../Chat/Chat";
import HeroImages from "../HeroImages/HeroImages";
import Testimonials from "../Testimonials/Testimonials";

import Role from "../Role/Role";
import Graph from "../Graph/Graph";
import Kpis from "../Kpis/Kpis";
import KpisEmployee from "../Kpis/KpisEmployee";
import Kpi_level from "../Kpis/Kpi_level";
import Teams from "../Teams/Teams";
import Manage_team_Members from "../Teams/Manage_team_Members";
import Manage_team_Projects from "../Teams/Manage_team_Projects.js";
import TeamRoles from "../Teams/TeamRoles.js";
import Login from "../Login/Login";
import AutoComplete from "../AutoComplete/AutoComplete";
import Home from "../Home/Home";
import KpiReport from "../Reports/KpiReport/KpiReport";
import EmployeeProjectsReport from "../Reports/EmployeeProjectsReport/EmployeeProjectsReport";
import Profile from "../Profile/Profile";
import Design from "../Design/Design";
import WorkoutCategories from "../WorkoutCategories/WorkoutCategories";
import Workouts from "../Workouts/Workouts";
import AddArticle from "../AddArticle/AddArticle";
import EditArticle from "../EditArticle/EditArticle";
import WorkoutDatas from "../WorkoutDatas/WorkoutDatas";

import ArticleCategories from "../ArticleCategories/ArticleCategories";
import Articles from "../Articles/Articles";

var navState;
var compSize;
class All extends Component {
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
    // this.props.title("hi");
    // this.setState({ title: e });

    this.props.title(e);
  }
  render() {
    var navSize;
    var widthScreen;
    var allWidth;
    if (this.props.tuggle == 0) {
      navSize = 50;

      widthScreen = "calc(100% - 100px)";
      allWidth = "allWidthClose";
    } else {
      navSize = 200;
      widthScreen = "calc(100% - 250px)";
      allWidth = "allWidthOpen";
    }
    compSize = window.innerWidth - navSize;
    compSize -= 60;

    return (


      <div className={"location screenWidth " + allWidth}>
        <Switch>
          <Route exact path="/admin/contactus" component={Contactus} />
          <Route exact path="/admin/account" component={Account} />
          <Route width={compSize} exact path="/admin/table" component={Table} />
          {/* <Route
            exact
            path="/admin/Dashboard"
            render={(props) => <Home {...props} title={this.title} />}
          /> */}
          <Route
            exact
            path="/admin/profile"
            render={(props) => <Profile {...props} title={this.title} />}
          />

          <Route
            exact
            path="/admin/manageAdmins"
            render={(props) => <ManageAdmins {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/manageUsers"
            render={(props) => <ManageUsers {...props} title={this.title} />}
          />

          <Route
            exact
            path="/admin/autocomplete"
            render={(props) => <AutoComplete {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/login"
            render={(props) => <Login {...props} title={this.title} />}
          />

          <Route
            exact
            path="/admin/ProductCategories"
            render={(props) => (
              <ProductCategories {...props} title={this.title} />
            )}
          />
          <Route
            exact
            path="/admin/Products"
            render={(props) => <Products {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/Cities"
            render={(props) => <Cities {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/Packages"
            render={(props) => <Packages {...props} title={this.title} />}
          />
          {/* <Route
            exact
            path="/admin/PackageProducts"
            render={(props) => (
              <PackageProducts {...props} title={this.title} />
            )}
          /> */}
          <Route
            exact
            path="/admin/Orders"
            render={(props) => <Orders {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/OrderDetails"
            render={(props) => <OrderDetails {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/OrderDetailsPackages"
            render={(props) => (
              <OrderDetailsPackages {...props} title={this.title} />
            )}
          />
          <Route
            exact
            path="/admin/Chat"
            render={(props) => <Chat {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/HeroImages"
            render={(props) => <HeroImages {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/Testimonials"
            render={(props) => <Testimonials {...props} title={this.title} />}
          />

     
          <Route
            width={compSize}
            exact
            path="/admin/WorkoutCategories"
            render={(props) => (
              <WorkoutCategories {...props} title={this.title} />
            )}
          />
          <Route
            width={compSize}
            exact
            path="/admin/AddArticle"
            render={(props) => <AddArticle {...props} title={this.title} />}
          />

          <Route
            width={compSize}
            exact
            path="/admin/Workouts"
            render={(props) => <Workouts {...props} title={this.title} />}
          />
          <Route
            width={compSize}
            exact
            path="/admin/WorkoutDatas"
            render={(props) => <WorkoutDatas {...props} title={this.title} />}
          />

          <Route
            width={compSize}
            exact
            path="/admin/EditArticle/:id"
            render={(props) => <EditArticle {...props} title={this.title} />}
          />
          <Route
            exact
            path="/admin/ArticleCategories"
            render={(props) => (
              <ArticleCategories {...props} title={this.title} />
            )}
          />
          <Route
            exact
            path="/admin/Articles"
            render={(props) => <Articles {...props} title={this.title} />}
          />
        </Switch>
      </div>
    );
  }
}

export default All;

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "./Customer.css";
import BootstrapCarousel from "../Crousel/BootstrapCarousel";
import ProductCard from "../Card/Card";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import NavBar1 from "../Navbar1/Navbar1";
import ArticleCategories from "../ArticleCategories/ArticleCategories";
import ArticlesCat from "../ArticlesCat/ArticlesCat";
import Article from "../Article/Article";
import Slider from "../Slider";
import WorkoutCategories from "../WorkoutCategories/WorkoutCategories";
import Workouts from "../Workouts/Workout";
import Footer from "../Footer/Footer";
import ProductDetails from "../ProductDetails/ProductDetails";
import PackageDetails from "../PackageDetails/PackageDetails";

import Cards from "../Card/Cards";
import Demo from "../Crousel/Demo";
import Cart from "../Cart/Cart";

import Contact from "../Contact/Contact";
import UserLog from "../UserLog/UserLog";
import UserProfile from "../UserProfile/UserProfile";
import Workout from "../workout/workout.js";
import WorkoutImg from "../workout/WorkoutImg.js";
import Checkout from "../checkout/checkout";
import NotFound from "../Not_Found/NotFound";
import Shop from "../Shop/Shop";
import Feedback from "../Feedback/Feedback";
import Register from "../Register/Register";
var navState;
var compSize;

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
      resize: "",
      title: "Dashboard",
      shared_var: "",
      open: false,
    };
    this.title = this.title.bind(this);
    this.updateShared = this.updateShared.bind(this);
    this.SetOpen = this.SetOpen.bind(this);
  }

  updateShared(shared_value) {
    this.setState({ shared_var: shared_value });
  }

  title(e) {
    this.props.title(e);
  }
  Success = () => {
    this.componentDidMount();
  };
  SetOpen(e) {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <NavBar1
          shared_var={this.state.shared_var}
          updateShared={this.updateShared}
          open={this.state.open}
          SetOpen={this.SetOpen}
        />
        <div className="page-container">
          <div className="content-wrap">
            <Switch>
              <Route
                exact
                path="/Home"
                render={(props) => (
                  <Home
                    {...props}
                    title={this.title}
                    open={this.state.open}
                    SetOpen={this.SetOpen}
                  />
                )}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    {...props}
                    title={this.title}
                    open={this.state.open}
                    SetOpen={this.SetOpen}
                  />
                )}
              />
              <Route
                exact
                path="/register"
                render={(props) => <Register {...props} title={this.title} />}
              />

              <Route
                exact
                path="/userlog"
                render={(props) => <UserLog {...props} title={this.title} />}
              />

              <Route
                exact
                path="/useProfile"
                render={(props) => (
                  <UserProfile {...props} title={this.title} />
                )}
              />

              <Route
                exact
                path="/cars"
                render={(props) => <Demo {...props} title={this.title} />}
              />
              <Route
                exact
                path="/card"
                render={(props) => <Cards {...props} title={this.title} />}
              />

              <Route
                exact
                path="/nav"
                render={(props) => (
                  <NavBar1
                    {...props}
                    Success={this.Success}
                    title={this.title}
                  />
                )}
              />
              <Route
                exact
                path="/footer"
                render={(props) => <Footer {...props} title={this.title} />}
                path="/ProductDetails/:id"
                render={(props) => (
                  <ProductDetails {...props} title={this.title} />
                )}
              />
              <Route
                exact
                path="/footer"
                render={(props) => <Footer {...props} title={this.title} />}
                path="/PackageDetails/:id"
                render={(props) => (
                  <PackageDetails {...props} title={this.title} />
                )}
              />

              <Route
                exact
                path="/ArticleCategories"
                render={(props) => (
                  <ArticleCategories
                    shared_var={this.state.shared_var}
                    updateShared={this.updateShared}
                  />
                )}
              />
              <Route
                exact
                path="/articlesCat/:id"
                render={(props) => (
                  <ArticlesCat
                    shared_var={this.state.shared_var}
                    updateShared={this.updateShared}
                  />
                )}
              />
              <Route
                exact
                path="/article/:id"
                render={(props) => <Article />}
              />
              <Route exact path="/Slider" render={(props) => <Slider />} />
              <Route
                exact
                path="/WorkoutCategories"
                render={(props) => (
                  <WorkoutCategories
                    shared_var={this.state.shared_var}
                    updateShared={this.updateShared}
                  />
                )}
              />
              <Route
                exact
                path="/Feedback"
                render={(props) => <Feedback {...props} title={this.title} />}
              />
              <Route
                exact
                path="/Workouts/:id"
                render={(props) => (
                  <Workouts
                    shared_var={this.state.shared_var}
                    updateShared={this.updateShared}
                  />
                )}
              />
              <Route exact path="/Cart" render={(props) => <Cart />} />
              <Route exact path="/Contact" render={(props) => <Contact />} />
              <Route exact path="/Workout" render={(props) => <Workout />} />

              <Route
                exact
                path="/Workout/:id"
                render={(props) => <Workout />}
              />

              <Route
                exact
                path="/workoutImg/:id"
                render={(props) => <WorkoutImg />}
              />
              <Route exact path="/checkout" render={(props) => <Checkout />} />
              <Route
                exact
                path="/Shop/:id"
                render={(props) => (
                  <Shop
                    shared_var={this.state.shared_var}
                    updateShared={this.updateShared}
                  />
                )}
              />

              <Route>
                {" "}
                <NotFound />
              </Route>
            </Switch>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Customer;

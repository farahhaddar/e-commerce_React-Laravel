import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../Card/Cards";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
  faCartPlus,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

import "./Home.css";
import logo from "./logo2.png";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      image: [],
      testimonials: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/testimonials/3", {
      headers: {
        //   Accept: "application/json",
        //   Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) =>
        this.setState({ testimonials: JSON.parse(res).data.data })
      );
    fetch("http://localhost:8000/api/imageHero", {
      method: "GET",
      // body: formData,
      // headers: {
      //   Accept: "application/json",
      //   Authorization: "Bearer " + token,
      // },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          image: res.data,
        });
      });
  }

  render() {
    return (
      <div>
        <div className="HomeCont">
          {/* Crousel */}

          <div className="Carousel">
            {this.state.image != "" ? (
              <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                autoPlay={true}
                transitionTime="600"
                interval="3000"
                stopOnHover={false}
                swipeable={true}
                showIndicators={true}
                showStatus={true}
              >
                {this.state.image.map((item, index) => (
                  <div key={index}>
                    <img
                      style={{ height: "70vh" }}
                      src={"http://localhost:8000/storage/" + item.image}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              ""
            )}
          </div>

          {/* Moving title */}

          <div className="animatitedTitle">
            <marquee behavior="alternate">
              {" "}
              HERE TO HELP YOU ACHIEVE YOUR GOALS
            </marquee>
          </div>

          {/* products */}

          <div className="RecentProducts">
            <div className="ptitle">
              <h2>Recent Products </h2>
            </div>

            {
              (console.log(this.props),
              (
                <Card
                  url="http://localhost:8000/api/productsrecnt"
                  item="product"
                  open={this.props.open}
                  SetOpen={this.props.SetOpen}
                />
              ))
            }

            <div className="allLink">
              <Link className="toLink" to="/Shop/product">
                {" "}
                See All Products{" "}
              </Link>
            </div>
          </div>

          {/* packages */}

          <div className="RecentPackages">
            <div className="ptitle">
              <h2> Recent Packages</h2>
            </div>
            <Card
              url="http://localhost:8000/api/packagesrecnt"
              item="package"
            />

            <div className="allLink">
              <Link className="toLink" to="/Shop/package">
                {" "}
                See All Packages{" "}
              </Link>
            </div>
          </div>

          {/* about us  */}

          <div className="AboutUsHome" id="about">
            <div className="ptitle">
              <h2> About Us</h2>
            </div>
            <div className="AboutUsFlex">
              <img className="AboutULogo" src={logo} />
              <div className="AboutUsText">
                {" "}
                Cillum et pariatur proident veniam eiusmod do tempor eu aliqua.
                Dolore aute qui quis reprehenderit fugiat labore est tempor
                culpa. Cillum et pariatur proident veniam eiusmod do tempor eu
                aliqua. Dolore aute qui quis reprehenderit fugiat labore est
                tempor culpa. Cillum et pariatur proident veniam eiusmod do
                tempor eu aliqua. Dolore aute qui quis reprehenderit fugiat
                labore est tempor culpa.
              </div>
            </div>
            <div className="contservces">
              <div className="contIcon">
                <span>
                  <Link className="contIconLink" to="/Shop/product">
                    <FontAwesomeIcon className="IconA" icon={faCartPlus} />
                    <span className="conTextBox">Shop</span>
                  </Link>
                </span>

                <span>
                  <Link className="contIconLink" to="WorkoutCategories">
                    <FontAwesomeIcon className="IconA" icon={faDumbbell} />
                    <span className="conTextBox"> Workouts</span>
                  </Link>
                </span>
                <span>
                  <Link className="contIconLink" to="/ArticleCategories">
                    <FontAwesomeIcon className="IconA" icon={faBlog} />
                    <span className="conTextBox">Articles</span>
                  </Link>
                </span>
              </div>
            </div>
          </div>

          {/* testemonials */}
          <div className="AboutUsHome" id="about">
            <div className="ptitle">
              <h2> Testimonials</h2>
            </div>
            <div class="pFeedback">
              {this.state.testimonials.map((item, index) => {
                return (
                  <div class="feedback1">
                    <div class="feedback">
                      <div>{item.content}</div>
                      <div class="flexfeedback">
                        <img
                          src={"http://localhost:8000/storage/" + item.image}
                        />

                        <div class="feedbackPosition">{item.name}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import logo from "./logo2.png";
import { HashLink } from "react-router-hash-link";
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/productsrecnt", {
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
          products: res.data,
        });
      });
  }

  render() {
    return (
      <div>
        <footer className="footerConter">
          <div className="flexCont">
            <div>
              <Link to="/">
                <img src={logo} className="logofooter" />
              </Link>
            </div>

            <div>
              <h4 className="footerTitles">Recent Products</h4>
              <div clasName="blockCont">
                {this.state.products.map((item, index) => (
                  <div key={index}>
                    <a
                      className="linkColor"
                      href={"/ProductDetails/" + item.id}
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="footerTitles">Company</h4>
              <div clasName="blockCont">
                <div>
                  <Link className="linkColor" to="/">
                    Home
                  </Link>
                </div>
                <div>
                  <Link className="linkColor" to="/shop/product">
                    Shop
                  </Link>
                </div>
                <div>
                  <Link className="linkColor" to="/ArticleCategories">
                    Articles
                  </Link>
                </div>
                <div>
                  <Link className="linkColor" to="/WorkoutCategories">
                    Workouts
                  </Link>
                </div>
                <div>
                  {/* <RBS.Nav.Link href="/#about">About Us</RBS.Nav.Link> */}
                  <HashLink className="linkColor" to="/#about">
                    About Us{" "}
                  </HashLink>
                </div>
                <div>
                  <Link className="linkColor" to="/Contact">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h4 className="footerTitles">Contact Us </h4>
              <div clasName="blockCont">
                <div className="contactdets">
                  <FontAwesomeIcon
                    className="mapI"
                    icon={faMapMarkerAlt}
                    style={{
                      color: "white",
                      "font-size": "20px",
                      marginTop: "3px",
                    }}
                  />
                  Beirut,Lebanon
                </div>
                <div className="contactdets">
                  <FontAwesomeIcon
                    className="mapI"
                    icon={faPhone}
                    style={{
                      color: "white",
                      "font-size": "20px",
                      marginTop: "3px",
                    }}
                  />
                  +96171425222
                </div>
                <div className="contactdets">
                  <FontAwesomeIcon
                    className="mapI"
                    icon={faEnvelope}
                    style={{
                      color: "white",
                      "font-size": "20px",
                      marginTop: "3px",
                    }}
                  />
                  Email: supplements.spot@gmail.com
                </div>
              </div>
            </div>
          </div>

          <hr style={{ borderWidth: "2px", borderColor: "gray" }}></hr>

          <div className="footercenterBotom">
            <div className="Socialdiv">
              <span className="socialMediaBtn">
                <a
                  style={{
                    color: "white",
                    textDecorationStyle: "none",
                    outline: "none",
                  }}
                  href="https://instagram.com/supplementsspot?igshid=1gp42yz3gvcs1"
                >
                  {" "}
                  <FontAwesomeIcon
                    className="sic"
                    icon={faInstagram}
                    style={{
                      color: "white",
                      "font-size": "25px",
                      marginTop: "3px",
                      marginRight: "5px",
                    }}
                  />
                  <span> Follow Us </span>
                </a>
              </span>
            </div>

            <div classname="copyRight">&#169; copyright 2021</div>
          </div>
        </footer>
      </div>
    );
  }
}

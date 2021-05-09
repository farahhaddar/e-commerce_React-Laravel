import React, { Component } from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
    };
  }

  componentDidMount() {
    fetch(this.props.url, {
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
          card: res.data,
        });
      });
  }

  addToCart = (itemId) => {
    let user_id = 1;
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("package_id", itemId);
    formData.append("quantity", 1);
    fetch("http://localhost:8000/api/cartPackage", {
      method: "post",
      body: formData,
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(formData);
        // this.componentDidMount();
      });
  };

  render() {
    return (
      <div>
        <section className="main-section">
          {this.state.card.map((item, index) => (
            <div key={index} className="card1">
              <div className="card-item">
                <Link className="CardLINK" to={"/ProductDetails/" + item.id}>
                  {/* <Link className="CardLINK" to={{ pathname: "/ProductDetails",state: { productId:item.id }}}>  */}

                  <div className="CardDiv">
                    <img
                      className="cardimg"
                      src={"http://localhost:8000/storage/" + item.image}
                    />
                  </div>

                  <div className="itemName"> {item.name}</div>

                  <div className="Picetitle">
                    {" "}
                    Price:
                    <span className="itemPrice"> {item.price}</span>
                    <span className="priceCurncy"> L.L</span>
                  </div>
                </Link>

                <hr className="hr" />

                <div className="red">
                  <div className="Flexbtn">
                    <div
                      onClick={() => {
                        this.addToCart(item.id);
                      }}
                      className="cartAddCont"
                    >
                      <FontAwesomeIcon className="cartAdd" icon={faCartPlus} />

                      <span className="Add"> Add To Cart </span>
                    </div>

                    <div>
                      <Link className="dets" to={"/ProductDetails/" + item.id}>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

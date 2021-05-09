import React, { Component } from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const token = localStorage.getItem("tokenUser");
const user_id = localStorage.getItem("user");
let max = 0;
let quant = 0;
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
      maxQuantity: 5,
      quantityCart: 0,
    };
  }

  componentDidMount() {
    console.log(this.props.url);
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
        console.log(res);
        this.setState({
          card: res.data,
        });
      });
  }

  getCardQuantity = (itemId) => {
    let url;
    if (this.props.item == "package")
      url = `http://localhost:8000/api/package/${itemId}`;

    if (this.props.item == "product")
      url = `http://localhost:8000/api/product/${itemId}`;
    // console.log(this.props.url + "/" + itemId);
    fetch(url, {
      method: "get",
      // body: formData,
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.quantity);
        max = res.quantity;
        this.setState({ maxQuantity: res.quantity });
        // this.componentDidMount();
      });
  };

  getCartQuantity = async (userId, itemId) => {
    if (this.props.item == "package")
      return fetch(
        `http://localhost:8000/api/cartPackages?user_id=${userId}&package_id=${itemId}`,
        {
          method: "get",
          // body: formData,
          headers: {
            // Accept: "application/json",
            // Authorization: "Bearer " + token,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res && res[0]) {
            max = res[0].packages.quantity;
            quant = res[0].quantity;
            this.setState({
              quantityCart: res[0].quantity,
              maxQuantity: res[0].packages.quantity,
            });
            console.log(res);
          } else {
            // max = -1;
            quant = 0;
            this.setState({
              quantityCart: 0,
              //   maxQuantity: -1,
            });
            console.log(res);
          }
          // console.log(res[0].quantity);
          // console.log(res[0].packages.quantity);
        });

    if (this.props.item == "product")
      return fetch(
        `http://localhost:8000/api/cartProducts?user_id=${userId}&product_id=${itemId}`,
        {
          method: "get",
          // body: formData,
          headers: {
            // Accept: "application/json",
            // Authorization: "Bearer " + token,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res && res[0]) {
            max = res[0].products.quantity;
            quant = res[0].quantity;
            this.setState({
              quantityCart: res[0].quantity,
              maxQuantity: res[0].products.quantity,
            });
            console.log(res);
          } else {
            // max = -1;
            quant = 0;
            this.setState({
              quantityCart: 0,
              //   maxQuantity: -1,
            });
            console.log(res);
          }
          // console.log(res[0].quantity);
          // console.log(res[0].packages.quantity);
        });
  };

  addToCart = async (itemId) => {
    // let user_id = 1;
    if (user_id) {
      this.getCardQuantity(itemId);
      await this.getCartQuantity(user_id, itemId);
      console.log(this.state.maxQuantity);
      console.log(this.state.quantityCart);
      await console.log(max, quant);
      if (
        this.state.maxQuantity >= this.state.quantityCart &&
        max > quant &&
        max > 0
      ) {
        toast.info("Added to cart!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        let formData = new FormData();
        if (this.props.item == "product") {
          formData.append("user_id", user_id);
          formData.append("product_id", itemId);
          formData.append("quantity", 1);
          fetch("http://localhost:8000/api/cartProduct", {
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
        }
        if (this.props.item == "package") {
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
        }
      } else {
        toast.error("No more items", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Please Login First", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(this.props);
      this.props && this.props.SetOpen && this.props.SetOpen(!this.props.open);
    }
  };

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <section className="main-section">
          {this.state.card.map((item, index) => (
            <div key={index} className="card1">
              <div className="card-item">
                {this.props.item == "product" ? (
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
                ) : (
                  <Link className="CardLINK" to={"/PackageDetails/" + item.id}>
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
                )}

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
                      {this.props.item == "product" ? (
                        <Link
                          className="dets"
                          to={"/ProductDetails/" + item.id}
                        >
                          Details
                        </Link>
                      ) : (
                        <Link
                          className="dets"
                          to={"/PackageDetails/" + item.id}
                        >
                          Details
                        </Link>
                      )}
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

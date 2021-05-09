import React, { Component } from "react";
import "./ProductDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "../PackageDetails/node_modules/react-toastify/dist/ReactToastify.css";
var disabled = "";

const token = localStorage.getItem("tokenUser");
const user_id = localStorage.getItem("user");
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
      count: 1,
      disable: "",
      disableAdd: "",
      TotalPrice: 0,
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.id;

    fetch("http://localhost:8000/api/product/" + productId, {
      method: "GET",
      // body: formData,
      // headers: {
      //   Accept: "application/json",
      //   Authorization: "Bearer " + token,
      // },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.quantity == 1) this.setState({ disableAdd: "disable" });
        this.setState({
          card: res,
        });
        this.setState({
          TotalPrice: res.price,
        });
      });
  }

  onclick(type) {
    this.setState((prevState) => {
      return {
        count: type == "add" ? prevState.count + 1 : prevState.count - 1,
      };
    });

    if (this.state.count >= this.state.card.quantity - 1 && type == "add") {
      this.setState({ disableAdd: "disable", count: this.state.card.quantity });
    } else {
      this.setState({ disableAdd: "" });
    }
    if (this.state.count < 0 || (this.state.count == 1 && type == "sub")) {
      this.setState({ disable: "disable", count: 0 });

      if (this.state.count < 0 || this.state.count == 1) {
        this.setState({ TotalPrice: 0 });
      }
    } else {
      if (type == "sub") {
        this.setState({
          TotalPrice: this.state.TotalPrice - this.state.card.price,
        });
      } else {
        this.setState({
          TotalPrice: this.state.TotalPrice + this.state.card.price,
        });

        this.setState({ disable: "" });
      }
    }
  }
  addToCart = (itemId) => {
    console.log(itemId);
    // let user_id = 1;
    console.log(this.state.count);
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", itemId);
    formData.append("quantity", this.state.count);
    formData.append("_method", "PUT");
    fetch("http://localhost:8000/api/updateProduct", {
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

  // bugs : 1 mobile trans  compounent did mount ,footer links
  // feature add to cart
  // Home page.

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="containerProduct">
          <div className="card2">
            {/* image start */}
            <div className="shoeBackground">
              <img
                className="shoe show"
                style={{ height: "475px" }}
                src={"http://localhost:8000/storage/" + this.state.card.image}
                alt=""
              />
            </div>
            {/* imagee end */}

            <div className="infoCARD">
              <div className="ProductName">
                <div>
                  <h1 className="big">{this.state.card.name}</h1>
                </div>
              </div>
              <div className="descriptionProduct">
                <h3 className="titlePoduct">Product Info</h3>
                <p className="textProduct">{this.state.card.description}</p>
              </div>
              <div className="color-container">
                <h3 className="titlePoduct">Quantity In Store: </h3>
                <div className="QntyDiv">
                  <span className="Qnty">{this.state.card.quantity}</span>
                  <span className="itemQt"> Items </span>
                </div>
              </div>
              <div className="color-container">
                <h3 className="titlePoduct">Quantity To Buy: </h3>
                <div class="qty">
                  <i
                    className={this.state.disable}
                    onClick={this.onclick.bind(this, "sub")}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faMinus} />
                  </i>

                  <span id="numbered" class="number">
                    {this.state.count}
                  </span>
                  <i
                    onClick={this.onclick.bind(this, "add")}
                    className={this.state.disableAdd}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                </div>
              </div>

              <div className="buy-price">
                <div className="price">
                  <h1>{this.state.TotalPrice}</h1>
                  <span style={{ color: "#fdc930" }}> L.L</span>
                </div>
                <br />

                <div>
                  <Link
                    onClick={() => {
                      this.addToCart(this.state.card.id);
                      toast.info("Added to cart", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }}
                    className="buy"
                    to="#"
                  >
                    <i>
                      {" "}
                      <FontAwesomeIcon icon={faCartPlus} />
                    </i>{" "}
                    Add to card{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ProductDetails);

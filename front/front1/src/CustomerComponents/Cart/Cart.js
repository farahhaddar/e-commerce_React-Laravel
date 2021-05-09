import React, { Component, lazy, Suspense } from "react";
import "./Cart.css";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
// import "../PackageDetails/node_modules/react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/core";
import { Wrap } from "./Style.js";

let checkout = () => <></>;
const token = localStorage.getItem("tokenUser");
const user_id = localStorage.getItem("user");
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      loading: true,
      cartPackage: [],
      role: "",
      show: false,
      checked: false,
    };
  }
  componentDidMount() {
    this.setState({
      loading: false,
    });
    fetch(`http://localhost:8000/api/cartProducts?user_id=${user_id}`, {
      method: "GET",
      // body: formData,
      headers: {
        "Cache-Control": "no-cache",
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({
          cart: res,
          loading: false,
        });
      });

    fetch(`http://localhost:8000/api/cartPackages?user_id=${user_id}`, {
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
          cartPackage: res,
        });
      });
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  checkoutPage = async (e) => {
    checkout = await lazy(() => import("../checkout/checkout"));
  };

  handleInputChange = (e) => {
    console.log(e.target.getAttribute("data"));
    let index = e.target.getAttribute("data");
    let product_id = e.target.getAttribute("productId");
    let quantity = e.target.value;
    console.log(e.target.value);
    console.log(this.state.cart[index].quantity);
    this.state.cart[index].quantity = quantity;
    this.setState({ role: "" });

    /*
     */
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", product_id);
    formData.append("quantity", quantity);
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
    // this.componentDidMount();
  };
  handleInputChangePackage = (e) => {
    console.log(e.target.getAttribute("data"));
    let index = e.target.getAttribute("data");
    let package_id = e.target.getAttribute("packageId");
    let quantity = e.target.value;
    console.log(e.target.value);
    console.log(this.state.cartPackage[index].quantity);
    this.state.cartPackage[index].quantity = quantity;
    this.setState({ role: "" });

    /*
     */
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("package_id", package_id);
    formData.append("quantity", quantity);
    formData.append("_method", "PUT");
    fetch("http://localhost:8000/api/updatePackage", {
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
    // this.componentDidMount();
  };

  handleCheck = () => {
    console.log(this.state.checked);
    this.setState({ checked: !this.state.checked });
  };

  deleteProduct(e) {
    fetch("http://localhost:8000/api/cartProduct/" + e, {
      method: "delete",
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
  }
  deletePackage(e) {
    fetch("http://localhost:8000/api/cartPackage/" + e, {
      method: "delete",
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
  }
  render() {
    // if (this.state.cart != "") alert(this.state.cart[0].quantity);
    console.log(this.state.cart);
    let total = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      total += this.state.cart[i].quantity * this.state.cart[i].products.price;
    }
    for (let i = 0; i < this.state.cartPackage.length; i++) {
      total +=
        this.state.cartPackage[i].quantity *
        this.state.cartPackage[i].packages.price;
    }
    return (
      <div class="small-container cart-page">
        <Wrap
          fluid="lg"
          style={{
            height: "100%",
            backgroundImage: "linear-gradient(to bottom right, white, white)",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
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
          <table>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>

            {!this.state.loading ? (
              this.state.cart &&
              this.state.cart.map((item, index) => (
                <tr>
                  <td>
                    <div class="cart-info">
                      <img
                        src={`http://localhost:8000/storage/${item.products.image}`}
                        alt=""
                      />
                      <div>
                        <p>
                          <b>{item.products.name}</b>
                        </p>
                        {/* <small>Price: {item.products.price}</small> */}
                        {/* <Button
                        xs
                        onClick={() => {
                          console.log(item.id);
                          this.deleteProduct(item.id);
                          toast.info("Removed successfully!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }}
                      >
                        <a>Remove</a>
                      </Button> */}
                      </div>
                    </div>
                  </td>
                  <td>{item.products.price}</td>
                  <td>
                    <input
                      key="index"
                      type="number"
                      name="quantity"
                      defaultValue={item.quantity}
                      max={item.products.quantity}
                      min="1"
                      productId={item.product_id}
                      data={index}
                      onChange={this.handleInputChange}
                      // style={{
                      //   backgroundColor: "rgb(83, 124, 236)",
                      //   color: "red",
                      // }}
                    />
                    <span style={{ marginLeft: "5%" }}> {item.quantity}</span>
                  </td>
                  <td>
                    {item.products.price * item.quantity}
                    <Button
                      style={{ marginLeft: "5%", color: "white !important" }}
                      onClick={() => {
                        this.deleteProduct(item.id);
                        toast.info("Removed successfully!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    >
                      <span> x</span>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <ClipLoader
                color={"#ffffff"}
                loading={this.state.loading}
                css={css`
                  display: block;
                  margin: 0 auto;
                  border-color: red;
                `}
                size={150}
              />
            )}
            {this.state.cartPackage.map((item, index) => (
              <tr>
                <td>
                  <div class="cart-info">
                    <img src="images/buy-1.jpg" alt="" />
                    <div>
                      <p>{item.packages.name}</p>
                      {/* <small>Price: {item.products.price}</small> */}
                      <Button
                        xs
                        onClick={() => {
                          console.log(item.id);
                          this.deletePackage(item.id);
                          toast.info("Removed successfully!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }}
                      >
                        <a>Remove</a>
                      </Button>
                    </div>
                  </div>
                </td>
                <td>{item.packages.price}</td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={item.quantity}
                    max={item.packages.quantity}
                    min="1"
                    packageId={item.package_id}
                    data={index}
                    onChange={this.handleInputChangePackage}
                  />
                  <span style={{ marginLeft: "5%" }}> {item.quantity}</span>
                </td>
                <td>
                  {item.packages.price * item.quantity}
                  <Button
                    style={{ marginLeft: "5%" }}
                    onClick={() => {
                      this.deletePackage(item.id);
                      toast.info("Removed successfully!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }}
                  >
                    <span> x</span>
                  </Button>
                </td>
              </tr>
            ))}
          </table>
          <div class="total-price">
            <table>
              <tr>
                <td>Subtotal</td>
                <td>{total}</td>
              </tr>
            </table>

            <Button
              xs
              disabled={
                this.state.cart.length == 0 &&
                this.state.cartPackage.length == 0
                  ? true
                  : false
              }
              onClick={() => {
                this.handleShow();

                // console.log(item.id);
                // this.deleteProduct(item.id);
              }}
            >
              <a>Proceed to Checkout</a>
            </Button>

            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              animation={false}
            >
              <Modal.Header
                style={{ backgroundColor: "rgb(83, 124, 236)" }}
                closeButton
              >
                <Modal.Title>Returns And Exchanges</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ maxHeight: "50vh", overflow: "auto" }}>
                <li>
                  <b>14 Day Returns</b>
                </li>
                <p>
                  Our goal is to make sure every customer is 100% satisfied with
                  their purchase. That’s why we offer a complete satisfaction
                  guarantee every product we sell. If you’re not happy with the
                  product we’ll gladly accept it back. Once we have the product
                  back, you’ll have the option of exchanging for another product
                </p>
                <li>
                  {" "}
                  <b>No “Restocking” Fees</b>
                </li>
                <p>
                  Most companies charge a “restocking fee” to customers that
                  return or exchange a product. We’ve seen these fees as high as
                  35% of the product purchase price. This practice is to
                  discourage customers for sending product back. We never charge
                  restocking fees on ANY returns or exchanged product.
                </p>
                <li>
                  <b>Unopened Products</b>
                </li>
                <p>
                  If the product you want to send back is unopened and in
                  saleable condition we’ll gladly take it back. You will be
                  responsible for shipping the product back to us. Our Customer
                  support team can help you with shipping. Once the product is
                  received, we’ll process the return for you in approx. 24-48
                  hours.
                </p>
                <li>
                  <b>Opened Products</b>
                </li>
                <p>
                  No returns allowed on any opened product unless it’s
                  defective.
                </p>
                <li>
                  <b>Defective Products</b>
                </li>
                <p>
                  If there’s a problem with your product please contact our
                  Customer support team immediately. We’ll dispatch a driver to
                  pick up the defective product or mail you a return label to
                  put on your box and return to us. Once the package is in
                  transit we’ll go ahead and ship you a replacement, issue you a
                  store credit or give you a full refund of the product price.
                </p>
                <li>
                  <b>Returns FAQ</b>
                </li>
                <p>
                  How long does it take my return to be processed? The time it
                  takes a product to arrive back in our warehouse will depend on
                  your location. Once it has arrived the return will be
                  processed in 24-48 hours.
                </p>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  defaultChecked={this.state.checked}
                />
                I agree to the{" "}
                <span style={{ color: "rgb(83, 124, 236)" }}>
                  Terms and Conditions
                </span>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (this.state.checked) {
                      this.handleClose();
                      window.location.href = "/checkout";
                      // <checkoutPage />;
                    } else
                      toast.error("Please Check the terms and conditions", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                  }}
                >
                  Continue
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Wrap>
      </div>
    );
  }
}

export default Cart;

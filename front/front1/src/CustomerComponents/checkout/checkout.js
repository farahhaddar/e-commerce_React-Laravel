import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  Card,
  Container,
  Row,
  Button,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import { css } from "@emotion/core";
import { ToastContainer, toast } from "react-toastify";

import Zoom from "react-reveal/Zoom";
import Rotate from "react-reveal/Rotate";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// import "./ArticleStyle.css";
import { Wrap } from "./Style.js";
// import image from "./price2.jpg";
import ClipLoader from "react-spinners/ClipLoader";

export default function Checkout(props) {
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderPackages, setOrderPackages] = useState([]);
  const [name, setName] = useState("");
  const [cities, setCities] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [loading, setLoading] = useState(false);

  //To Send
  const [city, setCity] = useState(0);
  const [updateName, setUpdateName] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const [Total, setTotal] = useState(0);
  // const [FinalTotal, setFinalTotal] = useState(0);

  let FinalTotal = 0;
  let City = [];
  City.push(
    <option value={-2} selected>
      Select location
    </option>
  );
  const history = useHistory();
  const token = localStorage.getItem("tokenUser");
  const user_id = localStorage.getItem("user");
  // console.log(user_id);
  useEffect(() => {
    let total = 0;
    try {
      fetch(`http://localhost:8000/api/cartProducts?user_id=${user_id}`, {
        method: "get",
        headers: {
          // Accept: "application/json",
          // Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          // if (json.status == 200) {
          console.log(json);
          setOrderProducts(json);

          for (let i = 0; i < json.length; i++) {
            total += json[i].quantity * json[i].products.price;
          }
          setTotal(total);
          // }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(`http://localhost:8000/api/cartPackages?user_id=${user_id}`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          // if (json.status == 200) {
          console.log(total);
          setOrderPackages(json);
          for (let i = 0; i < json.length; i++) {
            total += json[i].quantity * json[i].packages.price;
          }
          setTotal(total);
          // }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(`http://localhost:8000/api/user/user/${user_id}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == "Not authorized") {
            localStorage.removeItem("user");
            localStorage.removeItem("tokenUser");
            alert("The session expired please login again !");
            window.location.replace("/");
          }
          if (json.status == 200) {
            console.log(json);
            setName(json.data.name);
            setUpdateName(json.data.name);
            console.log(json.data);
            setAddress(json.data.adress);
            // setOrderPackages(json);

            // setTotal(total);
          }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch("http://localhost:8000/api/cities/1000", {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          // if (json.status == 200) {
          setCities(json.data);
          // setOrderPackages(json);

          // setTotal(total);

          console.log(json.data[0].id);
          // setCity(json.data[0].id);
          // setShipping()

          // }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      console.log(city)
      if(city!=0)
      fetch(`http://localhost:8000/api/city/${city}`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
          // console.log(json);
          setCity(json.id);
          setShipping(json.delivery_fees);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [city]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
    console.log(city);
  };
  const handleChangeName = (e) => {
    console.log(e.target.value);
    setUpdateName(e.target.value);
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const handleComment = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };
  //Place Order
  const submit = async () => {
    //'address', 'comment', 'price', 'city_id', 'user_id',

    if (city == 0)
      return toast.error("Please choice a city", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("address", address);
    formData.append("comment", comment);
    formData.append("price", FinalTotal);
    formData.append("city_id", city);
    formData.append("name", updateName);

    // formData.append("_method", "PUT");
    let order_id = 0;
    try {
      fetch(`http://localhost:8000/api/user/Orders`, {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then(async (json) => {
          console.log(json);
          if (json.status == 200) {
            // console.log(json);
            // setCity(json.id);
            // setShipping(json.delivery_fees);
            // }
            order_id = json.id;

            //Save To order Products

            if (orderProducts[0] != undefined) {
              for (let i = 0; i < orderProducts.length; i++) {
                if (
                  orderProducts[i].quantity <=
                  orderProducts[i].products.quantity
                ) {
                  // if (!loading) setLoading(true);

                  let formData2 = new FormData();
                  formData2.append("quantity", orderProducts[i].quantity);
                  formData2.append("product_id", orderProducts[i].product_id);
                  formData2.append("order_id", order_id);
                  // console.log(
                  //   orderProducts[i].product_id,
                  //   orderProducts[i].quantity
                  // );
                  try {
                    fetch(`http://localhost:8000/api/OrderProducts`, {
                      method: "post",
                      headers: {
                        // Accept: "application/json",
                        // Authorization: "Bearer " + token,
                      },
                      body: formData2,
                    })
                      .then((res) => res.json())
                      .then((json) => {
                        console.log(json);
                        if (json.status == 200) {
                          //user id
                          try {
                            fetch(
                              `http://localhost:8000/api/destroyByUserIdPro/${user_id}`,
                              {
                                method: "delete",
                                headers: {},
                              }
                            )
                              .then((res) => res.json())
                              .then((json) => {
                                console.log(json);
                              });
                          } catch (e) {}
                          try {
                            fetch(
                              `http://localhost:8000/api/user/decrementQuantityPro/${orderProducts[i].product_id}/${orderProducts[i].quantity}`,
                              {
                                method: "post",
                                headers: {
                                  Accept: "application/json",
                                  Authorization: "Bearer " + token,
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((json) => {
                                console.log(json);
                              });
                          } catch (e) {}
                        }
                      });
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  toast.info("There is no more items", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              }
            }
            //Save To order Packages

            if (orderPackages[0] != undefined) {
              for (let i = 0; i < orderPackages.length; i++) {
                if (
                  orderPackages[i].quantity <=
                  orderPackages[i].packages.quantity
                ) {
                  // if (!loading) setLoading(true);

                  let formData3 = new FormData();
                  formData3.append("quantity", orderPackages[i].quantity);
                  formData3.append("package_id", orderPackages[i].package_id);
                  formData3.append("order_id", order_id);
                  // console.log(
                  //   orderPackages[i].product_id,
                  //   orderPackages[i].quantity
                  // );

                  //http://localhost:8000/api/user/decrementQuantityPack/1/2

                  try {
                    fetch(`http://localhost:8000/api/OrderPackages`, {
                      method: "post",
                      headers: {},
                      body: formData3,
                    })
                      .then((res) => res.json())
                      .then((json) => {
                        console.log(json);
                        if (json.status == 200) {
                          //user id
                          try {
                            fetch(
                              `http://localhost:8000/api/destroyByUserIdPack/${user_id}`,
                              {
                                method: "delete",
                                headers: {},
                              }
                            )
                              .then((res) => res.json())
                              .then((json) => {
                                console.log(json);
                              });
                          } catch (e) {}
                          try {
                            fetch(
                              `http://localhost:8000/api/user/decrementQuantityPack/${orderPackages[i].package_id}/${orderPackages[i].quantity}`,
                              {
                                method: "post",
                                headers: {
                                  Accept: "application/json",
                                  Authorization: "Bearer " + token,
                                },
                              }
                            )
                              .then((res) => res.json())
                              .then((json) => {
                                console.log(json);
                              });
                          } catch (e) {}
                        }
                      });
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  return toast.error(
                    "There is no more items",
                    {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      onClose: () => (window.location.href = "/cart"),
                      draggable: true,
                      progress: undefined,
                    }
                    // (window.location.href = "/shop")
                  );
                  // setInterval(function () {
                  //   window.location.href = "/";
                  // }, 500);
                }
              }
            }

            toast.info("Your Order has been added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              onOpen: () =>
                setInterval(function () {
                  if (!loading) setLoading(true);
                  window.location.href = "/";
                }, 3000),

              draggable: true,
              progress: undefined,
            });
            // setInterval(function () {
            //   if (!loading) setLoading(true);
            // }, 1000);

            // setInterval(function () {
            //   window.location.href = "/";
            // }, 3000);

            // history.goBack();
          } else {
            console.log(json);
            // console.log(json.error.message[Object.keys(json.error.message)][0]);
            json &&
              json.error &&
              toast.error(
                json.error.message[Object.keys(json.error.message)][0],
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (cities)
    if (cities[0] != undefined) {
      for (let i = 0; i < cities.length; i++) {
        City.push(<option value={cities[i].id}>{cities[i].name}</option>);
      }
    }
  console.log(City);
  FinalTotal = Total + shipping;
  return !loading ? (
    <Suspense
      fallback={
        <ClipLoader
          color={"#ffffff"}
          loading={true}
          css={css`
            display: block;
            margin: 0 auto;
            border-color: red;
          `}
          size={150}
        />
      }
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
      <Wrap
        fluid="lg"
        style={{
          height: "100%",
          backgroundImage: "linear-gradient(to bottom right, #f5f5f5, #f5f5f5)",
          padding: "5%",
        }}
      >
        <div style={{ display: "flex", margin: "auto" }} id="cont">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              // textAlign: "center",
              margin: "auto",
            }}
          >
            <h1 style={{}}>
              <strong>Billing details</strong>
            </h1>
            <div style={{ display: "flex", flexDirection: "column" }} id="div1">
              <label>Name</label>
              <Form.Control
                as="input"
                custom
                id="assign"
                defaultValue={name}
                style={{ maxWidth: "50%" }}
                onChange={handleChangeName}
              ></Form.Control>

              {/* <label>
              Last Name
              <Form.Control as="input" custom id="assign"></Form.Control>
            </label> */}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }} id="div1">
              <label>City</label>
              <Form.Control
                as="select"
                custom
                id="city"
                onChange={handleChange}
                style={{ maxWidth: "50%" }}
              >
                {City}
              </Form.Control>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }} id="div1">
              <label>Address</label>
              <Form.Control
                as="input"
                custom
                id="assign"
                style={{ maxWidth: "50%" }}
                defaultValue={address}
                onChange={handleAddress}
              ></Form.Control>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }} id="div1">
              <label>Comment</label>
              <Form.Control
                as="input"
                custom
                id="assign"
                style={{ maxWidth: "50%" }}
                onChange={handleComment}
              ></Form.Control>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h1 style={{}}>
              <strong>Your order</strong>
            </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts &&
                  orderProducts.map((item, index) => (
                    <tr>
                      <td>{item.products.name}</td>
                      <td>{item.quantity * item.products.price}</td>
                    </tr>
                  ))}
                {orderPackages &&
                  orderPackages.map((item, index) => (
                    <tr>
                      <td>{item.packages.name}</td>
                      <td>{item.quantity * item.packages.price}</td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="1">
                    <b>Subtotal</b>
                  </td>
                  <td colSpan="1">{Total}</td>
                </tr>
                <tr>
                  <td colSpan="1">Shipping</td>
                  <td colSpan="1">{shipping}</td>
                </tr>
                <tr>
                  <td colSpan="1">Final Total</td>
                  <td colSpan="1">{FinalTotal}</td>
                </tr>
              </tbody>
            </Table>
            <p>Cash on delivery</p>
            <Button
              xs
              onClick={async () => {
                await submit();

                // console.log(item.id);
                // this.deleteProduct(item.id);
                // toast.info("Removed successfully!", {
                //   position: "top-right",
                //   autoClose: 5000,
                //   hideProgressBar: true,
                //   closeOnClick: true,
                //   pauseOnHover: true,
                //   draggable: true,
                //   progress: undefined,
                // });
              }}
            >
              Place Order
            </Button>
          </div>
        </div>
      </Wrap>
    </Suspense>
  ) : (
    <ClipLoader
      color={"#ffffff"}
      loading={true}
      css={css`
        display: block;
        margin: 0 auto;
        border-color: red;
      `}
      size={150}
    ></ClipLoader>
  );
}

//location.aboutProps.id

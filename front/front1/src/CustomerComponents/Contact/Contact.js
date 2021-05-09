import React, { useEffect, useState } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Background from "../../assets/recovery.jpeg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Wrap } from "./Style.js";
import * as emailjs from "emailjs-com";
import Toastify from "toastify-js";
import "./style.css";
import { Redirect } from "react-router-dom";
import { RiAccountCircleFill, RiFacebookCircleLine } from "react-icons/ri";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineInstagram,
} from "react-icons/ai";
export default function Contact() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');

  // const [subject, setSubject] = useState('');
  // const [message, setMessage] = useState('');
  const [info, setInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   try {
  //     window.scrollTo(0, 0);

  //     fetch("http://localhost:8000/api/workoutCategories", {
  //       method: "get",
  //       headers: {},
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         console.log(json);
  //         if (json.status == 200) {
  //           console.log(json.data);
  //           SetWorkoutCategories(json.data.data);
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(info.name);
    const templateParams = {
      // from_name: "q",
      // from_email: "hseinmoussa98@gmail.com",
      // to_name: "alo",
      // subject: "qq",
      // message_html: "hii",
      from_name: info.name,
      from_email: info.email,
      to_name: info.email,
      subject: info.subject,
      message: info.message,
    };
    window.scrollTo(0, 0);

    emailjs
      .send(
        "service_yckftmc",
        "template_qh9axfk",
        templateParams,
        "user_l0cVBcuhWiORRFs3nyg45"
      )
      .then(
        function (response) {
          console.log("ok");

          Toastify({
            text: "Your message has successfully sent!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "blue",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () {}, // Callback after click
          }).showToast();

          //   toast.success("Your message has successfully sent!", {
          //     position: toast.POSITION.BOTTOM_CENTER
          //   });
          //   console.log("SUCCESS!", response.status, response.text);
          // },
        },
        function (err) {
          Toastify({
            text: "Your message was not able to be sent!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "red",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () {}, // Callback after click
          }).showToast();
        }
      );
    resetForm();
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setInfo({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {" "}
      <Fade bottom>
        <Wrap
          fluid="lg"
          className="section-inner-banner top"
          // style="background-image:url(http://fitnesszoneapi.koeinbeta.com/Content/Uploads/Miscellaneous/touch-on-banner.png);"
          style={{
            color: "white",
            margin: "auto",
            marginBottom: "10%",
          }}
        >
          <div class="m-auto">
            <div>
              <div class="row">
                <div class="col-12 align-self-center">
                  <div class="heading m-auto text-center">
                    <p>Let's Hear From You</p>
                    <h1 className="text-center">
                      <strong>Contact Us</strong>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </Fade>
      <Fade right>
        <div style={{ margin: "0 2% 5% 5% " }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ textAlign: "center" }}>
                <b>Instagram</b>
              </p>{" "}
              <a
                href="https://www.instagram.com/supplementsspot/"
                target="_blank"
                style={{ color: "#537cec" }}
              >
                <AiOutlineInstagram style={{ fontSize: "5em" }} />
              </a>
            </div>
            <div>
              <p style={{ textAlign: "center" }}>
                <b>Phone</b>
              </p>{" "}
              <a
                href="https://api.whatsapp.com/send?phone=+96171425222"
                target="_blank"
                style={{ color: "#537cec" }}
              >
                <AiOutlinePhone style={{ fontSize: "5em" }} />
              </a>
            </div>
            <div>
              <p style={{ textAlign: "center" }}>
                <b>Email</b>
              </p>{" "}
              <a
                href="mailto:supplements.spot@gmail.com"
                target="_blank"
                style={{ color: "#537cec" }}
              >
                <AiOutlineMail style={{ fontSize: "5em" }} />
              </a>
            </div>
          </div>
        </div>
      </Fade>
      <Wrap fluid="lg" className="contact" id="contact">
        <div className="">
          <div className="content">
            <Fade left>
              <div className="box form wow slideInLeft">
                <form>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onChange={handleChange}
                    value={info.name}
                  />
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleChange}
                    value={info.email}
                  />
                  <input
                    type="text"
                    placeholder="Enter Subject"
                    name="subject"
                    onChange={handleChange}
                    value={info.subject}
                  />
                  <textarea
                    placeholder="Enter Message"
                    name="message"
                    onChange={handleChange}
                    value={info.message}
                  ></textarea>
                  <button type="submit" onClick={handleSubmit}>
                    Send Message
                  </button>
                </form>
              </div>
            </Fade>
            <Fade right>
              <div className="box text wow slideInRight">
                <h2>Get Connected with Gym</h2>
                <p className="title-p">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
                <div className="info">
                  <ul>
                    <li>
                      <span className="fa fa-map-marker"></span> Beirut,Lebanon
                    </li>
                    <li>
                      <span className="fa fa-phone"></span> +961 71 425 222
                    </li>
                    <li>
                      <span className="fa fa-envelope"></span>{" "}
                      supplements.spot@gmail.com
                    </li>
                  </ul>
                </div>
                <div className="social">
                  <a
                    target="_blank"
                    href="https://www.instagram.com/supplementsspot/"
                  >
                    <span className="fa fa-instagram"></span>
                  </a>
                  {/* <a href="">
                    <span className="fa fa-instagram"></span>
                  </a>

                  <a href="">
                    <span className="fa fa-youtube-play"></span>
                  </a> */}
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </Wrap>
    </div>
  );
}

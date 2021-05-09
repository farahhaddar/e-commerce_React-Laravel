import React, { Component } from "react";
import "./Testimonials.css";
import { Modal } from "react-bootstrap";
const token = localStorage.getItem("token");
const id = localStorage.getItem("Admin");
class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 3,
      show: false,
      testimonials: [],
      testimonialsId: "",
      testimonialsEdited: "",
      name: "",
      content: "",
      image: "",
      id: " ",
    };
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/testimonials/" + this.state.rows, {
      headers: {
        //   Accept: "application/json",
        //   Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) =>
        this.setState({ testimonials: JSON.parse(res).data.data })
      );
  }
  updateFeedback(e) {
    this.setState({ show: !this.state.show });
    fetch("http://localhost:8000/api/admin/testimonial/" + e, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        this.setState({ id: JSON.parse(res).data.id });
        this.setState({ name: JSON.parse(res).data.name });
        this.setState({ content: JSON.parse(res).data.content });
      });
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.name);
    console.log(this.state.content);
    console.log(this.state.image);
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("content", this.state.content);
    if (this.state.image != "") formData.append("image", this.state.image);
    formData.append("_method", "PUT");
    fetch("http://localhost:8000/api/admin/testimonial/" + this.state.id, {
      method: "post",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(formData);
        this.state.name = "";
        this.state.content = "";
        this.state.image = "";
        this.componentDidMount();
        this.handleModal();
      });
  };
  handleModal = () => {
    this.setState({ id: "" });
    this.setState({ name: "" });
    this.setState({ content: "" });
    this.setState({ image: "" });
    this.setState({ show: !this.state.show });
  };
  handleInputChange = (e) => {
    console.log(this.state.name);
    console.log(this.state.content);
    // console.log("a");
    // let file;
    // if (e.target.files) file = e.target.files[0];
    // console.log(file);
    this.setState({
      [e.target.name]: e.target.value,
    });
    // this.setState({
    //   image: file,
    // });
  };
  handleInputFileChange = (e) => {
    console.log("a");
    let file;
    if (e.target.files) file = e.target.files[0];
    console.log(file);
    // console.log(file);
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    this.setState({
      image: file,
    });
  };
  render() {
    console.log(this.state.name);
    console.log(this.state.testimonials);
    this.state.testimonials.map((item, index) => {
      console.log(item.name);
    });
    return (
      <div>
        <Modal
          size=""
          centered
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
        >
          <form method="post" onSubmit={this.onSubmit}>
            <Modal.Header>
              <h4>Update Testimonial</h4>
            </Modal.Header>
            <Modal.Body>
              <label className="label">
                <input
                  type="text"
                  id="name"
                  name="name"
                  aria-invalid="false"
                  className="text"
                  placeholder=""
                  defaultValue={this.state.name}
                  onChange={this.handleInputChange}
                />
                <span className="input-type"> Name </span>
              </label>
              <label className="label">
                <textarea
                  type="text"
                  id="content"
                  name="content"
                  aria-invalid="false"
                  className="text"
                  placeholder=""
                  defaultValue={this.state.content}
                  onChange={this.handleInputChange}
                />
                <span className="input-type"> Name </span>
              </label>
              <div className="input-file-div">
                <label className="image-file">Image</label>
                <label class="file-label">
                  <input
                    name="image"
                    id="image"
                    aria-invalid="false"
                    type="file"
                    className="file-input"
                    onChange={this.handleInputFileChange}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <svg
                        className="svg-inline--fa fa-upload fa-w-16"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="upload"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                        ></path>
                      </svg>
                    </span>
                    <span className="file-label pointer">
                      Select your image here
                    </span>
                  </span>
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer className="footer">
              <button className="add add-background">Add</button>
              <div
                className="add add-background"
                onClick={() => {
                  this.handleModal();
                }}
              >
                Cancel
              </div>
            </Modal.Footer>
          </form>
        </Modal>

        <div class="pFeedback">
          {this.state.testimonials.map((item, index) => {
            return (
              <div class="feedback1">
                <div class="feedback">
                  <div>{item.content}</div>
                  <div class="flexfeedback">
                    <img src={"http://localhost:8000/storage/" + item.image} />

                    <div class="feedbackPosition">{item.name}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    this.updateFeedback(item.id);
                  }}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Testimonials;

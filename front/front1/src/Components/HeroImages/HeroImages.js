import React, { Component } from "react";
import "./HeroImages.css";
import { Modal } from "react-bootstrap";
import item from "../../CustomerComponents/Crousel/item";

const token = localStorage.getItem("token");

class HeroImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      image: "",
      title: "",
      heroImages: [],
      id: 0,
    };
  }
  componentDidMount() {
    this.setState({ id: 0 });
    
    fetch("http://localhost:8000/api/imageHero", {
      headers: {
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => this.setState({ heroImages: JSON.parse(res).data }));
  }
  handleInputFileChange = (e) => {
    console.log("a");
    let file;
    if (e.target.files) file = e.target.files[0];
    // console.log(file);
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    this.setState({
      image: file,
    });
  };
  handleModal() {
    this.setState({ image: "" });
    this.setState({ id: 0 });
    this.setState({ show: !this.state.show });
  }
  openModel() {
    this.setState({ title: "New Image" });
    this.setState({ image: "" });
    this.setState({ id: 0 });
    this.setState({ show: !this.state.show });
  }
  onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", this.state.image);
    if (this.state.image != "") {
      if (this.state.id == 0)
        fetch("http://localhost:8000/api/admin/imageHero", {
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
            this.componentDidMount();
          });
      else {
        formData.append("_method", "PUT");
        fetch("http://localhost:8000/api/admin/imageHero/" + this.state.id, {
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
            this.componentDidMount();
            this.handleModal();
          });
      }
    }
  };
  updateImage = (e) => {
    this.setState({ title: "Update Image" });
    this.setState({ id: e });
    this.setState({ show: true });
  };
  deleteImage = (e) => {
    // this.setState({ id: e });
    fetch("http://localhost:8000/api/admin/imageHero/" + e, {
      method: "delete",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
  };
  render() {
    console.log(this.state.heroImages);
    console.log(this.state.image);
    return (
      <div>
        <button
          onClick={() => {
            this.openModel();
          }}
        >
          Form
        </button>
        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
        >
          <form method="post" onSubmit={this.onSubmit}>
            <Modal.Header className="modal-header">
              <h4>{this.state.title}</h4>
            </Modal.Header>
            <Modal.Body>
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
        <div class="flexProducts">
          {this.state.heroImages.map((item, index) => {
            return (
              <div class="product">
                <div>
                  <img
                    width="200px"
                    height="200px"
                    src={"http://localhost:8000/storage/" + item.image}
                  />
                </div>
                <div className="productAction">
                  <div
                    onClick={() => {
                      this.updateImage(item.id);
                    }}
                  >
                    Update
                  </div>
                  <div
                    onClick={() => {
                      this.deleteImage(item.id);
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HeroImages;

import React, { Component } from "react";
import "../Profile/profile.css";
import { Modal, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
const token = localStorage.getItem("token");


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      image: "",
      password: "",
      nameEdit: "",
      emailEdit: "",
      imageEdit: "",
      passwordEdit: "",
      show: false,
    };
    this.handleModal = this.handleModal.bind(this);
    this.editModal = this.editModal.bind(this);
    this.Submit = this.Submit.bind(this);
  }
  Submit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", this.state.imageEdit);
    formData.append("name", this.state.nameEdit);
    formData.append("email", this.state.emailEdit);
    formData.append("password", this.state.passwordEdit);
    formData.append("_method", "PUT");
    fetch("http://localhost:8000/api/admin/admin/" + this.state.id, {
      method: "post",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
    this.handleModal();
  }
  handleModal() {
    this.setState({ imageEdit: "" });
    this.setState({ show: false });
  }
  editModal() {
    this.setState({ show: true });
    this.setState({
      nameEdit: this.state.name,
      emailEdit: this.state.email,
      // imageEdit: this.state.image,
    });
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleInputFileChange = (e) => {
    let file;
    if (e.target.files) file = e.target.files[0];
    this.setState({
      imageEdit: file,
    });
  };

  componentDidMount() {
    this.state.imageEdit="";
    this.props.title("Profile");
    const data = localStorage.getItem("Admin");
    const id = JSON.parse(data);

    const url = "http://localhost:8000/api/admin/admin/" + id;

    const response = fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          image: res.data.image,
        });
      });
  }

  render() {
    const p = "http://localhost:8000/storage/" + this.state.image;
    return (
      <div>
        <Modal
          size=""
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.show}
        >
          <Modal.Header>
            <h4>Edit Your Profile</h4>
          </Modal.Header>
          <Modal.Body>
            <form method="post" onSubmit={this.Submit}>
              <label className="label">
                <input
                  type="text"
                  id="name"
                  name="nameEdit"
                  aria-invalid="false"
                  className="text"
                  placeholder=" "
                  defaultValue={this.state.name}
                  onChange={this.handleInputChange}
                />
                <span className="input-type"> Name </span>
              </label>
              <label className="label">
                <input
                  type="email"
                  id="email"
                  name="emailEdit"
                  aria-invalid="false"
                  className="text"
                  placeholder=" "
                  defaultValue={this.state.email}
                  onChange={this.handleInputChange}
                />
                <span className="input-type"> Email Address </span>
              </label>
              <label className="label">
                <input
                  type="password"
                  id="password"
                  name="passwordEdit"
                  aria-invalid="false"
                  className="text"
                  placeholder=" "
                  onChange={this.handleInputChange}
                />
                <span className="input-type"> Password </span>
              </label>

              <div className="input-file-div">
                <label className="image-file">Image</label>
                <label class="file-label">
                  <input
                    name="imageEdit"
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
              <Modal.Footer className="footer">
                <button className="add add-background">Add</button>
                <div
                  className="add add-background closePopUp"
                  onClick={() => {
                    this.handleModal();
                  }}
                >
                  Cancel
                </div>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>

        <Card className="cardProfile" style={{ height: 500, margin: "auto" }}>
          <Card.Header
            style={{
              backgroundColor: " #241f33",
              alignItems: "center",
              marginBottom: 60,
              height: 200,
              width: "100%",
            }}
          >
            <div
              className="profileImage"
              style={{ paddingTop: 70, marginBottom: 60 }}
            >
              <Card.Img
                style={{
                  width: 200,
                  height: 200,
                  border: "4px solid",
                  borderRadius: "100%",
                }}
                variant="top"
                src={p}
              />
            </div>
          </Card.Header>
          <Card.Body>
            <div className="profileInfo" style={{ paddingTop: 20 }}>
              <Card.Text style={{ fontWeight: "bold", fontSize: 30 }}>
                {" "}
                Name:
                <span style={{ fontWeight: "normal", color: "#4b3c9c" }}>
                  
                  {this.state.name}
                </span>
              </Card.Text>

              <Card.Text style={{ fontWeight: "bold", fontSize: 30 }}>
                
                Email:
                <span style={{ fontWeight: "normal", color: "#4b3c9c" }}>
                  
                  {this.state.email}
                </span>
              </Card.Text>
            </div>
            <div style={{ paddingTop: 30 }} className="button profileButton">
              <button
                onClick={this.editModal}
                className="add Adminb add-background"
              >
                {" "}
                Edit{" "}
              </button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default Profile;

// <div className="container">
//  <div className="row">
//   <div className="offset-lg-1 col-lg-12 col-sm-6 col-12 main-section text-center">
//               <div className="row">
//                 <div className="col-lg-12 col-xl-20 col-12 profile-header"></div>
//               </div>
//               <div className="row user-detail">
//                 <div className="col-lg-20 col-xl-12 col-1 pi">
//                   <img src={p} className="rounded-circle img-thumbnail"/>
//                   <h5>Name: {this.state.name} </h5>
//                   <h5>Email:{this.state.email}</h5>

//                   <div className="button">
//                     <button onClick={this.editModal} className="add Adminb add-background" >
//                       {" "}
//                      Edit{" "}
//                     </button>
//                   </div>

//               </div>
//           </div>

//       </div>
//                 </div>
//               </div>

import React, { useState, Component } from "react";
import "./ManageProject.css";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Component } from "react";
const token = localStorage.getItem("token");
class ManageProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      teams: "",
      teamsNotAssigned: "",
      rows: 1000,
    };
    this.handleInput = this.handleInput.bind(this);
    this.Submit = this.Submit.bind(this);
  }
  deleteTeamProject(e) {
    fetch(
      "http://localhost:8000/api/teamProject/" + this.props.projectId + "/" + e,
      {
        method: "delete",
        // body: formData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        this.componentDidMount();
      });
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  componentDidMount() {
    //http://localhost:8000/api/teamProjects/10?projectId=1
    fetch(
      "http://localhost:8000/api/teamProjects/" +
        this.state.rows +
        "?projectId=" +
        this.props.projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));

    fetch(
      "http://localhost:8000/api/teamsNotAssigned" +
        "?projectId=" +
        this.props.projectId,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teamsNotAssigned: JSON.parse(res) }));
  }
  handleInput(e) {
    // console.log(s);
    fetch(
      "http://localhost:8000/api/teamProjects/" +
        this.state.rows +
        "?projectId=" +
        this.props.projectId +
        "&team_name=" +
        e,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => this.setState({ teams: JSON.parse(res) }));
  }
  select() {
    alert(":");
  }
  Submit(e) {
    e.preventDefault();
    console.log(e);
    // console.log(document.getElementById("assign").value); teamId
    // this.props.projectId
    let formData = new FormData();
    formData.append("teamId", document.getElementById("assign").value);
    formData.append("projectId", this.props.projectId);
    fetch("http://localhost:8000/api/teamProject/", {
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
        this.setState({ show: false });
      });
  }
  render() {
    let teams = [];
    if (this.state.teams[0] != undefined) {
      for (let i = 0; i < this.state.teams.length; i++) {
        // teams.push(this.state.teams[i].team_name);
        teams.push(
          <div
            style={{ margin: "3px", borderRadius: "3px" }}
            className="row0 rowData "
            style={{ minHeight: "40px", margin: "3px" }}
            // key={id}
          >
            <div className="col0 col3" style={{ paddingLeft: "5px" }}>
              {this.state.teams[i].team_name}
            </div>
            <div className="col0 col3">
              <div className="action">
                <div title="Delete">
                  <FontAwesomeIcon
                    onClick={() => {
                      this.deleteTeamProject(this.state.teams[i].team_id);
                    }}
                    className="trash"
                    icon={faTrash}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    let teamsNotAssigned = [];
    if (this.state.teamsNotAssigned[0] != undefined) {
      for (let i = 0; i < this.state.teamsNotAssigned.length; i++) {
        // teamsNotAssigned.push(this.state.teamsNotAssigned[i].team_name);
        teamsNotAssigned.push(
          <option value={this.state.teamsNotAssigned[i].id}>
            {this.state.teamsNotAssigned[i].name}
          </option>
        );
      }
    }

    // teams.push("Team 1", "Team 1");
    // alert(this.props.projectId);
    // let teams = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 4", "Team 4"];
    return (
      <div className="manage-project">
        <div className="project-teams">
          <div
            className="add-project"
            onClick={() => {
              this.handleModal();
            }}
          >
            Add new team to this project
          </div>
          <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="new-team"
            show={this.state.show}
          >
            <Modal.Header centered>
              <h4>Assign New Team</h4>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.Submit}>
                {/* <Form.Group controlId="exampleForm.SelectCustom"> */}
                <Form.Label>Choose Team</Form.Label>
                <Form.Control as="select" custom id="assign">
                  {teamsNotAssigned}
                </Form.Control>
                {/* </Form.Group> */}
                <Modal.Footer className="footer">
                  <button className="add add-background">Assign</button>
                  <div
                    className="add add-background"
                    onClick={() => {
                      this.handleModal();
                    }}
                  >
                    Cancel
                  </div>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
          <div className="project-teams-tbl">
            <div>
              <div className="row1">
                <div className="col0 col3">Teams Assigned</div>
                <div className="actionTitle col0 col3">Action</div>
              </div>
            </div>
            <div className="row1">
              <div className="col0 col3 search">
                <input
                  id="search1"
                  onInput={(e) => this.handleInput(e.target.value)}
                  aria-invalid="false"
                  placeholder="Search Teams . . ."
                  type="text"
                  class="MuiInputBase-input MuiInput-input jss168"
                />
              </div>
            </div>
            <div className="scroll-part">{teams}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default ManageProject;

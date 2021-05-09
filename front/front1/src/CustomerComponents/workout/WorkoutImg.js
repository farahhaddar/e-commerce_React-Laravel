import React, { Component } from "react";
import { Player } from "video-react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import ReactPlayer from "react-player";
import Zoom from "react-reveal/Zoom";

import "./style.css";
class WorkoutImg extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      img: "",
      title: "",
    };
  }

  componentDidMount() {
    try {
      fetch(
        `http://localhost:8000/api/workoutData/${this.props.match.params.id}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data.image);
          this.setState({
            title: res.data.title,
            img: `http://localhost:8000/storage/${res.data.image}`,
          });
        });
    } catch (e) {}
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.playerSource !== prevState.playerSource) {
  //     this.player.load();
  //   }
  // }

  render() {
    const id = this.props.match.params.id;
    console.log(id);
    return (
      <Zoom>
        <div style={{ margin: "auto" }}>
          <h1
            className="text-center hh1"
            style={{
              marginBottom: "5%",
            }}
          >
            <strong>{this.state.title}</strong>
          </h1>
          <img
            // className="react-player fixed-bottom"
            src={this.state.img}
            style={{ margin: "auto", width: "90vw", height: "80vh" }}
            controls={true}
          />
        </div>
      </Zoom>
    );
  }
}

export default withRouter(WorkoutImg);

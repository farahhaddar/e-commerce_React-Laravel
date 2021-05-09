import React, { Component } from "react";
import { Player } from "video-react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import ReactPlayer from "react-player";
import Zoom from "react-reveal/Zoom";

import "./style.css";
class Workout extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      playerSource: "",
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
          console.log(res.data.video);
          this.setState({
            title: res.data.title,
            playerSource: `http://localhost:8000/storage/${res.data.video}`,
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
      <div>
        <h1 className="text-center hh1" style={{ marginBottom: "5%" }}>
          <strong>{this.state.title}</strong>
        </h1>
        <Zoom>
          <ReactPlayer
            // className="react-player fixed-bottom"
            url={this.state.playerSource}
            width="70vw"
            height="70vh"
            style={{ margin: "auto" }}
            controls={true}
          />
          {/* <video width="100%" height="100%" controls>
          <source src={this.state.playerSource} type="video/mp4" /> */}
          {/* <Player
          ref={(player) => {
            this.player = player;
          }}
          videoId="video-1"
        >
          <source src={this.state.playerSource} type="video/mp4" />
        </Player> */}
          {/* </video> */}
        </Zoom>
      </div>
    );
  }
}

export default withRouter(Workout);

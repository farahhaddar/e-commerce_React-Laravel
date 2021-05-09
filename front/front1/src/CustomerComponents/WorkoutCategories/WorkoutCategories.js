import React, { useEffect, useState } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import Rotate from "react-reveal/Rotate";
import Background from "../../assets/recovery.jpeg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Wrap } from "./Style.js";
export default function WorkoutCategories(props) {
  const [workoutCategories, SetWorkoutCategories] = useState([]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);

      fetch("http://localhost:8000/api/workoutCategories/100", {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            SetWorkoutCategories(json.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(props);
    try {
      fetch(
        `http://localhost:8000/api/workoutCategories/1000?name=${props.shared_var}`,
        {
          method: "get",
          headers: {},
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            SetWorkoutCategories(json.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [props.shared_var]);

  return (
    <>
      <Wrap
        fluid="lg"
        style={{
          height: "100%",
          backgroundImage: "linear-gradient(to bottom right, #f5f5f5, #f5f5f5)",
        }}
      >
        <Rotate top left>
          <h1 className="text-center">
            <strong>Categories Name</strong>
          </h1>
        </Rotate>
        {workoutCategories &&
          workoutCategories[0] &&
          workoutCategories.map((value, index) => {
            return (
              <Zoom>
                <Row
                  className="justify-content-md-center mb-3"
                  style={{ fontSize: "2em" }}
                >
                  <Col sm lg="11">
                    <Card
                      className="text-center"
                      style={{ width: "100%", height: "60vh" }}
                    >
                      <Card.Header style={{ backgroundColor: "#ffffff" }}>
                        {" "}
                        <h2> {value.name}</h2>
                      </Card.Header>
                      <Card.Body
                        style={{
                          backgroundImage: `url(http://localhost:8000/storage/${value.image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100%",
                          backgroundPosition: "center",
                          color: "#241f33",
                        }}
                      >
                        {/* <Card.Title> {value.name}</Card.Title> */}
                        {/* <Card.Text> {value.content}</Card.Text> */}
                      </Card.Body>
                      <Card.Footer
                        className="text-muted"
                        style={{ backgroundColor: "white" }}
                      >
                        <Button
                          style={{ backgroundColor: "white", bottom: "0" }}
                          className="btnn"
                        >
                          <Link
                            to={{
                              pathname: `/Workouts/${value.id}`,
                              aboutProps: { id: value.id },
                            }}
                          >
                            Open Category
                          </Link>
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Zoom>
            );
          })}
      </Wrap>
    </>
  );
}

//location.aboutProps.id

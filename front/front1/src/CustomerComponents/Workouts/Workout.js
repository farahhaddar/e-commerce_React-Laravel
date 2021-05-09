import React, { useEffect, useState } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import Rotate from "react-reveal/Rotate";
import Background from "../../assets/recovery.jpeg";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { Pagination } from "react-laravel-paginex";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// import "./ArticlesCat.css";
import { Wrap } from "./Style.js";
export default function WorkoutsCat(props) {
  const [WorkoutsCatImage, setWorkoutsCatImage] = useState([]);
  const [WorkoutsCatVideo, setWorkoutsCatVideo] = useState([]);

  const [Name, setName] = useState("");

  //Pagination

  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      fetch(`http://localhost:8000/api/workoutsByCatImage/${id}?page=1`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data.data);
            setWorkoutsCatImage(json.data);
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(`http://localhost:8000/api/WorkoutsCategories/${id}`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status == 200) {
            console.log(json.data.name);
            setName(json.data.name);
            // setArticlesCat(json.data.data);
          } else {
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
        `http://localhost:8000/api/workoutsByCatImage/${id}?page=1&title=${props.shared_var}`,
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
            setWorkoutsCatImage(json.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(
        `http://localhost:8000/api/workoutsByCatVideo/${id}?page=1&title=${props.shared_var}`,
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
            setWorkoutsCatVideo(json.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [props.shared_var]);

  const CapitalizeFirstLetter = (str) => {
    return  str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };

  const getData = (WorkoutsCatImage) => {
    // axios.get("getDataEndpoint?page=" + data.page).then((response) => {
    //   this.setState({ data: data });
    // });
    fetch(
      `http://localhost:8000/api/workoutsByCatImage/${id}?page=${WorkoutsCatImage.page}`,
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
          setWorkoutsCatImage(json.data);
          window.scrollTo(0, 0);
        } else {
        }
      });
  };
  const getData2 = (WorkoutsCatVideo) => {
    // axios.get("getDataEndpoint?page=" + data.page).then((response) => {
    //   this.setState({ data: data });
    // });

    fetch(
      `http://localhost:8000/api/workoutsByCatVideo/${id}?page=${WorkoutsCatVideo.page}`,
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
          setWorkoutsCatVideo(json.data);
          window.scrollTo(0, 0);
        } else {
        }
      });
  };
  const options = {
    containerClass: "pagination-container",
    prevButtonClass: "prev-button-class",
    nextButtonText: "Next Page",
  };
  return (
    <>
      <Wrap
        fluid="lg"
        style={{
          height: "100%",
          backgroundImage: "linear-gradient(to bottom right, #f5f5f5, #f5f5f5)",
        }}
      >
        <Button
          variant="link"
          onClick={() => history.goBack()}
          className="mt-4"
        >
          {" "}
          <a>&#8249; Back</a>
        </Button>
        {Name && (
          <Rotate top left>
            <h1 className="text-center" style={{ marginBottom: "5%" }}>
              <strong>{Name}</strong>
            </h1>
          </Rotate>
        )}
        <Tabs>
          <TabList style={{ display: "flex", justifyContent: "center" }}>
            <Tab style={{ fontSize: "2rem" }}>Images</Tab>

            <Tab style={{ fontSize: "2rem" }}>Videos</Tab>
          </TabList>

          <Wrap
            fluid="lg"
            style={{
              height: "100%",
              backgroundImage:
                "linear-gradient(to bottom right, #f5f5f5, #f5f5f5)",
              padding: "5%",
            }}
          >
            {/* {productCat} */}

            <TabPanel id="pack">
              <Row>
                {WorkoutsCatImage &&
                  WorkoutsCatImage.data &&
                  WorkoutsCatImage.data[0] &&
                  WorkoutsCatImage.data.map((value, index) => {
                    // console.log(val.data);
                    // return val.data.map((value, index) => {
                    console.log(value);
                    if (value.image != null)
                      return (
                        <Zoom>
                          <Row
                            style={{
                              backgroundColor: "white",
                              marginBottom: "10%",
                            }}
                          >
                            <Col>
                              <div
                                className="articles-body"
                                body
                                style={{ width: "100%" }}
                              >
                                <h2 className="text-center hh2">
                                  <b> {CapitalizeFirstLetter(value.title)} </b>
                                  {/* <small>({val.title})</small> */}
                                </h2>
                                <div className="mt-4">
                                  <img
                                    src={`http://localhost:8000/storage/${value.image}`}
                                    alt="import"
                                  />
                                </div>
                                <br />

                                <Link to={`/workoutImg/${value.id}`} replace>
                                  More »
                                </Link>
                              </div>
                            </Col>
                          </Row>
                          <br></br>
                        </Zoom>
                      );
                    else return "";
                    // });
                  })}
              </Row>
              <Pagination
                changePage={getData}
                data={WorkoutsCatImage}
                containerClass={"pagination-container"}
              />
            </TabPanel>
            <TabPanel id="prod">
              <Row>
                {WorkoutsCatVideo &&
                  WorkoutsCatVideo.data &&
                  WorkoutsCatVideo.data[0] &&
                  WorkoutsCatVideo.data.map((value, index) => {
                    // console.log(val.data);
                    // return val.data.map((value, index) => {
                    console.log(value);
                    if (value.video != null)
                      return (
                        <Zoom>
                          <Row
                            style={{
                              backgroundColor: "white",
                              marginBottom: "10%",
                            }}
                          >
                            <Col>
                              <div
                                // className="articles-body"
                                body
                                // style={{ width: "100%" }}
                              >
                                <h2 className="text-center hh2">
                                  <b> {CapitalizeFirstLetter(value.title)} </b>
                                  {/* <small>({val.title})</small> */}
                                </h2>
                                <div className="mt-4">
                                  <video controls>
                                    <source
                                      src={`http://localhost:8000/storage/${value.video}`}
                                    />
                                  </video>
                                </div>

                                <Link to={`/workout/${value.id}`} replace>
                                  More »
                                </Link>
                              </div>
                            </Col>
                          </Row>
                          <br></br>
                        </Zoom>
                      );
                    else return "";
                    // });
                  })}
              </Row>
              <Pagination
                changePage={getData2}
                data={WorkoutsCatVideo}
                containerClass={"pagination-container"}
              />
            </TabPanel>
          </Wrap>
        </Tabs>
      </Wrap>
    </>
  );
}

//location.aboutProps.id

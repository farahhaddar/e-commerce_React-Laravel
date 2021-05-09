import React, { useEffect, useState } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import Rotate from "react-reveal/Rotate";
import Background from "../../assets/recovery.jpeg";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { Pagination } from "react-laravel-paginex";
// import "./ArticlesCat.css";
// import htmlToDraft from "html-to-draftjs";
import ReactHtmlParser from "react-html-parser";

import { Wrap } from "./Style.js";
export default function ArticlesCat(props) {
  const [ArticlesCat, setArticlesCat] = useState([]);
  const [ArticlesCatSorted, setArticlesCatSorted] = useState([]);
  const [showLess, setShowLess] = useState(true);
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");

  //Pagination

  const length = 150;
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      fetch(`http://localhost:8000/api/articles?page=1&catId=${id}`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            setArticlesCat(json.data);
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(`http://localhost:8000/api/articlesCategories/${id}`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status == 200) {
            console.log(json.data.name);
            setName(json.data.name);
            setImage(json.data.image);
            // setArticlesCat(json.data.data);
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/LastArticles`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            setArticlesCatSorted(json.data);
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
      window.scrollTo(100, 100);
      fetch(
        `http://localhost:8000/api/articles?page=1&catId=${id}&title=${props.shared_var}`,
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
            setArticlesCat(json.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [props.shared_var]);

  const CapitalizeFirstLetter = (str) => {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };

  const getData = (ArticlesCat) => {
    // axios.get("getDataEndpoint?page=" + data.page).then((response) => {
    //   this.setState({ data: data });
    // });
    fetch(`http://localhost:8000/api/articles?page=${ArticlesCat.page}`, {
      method: "get",
      headers: {},
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status == 200) {
          console.log(json.data);
          setArticlesCat(json.data);
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
        <Row style={{ height: "100%" }}>
          <Col sm lg="7" style={{ padding: "auto", margin: "0 auto" }}>
            {ArticlesCat.data &&
              ArticlesCat.data[0] &&
              ArticlesCat.data.map((value, index) => {
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
                          <h2>
                            <b> {CapitalizeFirstLetter(value.title)} </b>
                          </h2>
                          <div className="mt-4">
                            {value.content.length < length ? (
                              <p className="cardTextCat">
                                {" "}
                                {ReactHtmlParser(value.content)}
                              </p>
                            ) : (
                              <p className="cardTextCat">
                                <p>
                                  {showLess
                                    ? ReactHtmlParser(
                                        value.content.slice(0, length)
                                      )
                                    : // `${value.content.slice(0, length)}...`
                                      ReactHtmlParser(value.content)}
                                </p>
                              </p>
                            )}
                          </div>
                          <br></br>

                          <Link to={`/article/${value.id}`} replace>
                            Read More »
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <br></br>
                  </Zoom>
                );
              })}
          </Col>
          <Col
            sm
            lg="4"
            style={{ padding: "auto", margin: "0 auto" }}
            className="text-center"
          >
            <Zoom>
              <Row
                style={{
                  backgroundColor: "white",
                }}
              >
                <Col>
                  <div body>
                    <h2>Recent Posts</h2>
                    <div className="mt-4">
                      {ArticlesCatSorted &&
                        ArticlesCatSorted[0] &&
                        ArticlesCatSorted.map((value, index) => {
                          return (
                            <div className="mb-3">
                              <b>
                                <Link to={`/article/${value.id}`} replace>
                                  {CapitalizeFirstLetter(value.title)} »
                                </Link>
                              </b>
                              <span style={{ Color: "grey", opacity: "0.5" }}>
                                {" "}
                                {value.date}{" "}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Col>
              </Row>
            </Zoom>
          </Col>
        </Row>
        <Pagination
          changePage={getData}
          data={ArticlesCat}
          containerClass={"pagination-container"}
        />
      </Wrap>
    </>
  );
}

//location.aboutProps.id

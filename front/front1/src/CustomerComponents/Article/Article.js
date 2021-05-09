import React, { useEffect, useState } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import Zoom from "react-reveal/Zoom";
import { Wrap } from "./Style.js";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";

import Background from "../../assets/recovery.jpeg";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
// import "./style.css";
import ReactHtmlParser from "react-html-parser";

export default function Article() {
  const [article, setArticle] = useState([]);
  const [ArticlesCat, setArticlesCat] = useState([]);

  const { id } = useParams();
  let history = useHistory();
  const [showLess, setShowLess] = useState(false);
  const [ArticlesCatSorted, setArticlesCatSorted] = useState([]);

  const length = 150;
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
      fetch(`http://localhost:8000/api/articles/${id}?page=1`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            setArticle(json.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(`http://localhost:8000/api/articles`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status == 200) {
            console.log(json.data);
            setArticlesCat(json.data.data);
          } else {
          }
        });
    } catch (err) {
      console.log(err);
    }

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

  const CapitalizeFirstLetter = (str) => {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  };

  return (
    <Wrap
      fluid="lg"
      style={{
        height: "100vh",
        backgroundImage: "linear-gradient(to bottom right, #f5f5f5, #f5f5f5)",
      }}
    >
      <Button variant="link" onClick={() => history.goBack()} className="mt-4">
        {" "}
        <a>&#8249; Back</a>
      </Button>

      {/* {article && article.title && (
        <Flip top>
          <h1 className="text-center" style={{ textTransform: "uppercase" }}>
            <strong>{article.title}</strong>
          </h1>
          <br></br>
        </Flip>
      )} */}

      <Row style={{ height: "100vh" }}>
        <Col sm lg="7" style={{ padding: "auto", margin: "0 auto" }}>
          {article && article.title && (
            <Zoom>
              <Row
                style={{
                  backgroundColor: "white",
                  marginBottom: "1%",
                }}
              >
                <Col>
                  <div className="articles-body" body style={{ width: "100%" }}>
                    <h2 style={{ textAlign: "center" }}>
                      <b> {CapitalizeFirstLetter(article.title)} </b>
                    </h2>
                    <div className="mt-4" id="test">
                      {article.content.length < length ? (
                        ReactHtmlParser(article.content)
                      ) : (
                        // console.log(
                        //   EditorState.createWithContent(
                        //     ContentState.createFromBlockArray(
                        //       htmlToDraft(article.content).contentBlocks
                        //     )
                        //   ).getCurrentContent()
                        // ),
                        // article.content
                        // article.content
                        <>
                          <p className="slow">
                            {showLess
                              ? // ? `${ReactHtmlParser(
                                //     article.content.slice(0, length)
                                //   )}...`
                                ReactHtmlParser(
                                  article.content.slice(0, length)
                                )
                              : ReactHtmlParser(article.content)}
                          </p>
                          <a
                            style={{
                              color: "blue",
                              cursor: "pointer",
                              fontSize: "0.75em",
                            }}
                            onClick={() => setShowLess(!showLess)}
                          >
                            &nbsp;View {showLess ? "More" : "Less"}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <br></br>
            </Zoom>
          )}
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
                              <a href={`/article/${value.id}`}>
                                {" "}
                                {CapitalizeFirstLetter(value.title)} »
                              </a>
                              {/* <Link to={`/article/${value.id}`} replace>
                                {CapitalizeFirstLetter(value.title)} »
                              </Link> */}
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
    </Wrap>
  );
}

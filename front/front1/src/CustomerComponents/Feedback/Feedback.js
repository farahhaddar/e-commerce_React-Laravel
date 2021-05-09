import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { HashLink as Link } from "react-router-hash-link";
let array = 0;
const token = localStorage.getItem("tokenUser");
const id = localStorage.getItem("user");
class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
      resize: "",
      title: "Dashboard",
      comments: "",
      rows: 3,
      count1: 3,
      count: 0,
      page: 1,
      replies: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/comments/" + this.state.rows + "?page=1", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        if (JSON.parse(res).data.length == this.state.rows) {
          this.state.page++;
        }
        this.state.count1 = JSON.parse(res).data.length;
        this.setState({ comments: JSON.parse(res) });
        this.setState({
          count: JSON.parse(res).total - JSON.parse(res).data.length,
        });
      });
  }
  LoadMoreComments() {
    // if (this.state.page < this.state.comments.last_page) {
    fetch(
      "http://localhost:8000/api/comments/" +
        this.state.rows +
        "?page=" +
        this.state.page,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.text())
      .then((res) => {
        if (JSON.parse(res).data.length == this.state.rows) {
          this.state.page++;
        }
        let j = 0;
        if (this.state.count1 < this.state.rows)
          for (j = 0; j < this.state.count1; j++) {
            this.state.comments.data.pop();
          }
        this.state.count1 = JSON.parse(res).data.length;

        this.state.count -= JSON.parse(res).data.length - j;
        let comments = { ...this.state.comments };
        comments.data = [...comments.data, ...JSON.parse(res).data];
        this.setState({
          comments: comments,
        });
      });

    this.setState({ role: "x" });
    // }
  }
  LoadMoreReplies(i, e) {
    fetch(
      "http://localhost:8000/api/replies/" +
        this.state.rows +
        "?page=" +
        this.state.replies[i].page +
        "&comment_id=" +
        e,
      {
        headers: {},
      }
    )
      .then((res) => res.text())
      .then((res) => {
        if (JSON.parse(res).data.length == this.state.replies[i].rows) {
          this.state.replies[i].page = this.state.replies[i].page + 1;
        }
        let j = 0;
        if (this.state.replies[i].count1 < this.state.replies[i].rows)
          for (j = 0; j < this.state.replies[i].count1; j++) {
            this.state.replies[0].repliesLoaded.pop();
          }
        this.state.replies[i].count1 = JSON.parse(res).data.length;
        this.state.replies[i].repliesLoaded = [
          ...this.state.replies[i].repliesLoaded,
          ...JSON.parse(res).data,
        ];
        this.state.replies[i].count -= JSON.parse(res).data.length - j;
        this.setState({ role: "" });
      });
  }
  myFunction(e) {
    if (array != e && array != 0) {
      var remove = document.querySelector(
        ".replyComment[data='" + array + "']"
      );
      remove.classList.add("hidden");
    }
    var el = document.querySelector(".replyComment[data='" + e + "']");
    array = e;
    el.classList.remove("hidden");
    // el.classList.remove("hidden");
    // location.href = "#data" + e;
    // this.context.router.transitionTo("#data" + e);
  }
  submit(i, e) {
    var remove = document.querySelector(".replyComment[data='" + array + "']");
    remove.classList.add("hidden");
    if (!token) {
      return;
    }
    var reply = document.querySelector(".reply1[data='" + e + "']");
    // console.log(reply.value);
    // e
    // userId
    let formData = new FormData();
    formData.append("user_id", id);
    formData.append("comment_id", e);
    formData.append("reply", reply.value);

    fetch("http://localhost:8000/api/user/reply", {
      method: "post",
      body: formData,
      headers: {
        // Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((res) => {
        // this.componentDidMount();

        // let replies = this.state.replies[i].repliesLoaded;
        console.log(this.state.replies[i]);
        console.log(this.state.replies);
        console.log(this.state.replies[i].repliesLoaded);
        console.log(JSON.parse(res));
        // this.state.replies[i].repliesLoaded = [
        //   ...this.state.replies[i].repliesLoaded,
        //   ...JSON.parse(res),
        // ];
        // this.state.replies[i].repliesLoaded = [...JSON.parse(res)];

        // this.state.replies[i].count++;
        this.state.replies[i].repliesLoaded.unshift(JSON.parse(res));

        if (this.state.replies[i].count1 == this.state.replies[i].rows - 1) {
          this.state.replies[i].count1++;
          this.state.replies[i].page++;
        } else if (this.state.count1 == this.state.rows) {
          this.state.replies[i].count1 = 1;
        } else this.state.replies[i].count1++;

        this.setState({ role: "" });
      });
  }
  addComment() {
    if (!token) {
      return;
    }

    var addComment = document.querySelector(".writeComment");
    let formData = new FormData();
    formData.append("user_id", id);
    formData.append("comment", addComment.value);
    fetch("http://localhost:8000/api/user/comment", {
      method: "post",
      body: formData,
      headers: {
        // Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((res) => {
        let x = JSON.parse(res);
        console.log(x[0]);
        console.log(JSON.parse(res));
        // this.state.count++;
        // this.state.count++;
        this.state.comments.data.unshift(x[0]);

        let comment1 = {
          comment_id: x[0].id,
          count: 0,
          repliesLoaded: [],
          read: 0,
          page: 1,
          rows: 3,
          count1: 3,
        };
        this.state.replies.unshift(comment1);
        if (this.state.count1 == this.state.rows - 1) {
          this.state.count1++;
          this.state.page++;
        } else if (this.state.count1 == this.state.rows) {
          this.state.count1 = 1;
        } else this.state.count1++;

        this.setState({ role: "" });
      });
    addComment.value = "";
  }
  deleteComment(e, i) {
    this.state.comments.data.splice(i, 1);
    this.state.replies.splice(i, 1);
    fetch("http://localhost:8000/api/user/comment/" + e, {
      method: "delete",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((res) => {
        console.log(res);
      });
    this.setState({ role: "" });
  }
  deleteReply(i, j) {
    console.log(this.state.replies[i].repliesLoaded[j].id); //id
    fetch(
      "http://localhost:8000/api/user/reply/" +
        this.state.replies[i].repliesLoaded[j].id,
      {
        method: "delete",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.text())
      .then((res) => {
        console.log(res);
      });
    this.state.replies[i].repliesLoaded.splice(j, 1);

    this.setState({ role: "" });
  }
  render() {
    var array = [];
    if (this.state.comments.data != undefined) {
      for (let i = 0; i < this.state.comments.data.length; i++) {
        let comment1 = {
          comment_id: this.state.comments.data[i].id,
          count: this.state.comments.data[i].replies_count,
          repliesLoaded: [],
          read: 0,
          page: 1,
          rows: 3,
          count1: 3,
        };
        // comment1.repliesLoaded.push(1);
        let j;
        for (j = 0; j < this.state.replies.length; j++) {
          if (
            this.state.replies[j].comment_id == this.state.comments.data[i].id
          )
            break;
        }
        if (j == this.state.replies.length) {
          this.state.replies.push(comment1);
        }

        // comment1 = JSON.parse(comment1);
        // this.state.replies.push(comment);
        let reply = [];
        if (this.state.replies[i] != undefined)
          for (
            let j1 = 0;
            j1 < this.state.replies[i].repliesLoaded.length;
            j1++
          ) {
            reply.push(
              <div class="subcomment">
                <div class="userImg">
                  <img
                    width="50px"
                    height="50px"
                    src={
                      "http://localhost:8000/storage/" +
                      this.state.replies[i].repliesLoaded[j1].users.image
                    }
                  />
                </div>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div class="userName">
                      {this.state.replies[i].repliesLoaded[j1].users.name}
                    </div>
                    {this.state.replies[i].repliesLoaded[j1].users.id == id ? (
                      <div
                        onClick={() => {
                          this.deleteReply(i, j1);
                        }}
                      >
                        x
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div class="messageBody">
                    {this.state.replies[i].repliesLoaded[j1].reply}
                  </div>
                  <br />
                  <div class="commentdate">
                    {this.state.replies[i].repliesLoaded[j1].date}
                  </div>
                  <br />
                </div>
                {/* <a id="data1"></a> */}
              </div>
            );
          }

        array.push(
          <div>
            <div class="comment">
              <div class="userImg">
                <img
                  width="50px"
                  height="50px"
                  src={
                    "http://localhost:8000/storage/" +
                    this.state.comments.data[i].users.image
                  }
                />
              </div>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div class="userName">
                    {this.state.comments.data[i].users.name}
                  </div>
                  {this.state.comments.data[i].user_id == id ? (
                    <div
                      onClick={() => {
                        this.deleteComment(this.state.comments.data[i].id, i);
                      }}
                    >
                      x
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div class="messageBody">
                  {this.state.comments.data[i].comment}
                </div>
                <br />
                <div class="flex">
                  <div class="commentdate">
                    {this.state.comments.data[i].date}
                  </div>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <Link
                    to={"#data" + this.state.comments.data[i].id}
                    class="reply"
                    onClick={() => {
                      this.myFunction(this.state.comments.data[i].id);
                    }}
                  >
                    Reply
                  </Link>
                </div>
                <br />
              </div>
            </div>
            {/* {this.state.replies[i].repliesLoaded} */}
            <a
              className="marginLink"
              id={"data" + this.state.comments.data[i].id}
            ></a>
            <div
              className="replyComment hidden"
              data={this.state.comments.data[i].id}
            >
              <textarea
                className="replyComment reply1"
                id="w3review"
                name="w3review"
                rows="8"
                data={this.state.comments.data[i].id}
              ></textarea>
              <br />
              <button
                onClick={() => {
                  this.submit(i, this.state.comments.data[i].id);
                }}
                className="addComment"
              >
                Submit
              </button>
            </div>
            <a
              className="marginLink"
              id={"data" + this.state.comments.data[i].id}
            ></a>
            {reply}

            {this.state.replies[i].count > 0 ? (
              <div
                onClick={() => {
                  this.LoadMoreReplies(i, this.state.comments.data[i].id);
                }}
                className="subcomment link"
              >
                {this.state.replies[i].count + " replies left"}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
      }
      if (this.state.count > 0)
        array.push(
          <button
            className="loadMore"
            onClick={() => {
              this.LoadMoreComments();
            }}
          >
            Load More
          </button>
        );
    }

    return (
      <div>
        <div class="commentsSection">
          <textarea
            class="writeComment"
            id="w3review"
            name="w3review"
            rows="8"
          ></textarea>

          <br />
          <br />
          <button
            onClick={() => {
              this.addComment();
            }}
            className="addComment"
          >
            Add Comment
          </button>
          <br />
          <br />
          <hr />
          <br />
          {array}
        </div>
      </div>
    );
  }
}
export default Feedback;

import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notmainbox">
      <div className="noterr">4</div>
      <i className="far fa-question-circle fa-spin"></i>
      <div className="noterr2">4</div>
      <div className="notmsg">
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p className="notp">
          Let's go{" "}
          <a className="nota" href="/">
            home
          </a>{" "}
          and try from there.
        </p>
      </div>
    </div>
  );
};

export default NotFound;

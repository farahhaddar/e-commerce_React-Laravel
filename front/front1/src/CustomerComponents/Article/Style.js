import styled from "styled-components";
import { Container } from "react-bootstrap";
export const Wrap = styled(Container)`
  .view-cascade {
    border: 10px solid rgb(192, 192, 192) !important;
  }
  .card-body-cascade {
    font-family: "Lucida Console", "Courier New", monospace !important;
    font-size: 2em;
  }

  h2 b,
  h2 {
    font-family: "Berkshire Swash", handwriting !important;
  }
  h1 {
    // font-family: "Berkshire Swash", handwriting !important;

    // color: #daa520;
    color: #241f33 !important;
  }
  h1 {
    font-family: "Lucida Console", "Courier New", monospace !important;
  }
  .articles-body {
    padding: 10%;
  }
  a {
    // color: #bd952e !important;
    color: rgb(255, 174, 0) !important;
    transition: all 0.2s linear;
  }
  .ripple-wave {
    width: 0 !important;
    height: 0 !important;
  }
  @media only screen and (max-width: 450px) {
    .card-body-cascade {
      font-size: 2.5em !important;
    }

    .row {
      margin: auto !important;
      max-height: 70%;
      overflow-y: auto;
    }
    h2 {
      font-size: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 5%;
    }
    .card {
      margin-top: 0;
    }
  }
`;

import styled from "styled-components";
import { Container } from "react-bootstrap";
export const Wrap = styled(Container)`
  .btnn:hover {
    opacity: 60%;
  }

  a {
    text-decoration: none !important;
  }
  a:hover,
  a:focus {
    color: #000000 !important;
  }
  h1 {
    font-family: "Courier New", monospace !important;
  }

  .card-title h3,
  h2 {
    font-family: "Berkshire Swash", handwriting !important;
    // font-family: "Courier New", monospace !important;
  }
  p.card-text p {
    font-family: "Courier New", monospace !important;
    text-align: justify;
  }
  .cardCat {
    height: 45vh !important;
  }
  .articles-body {
    padding: 5.34em 6.67em;
  }
  a {
    // color: #bd952e !important;
    color: rgb(255, 174, 0) !important;
    transition: all 0.2s linear;
  }

  h1 {
    color: #daa520;
    color: #241f33;
  }
  .hh2 {
    font-family: "Berkshire Swash", handwriting !important;
  }
  .pagination-container {
    text-align: center;
    margin: auto;
    margin-bottom: 5%;
    margin-top: 1%;
    display: flex;
    justify-content: center;
  }
  .pagination-container li {
    list-style-type: none;
    margin-left: 0.5%;
  }

  .active {
    background-color: grey !important;
    box-shadow: 0px 0px 5px 0px grey;
    opacity: 0.8;
  }
  .page-item.active .page-link {
    background-color: #e3e3e3 !important;
    opacity: 0.8;
  }
  .ripple-wave {
    width: 0 !important;
    height: 0 !important;
  }
  video {
    width: 75vw;
    height: 75vh;
  }
  img {
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 450px) {
    h2 {
      font-size: 1.25rem;
    }
    h1 {
      font-size: 1.75rem;
      margin-bottom: 5%;
    }
    .card {
      margin-top: 0;
    }
    video {
      width: 100%;
      height: 100%;
    }
    .articles-body {
      padding: 5.34em 3.67em;
      width: 108%;
      padding-bottom: 0;
    }
    .col {
      margin-bottom: 5%;
    }
  }
`;

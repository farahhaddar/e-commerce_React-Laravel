import styled from "styled-components";
import { Container } from "react-bootstrap";
export const Wrap = styled(Container)`
  .btnn:hover {
    opacity: 60%;
  }
  a {
    text-decoration: none !important;
  }
  a {
    // color: #bd952e !important;
    // color: #fdc930;
    // transition: all 0.2s linear;
  }
  .grabbing {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  h2,
  h1 {
    font-family: "Lucida Console", "Courier New", monospace !important;
    text-align: center;
  }
  th {
    background-color: rgb(83, 124, 236);
  }

  h1 {
    // color: #daa520;
    // color: #f32a23;
    padding-top: 3%;
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
  .ripple-wave {
    width: 0 !important;
    height: 0 !important;
  }
  .eQtkkP a {
    color: black !important;
  }
  @media only screen and (max-width: 750px) {
    .main-section {
      max-width: 90vw;
    }
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
    #cont {
      flex-direction: column !important;
    }
    #div1 {
      align-items: center;
    }
    #assign,
    #city {
      max-width: 75% !important;
    }
  }
`;

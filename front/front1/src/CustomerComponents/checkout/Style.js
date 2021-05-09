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
    color: #fdc930 !important;
    transition: all 0.2s linear;
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
  .ripple-wave {
    width: 0 !important;
    height: 0 !important;
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

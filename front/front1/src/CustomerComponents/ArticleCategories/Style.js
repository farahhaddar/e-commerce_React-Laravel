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
    color: rgb(255, 174, 0) !important;
    transition: all 0.2s linear;
  }
  h2,
  h1 {
    font-family: "Lucida Console", "Courier New", monospace !important;
  }

  .btn-primary {
    border-color: #4271f4;
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
  }
`;

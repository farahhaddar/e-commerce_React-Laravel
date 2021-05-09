import React, { Component } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import Item from "./item";
import "./c.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import flag from "../Popup/flag.svg";

export default class BootstrapCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
    };
    this.breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 1, itemsToScroll: 2, pagination: false },
      { width: 850, itemsToShow: 1 },
      { width: 1150, itemsToShow: 1, itemsToScroll: 2 },
      { width: 1450, itemsToShow: 1 },
      { width: 1750, itemsToShow: 1 },
    ];
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/products", {
      method: "GET",
      // body: formData,
      // headers: {
      //   Accept: "application/json",
      //   Authorization: "Bearer " + token,
      // },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          card: res,
        });
      });
  }
  myArrow({ type, onClick, isEdge }) {
    const pointer =
      type === consts.PREV ? (
        <FontAwesomeIcon
          icon={faDumbbell}
          style={{ color: "red", "font-size": "50px" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faDumbbell}
          style={{ color: "red", "font-size": "50px" }}
        />
      );
    return (
      <Button id="arrown" onClick={onClick} disabled={isEdge}>
        {pointer}
      </Button>
    );
  }

  // renderArrow={this.myArrow}

  render() {
    const { items } = this.state;
    // const items = [...]
    const carouselRef = null;
    const totalPages = Math.ceil(1);
    let resetTimeout;
    return (
      <div className="App">
        <Carousel
          breakPoints={this.breakPoints}
          enableAutoPlay
          autoPlaySpeed="8000"
          outerSpacing={0}
        >
          <Item>
            <div>
              <img style={{ height: "600px", width: "1200px" }} src={flag} />
            </div>
          </Item>
          <Item>
            <div>
              <img style={{ height: "600px", width: "1200px" }} src={flag} />
            </div>
          </Item>
          <Item>
            <div>
              <img style={{ height: "600px", width: "1200px" }} src={flag} />
            </div>
          </Item>
          <Item>
            <div>
              <img style={{ height: "600px", width: "1200px" }} src={flag} />
            </div>
          </Item>
        </Carousel>

        {/* <Carousel renderArrow={this.myArrow} breakPoints={this.breakPoints} >
    {this.state.card.map((item, index) =>
     <Item key={index}>
     <div style={{display:'flex'}}> */}
        {/* <img style={{ width: '100%',borderRadius: "30px 30px 0px 0px", height: '200px' }} src={item.name} /> */}
        {/* {item.name}
          </div>

      
      </Item>)}
  </Carousel> */}

        <Carousel renderArrow={this.myArrow} breakPoints={this.breakPoints}>
          {this.state.card.map((item, index) => (
            <Item key={index}>
              <div style={{ display: "flex" }}>
                {/* <img style={{ width: '100%',borderRadius: "30px 30px 0px 0px", height: '200px' }} src={item.name} /> */}
                {item.name}
              </div>
            </Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

import React, { Component } from 'react'
import {Carousel} from 'react-responsive-carousel';
import flag from"../Popup/flag.svg"
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default class Demo extends Component {
    render() {
        return (
            <div>
                 <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                autoPlay={true}
                transitionTime='150'
                interval='3000'
                stopOnHover={false}
                swipeable={true}
                showIndicators={true}
                showStatus={true}
                 >

                <div>
                <img  
                 style={{height:"80vh"}}
          
                 src={flag} />
                   
                   </div>

                 </Carousel>





            </div>
        )
    }
}

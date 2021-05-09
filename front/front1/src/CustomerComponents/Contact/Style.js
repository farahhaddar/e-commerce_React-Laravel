import styled from "styled-components";
import { Container } from "react-bootstrap";
export const Wrap = styled.section`

 
  padding: 80px 0px;
  /* background-color: #222222; */
  background-color: white;
  text-align: center;
  display: flex;
  margin: auto;
  max-width:85vw;

 a span,button
  {
    color:white !important;
  }

  ul
  {
    max-width: 50%;
text-align: center;
margin: auto !important;
  }
 .content {
  -webkit-display: flex;
  display: flex;
}

 .content .box {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 15px;
}

 .content .form input,
 .content .form textarea {
  height: 45px;
  width: 100%;
  padding: 6px 12px;
  margin-bottom: 25px;
  background-color: transparent;
  border: 1px solid black;
  font-family: "Open-sans", sans-serif;
  color: black;
}
 .content .form input:focus,
 .content .form textarea:focus {
  outline: none;
}
 .content .form input::placeholder,
 .content .form textarea::placeholder {
  color: black;
}
 .content .form textarea {
  height: 100px;
}

 .content .form button {
  border: none;
  outline: none;
  box-shadow: none;
  height: 45px;
  padding: 0px 50px;
  border: 1px solid transparent;
  background-color: #fdc930;
  color: black;
  font-size: 15px;
  transition: all 0.5s ease;
  cursor: pointer;
}
 .content .form button:hover {
  background-color: transparent;
  color: black !important;
  border-color: black;
}

 .content .text h2 {
  font-size: 30px;
  font-weight: 500;
  color: #fdc930;
  padding: 0px 0px 20px;
}
 .content .text p {
  font-size: 15px;
  line-height: 20px;
  color: black;
  margin: 0;
  padding: 0px 0px 30px;
  font-family: "Open-sans", sans-serif;
}

 .content .text .info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

 .content .text .info li {
  display: block;
  margin-bottom: 15px;
  color: black;
  font-size: 15px;
  letter-spacing: 1px;
  position: relative;
  padding-left: 40px;
  font-family: "Open-Sans", sans-serif;
}
 .content .text .info li span {
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 0px;
  font-size: 20px;
  color: #fdc930;
}
 .content .text .social {
  padding-top: 30px;
}
 .content .text .social a {
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fdc930;
  text-decoration: none;
  display: inline-block;
  margin-right: 10px;
  transition: all 0.5s ease;
  border: 1px solid transparent;
}

 .content .text .social a:hover {
  background-color: transparent;
  border-color: black;

}
.social a:hover span{
color:black !important;
}
 .content .text .social a span {
  color: black;
  font-size: 20px;
}

 .content .text .copy {
  border-top: 1px solid #333333;
  margin-top: 30px;
  padding-top: 20px;
  color: #c5c5c5;
  font-size: 15px;
}

.content-wrap
{
  margin: 5%;
}
@-webkit-keyframes slideInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-2000px);
    transform: translateX(-2000px);
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-2000px);
    -ms-transform: translateX(-2000px);
    transform: translateX(-2000px);
  }

  100% {
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
  }
}

.slideInLeft {
  -webkit-animation-name: slideInLeft;
  animation-name: slideInLeft;
}

@media (min-width: 991px) {
.section-inner-banner {
  background:linear-gradient( rgba(253, 201, 48, 0.3) 100%, rgba(83, 124, 236, 0.5) 100%),url("./index.jpeg");
  background-size: 100% 100%;
 
  height: 75vh ;
  background-position: top center ;

}
}
@media (max-width: 991px) {
  /* .section-inner-banner {
    height: 0
  }
  .top
  {
    display: none !important;
  } */
  .section-inner-banner {
    background-image: url("./index.jpeg");
    background-size: 100% 100%;

    background-position:  top center ;
    height: 40vh 
  }
  .contact
  {
    padding: 0 !important;
  }
  input{
    margin-bottom: 10px !important;
    height: auto !important;
  }
  .slideInRight h2
  {
    font-size: 2em !important;
  }
  .slideInRight p , li
  {
    font-size: 1em !important;
  }
  ul
  {
    max-width: 100%;
  }
  button
  {
    padding:5px !important;
    height:auto !important
  }
  svg
  {
    font-size:2em !important;
    padding: auto !important;
  }

}
@media (min-width: 991px) {

.section-inner-banner {
  min-height: 200px;
  /* -webkit-clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 25%, 75% 0); */
  clip-path: polygon(0% 0%, 99% 0%, 100% 100%, 0% 84%);  
  margin-bottom: 5%  !important;
  ;}
}





  


/*Responsive*/

/*if screen width is less than or equal to 991px then*/
@media (max-width: 991px) {
  .home {
    background-position: center;
  }
  .classes .content {
    flex-wrap: wrap;
  }
  .classes .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .classes .content .img {
    display: none;
  }
  .start-today .content .box {
    padding: 15px;
  }
}

/*if screen width is less than or equal to 767px then*/
@media (max-width: 767px) {
  .home h1 {
    font-size: 40px;
  }
  .about .content {
    flex-wrap: wrap;
  }
  .about .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .service .content {
    flex-wrap: wrap;
  }
  .service .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .classes .content .class-items .item {
    flex-wrap: wrap;
  }
  .classes .content .class-items .item .item-text,
  .classes .content .class-items .item .item-img {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .schedule .content {
    flex-wrap: wrap;
  }
  .schedule .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .start-today .content {
    flex-wrap: wrap;
  }
  .start-today .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .gallery .content {
    flex-wrap: wrap;
  }
  .gallery .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .price-package .content {
    flex-wrap: wrap;
  }
  .price-package .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
   .content {
    flex-wrap: wrap;
  }
   .content .box {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
.text:focus,
.text:not(:placeholder-shown) {
  border-bottom: none;
  )

/*if screen width is less than or equal to 550px then*/
@media (max-width: 550px) {
  .home h1 {
    font-size: 30px;
  }

}
`;

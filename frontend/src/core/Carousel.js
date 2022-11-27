import React,{useState,useEffect} from 'react';
import API from '../config'
import { Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import oneplus from './oneplus.jpg'
import shop from './shop.jpg'
import headphone from './headphone.jpg'

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={oneplus}
          height="400px"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={shop}
          height="400px"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={headphone}
          height="400px"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}


export default ControlledCarousel;

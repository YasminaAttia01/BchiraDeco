import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./products.scss";
import m1 from "../../assets/m1.png";
import m2 from "../../assets/m2.png";
import b1 from "../../assets/b1.png";
import b2 from "../../assets/b2.png";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const services = [
   {
    title: "Travaux de menuiserie",
    images: [m1, m2],
  },
  {
    title: "Revêtement de façades",
    images: [b1, b2],
  },
];

const Products = () => {
  const [serviceIndex, setServiceIndex] = useState(0);

  const handleAfterChange = (index) => {
    setServiceIndex(index);
  };

  return (
    <div className="services-container">
      <div className="section-header">
        <h1>Services proposés</h1>
        <div className="underline">
          <div className="line" />
          <div className="dot" />
        </div>
      </div>

      <Carousel
        responsive={responsive}
        infinite
        arrows
        autoPlay
        showDots
        afterChange={handleAfterChange}
        className="carousel-wrapper"
      >
        {services.map((service, index) => (
          <div className="carousel-slide" key={index}>
            <div className="overlay">
              <h2>{service.title}</h2>
            </div>
            <div className="image-gallery">
              {service.images.map((img, i) => (
                <img key={i} src={img} alt={service.title} />
              ))}
            </div>
          </div>
        ))}
      </Carousel>

    </div>
  );
};

export default Products;

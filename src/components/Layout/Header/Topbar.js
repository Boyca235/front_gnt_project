import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <span className="prev slick-arrow" onClick={onClick}>
      <i className="fal fa-angle-left"></i>
    </span>
  );
}
function NextArrow(props) {
  const { onClick } = props;
  return (
    <span className="next slick-arrow" onClick={onClick}>
      <i className="fal fa-angle-right"></i>
    </span>
  );
}

export default function Topbar() {
  const myDate = new Date();
  let mois = myDate.getMonth() + 1;
  let jour = "Date du jour : " + myDate.getDate() + "/" + mois + "/" + myDate.getFullYear();
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const [trendindData, setPublications] = useState([])
  useEffect(() => {
    fectchPublication()
  }, [])
  const fectchPublication = async () => {
    try {
      await axios.get(`/publishment/list/filtred/Trending`).then(({ data }) => {
        setPublications(data)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }

  return (
    <div className="header-topbar">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="topbar-trending">
              <span>Tendances</span>
              <Slider {...settings} className="trending-slider">
                {trendindData.map((item,i) => (
                  <div className="trending-item" key={i + 1}>
                    <p>
                      {item.title && item.title.length > 70 ? item.title.substring(0,67) + "..." : item.title}
                    </p>
                  </div>
                ))}
                {/* <div className="trending-item">
                  <p>
                    Bienvenue au site de Gabon New Tech{' '}
                  </p>
                </div>
                <div className="trending-item">
                  <p>
                    Top 10 Best Movies of 2018 So Far: Great Movies To Watch Now{' '}
                  </p>
                </div>
                <div className="trending-item">
                  <p>
                    Top 10 Best Movies of 2018 So Far: Great Movies To Watch Now{' '}
                  </p>
                </div> */}
              </Slider>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="topbar-social d-flex align-items-center">
              <p>{jour}</p>
              {/* <p>Date du jour</p> */}
              <div className="social">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

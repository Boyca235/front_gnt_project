import axios from 'axios';
import Link from 'next/link';
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

export default function TrendingCarousel({ dark }) {
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 1,
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
      await axios.get(`/publishment/list`).then(({ data }) => {
        setPublications(data)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }
  return (
    <Slider {...settings} className="row trending-news-slider">
      {trendindData.map((item, i) => (
      <div className="col" key={i + 1}>
        <div
          className={`trending-news-item ${
            dark ? 'trending-news-item-dark' : ''
          }`}
        >
          <div className="trending-news-thumb">
            <img src="/images/trending-news-1.jpg" alt="trending" />
            <div className="icon">
              <Link href="/post-details-three">
                <i className="fas fa-bolt"></i>
              </Link>
            </div>
          </div>
          <div className="trending-news-content">
            <div className="post-meta">
              <div className="meta-categories">
                <Link href="/post-details-three">{item.category.category_name.toUpperCase()}</Link>
              </div>
              <div className="meta-date">
                <span>{item.created_at}</span>
              </div>
            </div>
            <h3 className="title">
              <Link href="/post-details-three">
                {item.title && item.title.length > 57 ? item.title.substring(0,54) + "..." : item.title}
              </Link>
            </h3>
            <p className="text">
              {item.title && item.title.length > 120 ? item.title.substring(0,120) + "..." : item.title}
            </p>
          </div>
        </div>
      </div>
      ))}
      {/* <div className="col">
        <div
          className={`trending-news-item ${
            dark ? 'trending-news-item-dark' : ''
          }`}
        >
          <div className="trending-news-thumb">
            <img src="/images/trending-news-2.jpg" alt="trending" />
            <div className="icon">
              <Link href="/post-details-three">
                <i className="fas fa-bolt"></i>
              </Link>
            </div>
          </div>
          <div className="trending-news-content">
            <div className="post-meta">
              <div className="meta-categories">
                <Link href="/post-details-three">TECHNOLOGIE</Link>
              </div>
              <div className="meta-date">
                <span>March 26, 2020</span>
              </div>
            </div>
            <h3 className="title">
              <Link href="/post-details-one">
                Japan’s virus success has puzzled the world. Is its luck running
                out? Or not?
              </Link>
            </h3>
            <p className="text">
              The property, complete with 30-seat screening from room, a
              100-seat amphitheater and a swimming pond with sandy shower…
            </p>
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className={`trending-news-item ${
            dark ? 'trending-news-item-dark' : ''
          }`}
        >
          <div className="trending-news-thumb">
            <img src="/images/trending-news-3.jpg" alt="trending" />
            <div className="icon">
              <Link href="/post-details-three">
                <i className="fas fa-bolt"></i>
              </Link>
            </div>
          </div>
          <div className="trending-news-content">
            <div className="post-meta">
              <div className="meta-categories">
                <Link href="/post-details-three">TECHNOLOGIE</Link>
              </div>
              <div className="meta-date">
                <span>March 26, 2020</span>
              </div>
            </div>
            <h3 className="title">
              <Link href="/post-details-one">
                Japan’s virus success has puzzled the world. Is its luck running
                out?
              </Link>
            </h3>
            <p className="text">
              The property, complete with 30-seat screening from room, a
              100-seat amphitheater and a swimming pond with sandy shower…
            </p>
          </div>
        </div>
      </div> */}
    </Slider>
  );
}

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

const postData = [
  {
    postThumb: '/images/feature-1.jpg',
    postThumbDark: '/images/feature-dark-1.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'April, 1st 2023',
    postTitle: 'Best garden wing supplies for the horticu ltural',
  },
  {
    postThumb: '/images/feature-2.jpg',
    postThumbDark: '/images/feature-dark-2.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'Best garden wing supplies for the horticu ltural',
  },
  {
    postThumb: '/images/feature-3.jpg',
    postThumbDark: '/images/feature-dark-3.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'Best garden wing supplies for the horticu ltural',
  },
  {
    postThumb: '/images/feature-4.jpg',
    postThumbDark: '/images/feature-dark-4.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2023',
    postTitle: 'Best garden wing supplies for the horticu ltural',
  },
  {
    postThumb: '/images/feature-2.jpg',
    postThumbDark: '/images/feature-dark-2.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'Best garden wing supplies for the horticu ltural',
  },
];

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

export default function FeatureNewsCarousel({ customClass, dark }) {
  const settings = {
    slidesToShow: 4,
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
          slidesToShow: 3,
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
          slidesToShow: 2,
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
  const [listData, setData] = useState([])
  useEffect(() => {
    fectchPublication()
  }, [])

  const fectchPublication = async () => {
    try {
      await axios.get(`/publishment/list`).then(({ data }) => {
        setData(data)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }
  return (
    <section className={`feature-area ${customClass}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={`section-title ${dark ? 'section-title-2' : ''}`}>
              <h3 className="title">Innovations</h3>
            </div>
          </div>
        </div>
        <Slider className="row feature-post-slider" {...settings}>
          {listData.map((item, i) => (
            <div className="col" key={i + 1}>
              <div className="feature-post">
                <div className="feature-post-thumb">
                  {dark ? (
                    <img
                      src="/images/feature-dark-2.jpg"
                      className="img-fluid"
                      alt="feature"
                    />
                  ) : (
                    <img
                      src="/images/feature-2.jpg"
                      className="img-fluid"
                      alt="feature"
                    />
                  )}
                </div>
                <div className="feature-post-content">
                  <div className="post-meta">
                    <div className="meta-categories">
                      <Link href="/post-details-two">{item.category.category_name.toUpperCase()}</Link>
                    </div>
                    <div className="meta-date">
                      <span>{item.created_at}</span>
                    </div>
                  </div>
                  <h4 className="title">
                    <Link href="/post-details-two">{item.title && item.title.length > 50 ? item.title.substring(0,47) + "..." : item.title}</Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

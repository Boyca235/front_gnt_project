import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ModalVideo from 'react-modal-video';
import axios from 'axios';

const postData = [
  {
    postThumb: '/images/play-post-1.jpg',
    postThumbDark: '/images/play-post-dark-1.jpg',
    postCategory: 'TECHNOLOGY001',
    postDate: 'March 26, 2020',
    postTitle: 'There\'s no crime than not doing but argue',
  },
  {
    postThumb: '/images/play-post-2.jpg',
    postThumbDark: '/images/play-post-1.jpg',
    postCategory: 'TECHNOLOGY',
    postDate: 'March 26, 2023',
    postTitle: 'Success is not a good food failure makes you humble, by me',
  },
  {
    postThumb: '/images/play-post-1.jpg',
    postThumbDark: '/images/play-post-2.jpg',
    postCategory: 'TECHNOLOGY',
    postDate: 'March 26, 2020',
    postTitle: 'Success is not a good food failure makes you humble',
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

export default function TwoPostCarousel({ dark, customClass }) {
  const [isOpen, setOpen] = useState(false);
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
      await axios.get(`/publishment/list/filtred/Trending/5`).then(({ data }) => {
        setPublications(data)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }
  return (
    <section
      className={`single-play-post-area mt-10 ${customClass} ${
        dark ? 'single-play-post-dark-area' : ''
      } `}
    >
      <div className="container custom-container">
        <div className="single-play-box">
          <Slider {...settings} className="row single-play-post-slider">
            {trendindData.map((item, i) => (
              <div className="col" key={i + 1}>
                <div className="single-play-post-item">
                  {dark ? (
                    <img src="/images/play-post-1.jpg" alt="play"/>
                  ) : (
                    <img src="/images/play-post-2.jpg" alt="play"/>
                  )}

                  <div className="single-play-post-content">
                    <div className="post-meta">
                      <div className="meta-categories">
                        <a href="#">{item.category.category_name.toUpperCase()}</a>
                      </div>
                      <div className="meta-date">
                        <span>{item.created_at}</span>
                      </div>
                    </div>
                    <h3 className="title">
                      <Link href="/post-details-two">{item.title && item.title.length > 50 ? item.title.substring(0,50) + "..." : item.title}</Link>
                    </h3>
                  </div>
                  <div className="play-btn">
                    <a
                      className="video-popup"
                      onClick={() => setOpen(true)}
                      href="#"
                    >
                      <i className="fas fa-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId="eEzD-Y97ges"
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </section>
  );
}

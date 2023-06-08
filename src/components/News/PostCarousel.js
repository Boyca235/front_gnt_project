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

// const postData = [
//   {
//     postThumb: '/images/post-1.jpg',
//     postTitle: 'Du nuveau avec flutter',
//     postDesc: 'People have been infected in United…',
//   },
//   {
//     postThumb: '/images/post-2.jpg',
//     postTitle: 'La communauté de développeur C# s\'élargi au Gabon',
//     postDesc: 'Découvrez toute l\'actulité ur le c# au Gabon',
//   },
//   {
//     postThumb: '/images/post-3.jpg',
//     postTitle: 'Stimul package will fundamentally transform the government.',
//     postDesc: 'People have been infected in United…',
//   },
//   {
//     postThumb: '/images/post-2.jpg',
//     postTitle: 'The home decorations document: photograph of an empty plane',
//     postDesc: 'People have been infected in United…',
//   },
// ];

export default function PostCarousel({ dark }) {
  const settings = {
    slidesToShow: 3,
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

  const [postData, setPublications] = useState([])
  useEffect(() => {
    fectchPublication()
  }, [])
  const fectchPublication = async () => {
    try {
      await axios.get(`/publishment/list/filtred/SlideBaner`).then(({ data }) => {
        setPublications(data)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }
  return (
    <section className="post-area">
      <div className="container">
        <Slider
          className="row post-slider justify-content-between"
          {...settings}
        >
          {postData.map((item, i) => (
            <div className="col" key={i + 1}>
              <div
                className={`single__post d-flex align-items-center flex-column flex-lg-row ${
                  dark ? 'post_dark' : ''
                }`}
              >
                <div className="post-thumb">
                  <img src="/images/post-1.jpg" alt="post" />
                </div>
                {/* href={{ pathname: '/update', query: { id: product.id } }} */}
                {/* href={{ pathname: '/post-details-one', query: { id: item.id } }} locale={'/post-details-one'} */}
                <div className="post-content">
                  <h4 className="title">
                    <Link href={'/post-details-one?id=' + item.id}>{item.title && item.title.length > 60 ? item.title.substring(0,60) + "..." : item.postTitle}</Link>
                  </h4>
                  <p>{item.postDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

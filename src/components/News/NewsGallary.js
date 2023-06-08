import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ModalVideo from 'react-modal-video';
import Link from 'next/link';
import axios from 'axios';

// const galleryData = [
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'May 09, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
//   {
//     postCategory: 'TECHNOLOGIE',
//     postTitle:
//       'Japan’s virus success has puzzled the world. Is its luck running out?',
//     postDate: 'March 26, 2020  ',
//     postDesc:
//       'The property, complete with a 30-seat screening room, a 100-seat amphitheater and a swimming pond with sandy beach and outdoor shower…',
//   },
// ];

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

export default function NewsGallary({ customClass, dark }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [galleryData, setPublications] = useState([])
  useEffect(() => {
    fectchPublication()
  }, [])
  const fectchPublication = async () => {
    try {
      await axios.get(`/publishment/list`).then(({ data }) => {
        setPublications(data)
        // console.log(data)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
  };

  const settingsInner = {
    slidesToShow: 7,
    slidesToScroll: 1,
    dots: false,
    centerMode: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    centerPadding: '0',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider
        {...settings}
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        className="post_gallery_slider"
      >
        {galleryData.map((item, i) => (
          <div
            className={`post_gallery_play d-flex ${
              dark ? 'post_gallery_play_dark' : ''
            }`}
            key={i + 1}
          >
            <div className="bg-image"></div>
            <div className="post__gallery_play_content">
              <div className="post-meta">
                <div className="meta-categories">
                  <Link href="#">{item.category.category_name.toUpperCase()}</Link>
                </div>
                <div className="meta-date">
                  <span>{item.created_at}</span>
                </div>
              </div>
              <h2 className="title">
                <Link href={'/post-details-three?id=' + item.id}>{item.title && item.title.length > 70 ? item.title.substring(0,70) + "..." : item.title}</Link>
              </h2>
              <p>{item.postDesc}</p>
            </div>
            <div className="post_play_btn" onClick={() => setOpen(true)}>
              <Link className="#" onClick={(e) => e.preventDefault()} href="#nolink">
                <i className="fas fa-play"></i>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
      <Slider
        {...settingsInner}
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        className="post_gallery_inner_slider"
      >
        <div className="item">
          <img src="/images/gallery-post/item-1.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-2.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-3.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-4.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-5.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-6.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-7.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-2.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-3.jpg" alt="" />
        </div>
        <div className="item">
          <img src="/images/gallery-post/item-4.jpg" alt="" />
        </div>
      </Slider>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="eEzD-Y97ges"
        onClose={() => setOpen(false)}
      />
    </>
  );
}

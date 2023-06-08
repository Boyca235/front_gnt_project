import AdWidgetTwo from '@/components/AdsWidget/AdWidgetTwo';
import Drawer from '@/components/Layout/Drawer/Drawer';
import Footer from '@/components/Layout/Footer/Footer';
import FooterCopyright from '@/components/Layout/Footer/FooterCopyright';
import Header from '@/components/Layout/Header/Header';
import Layout from '@/components/Layout/Layout';
import NewsLetter from '@/components/Newsletter/NewsLetter';
import TrendingNewsWidget from '@/components/NewsWidgets/TrendNewsWidget';
import BreadCrumb from '@/components/Others/BreadCrumb';
import Pagination from '@/components/Others/Pagination';
import NewsTabs from '@/components/Sidebar/NewsTabs';
import TrendingSingleCarousel from '@/components/TrendingNews/TrendingSingleCarousel';
import useToggle from '@/Hooks/useToggle';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const postData = [
  {
    postThumb: '/images/business-1.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 28, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-3.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-4.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-1.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-2.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-3.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-2.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-4.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    postThumb: '/images/business-1.jpg',
    postTag: 'TECHNOLOGIE',
    postDate: 'March 26, 2020',
    postTitle: 'There may be no consoles in the future eaexec says',
    postDesc:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
];

export default function Business() {
  const [drawer, drawerAction] = useToggle(false);
  const [publications, setPublications] = useState([])
  useEffect(() => {
    fectchPublication()
  }, [])
  const fectchPublication = async () => {
    try {
      await axios.get(`/publishment/cated/13`).then(({ data }) => {
        setPublications(data)
        // console.log(data)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }
  return (
    <Layout title="Fintech">
      <Drawer drawer={drawer} action={drawerAction.toggle} />
      <Header action={drawerAction.toggle} />
      <section className="about-item-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <BreadCrumb CategoryName="Fintech" />
            </div>
            <div className="col-lg-8">
              <div className="about-tab-btn mt-40">
                <div className="archive-btn">
                  <ul>
                    <li>
                      <span>
                        Categorie: <span>Fintech</span>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="about-post-items">
                  <div className="row">
                    <div className="col-lg-12">
                      {publications.map((item,i) => (
                        <div key={i} className="business-post-item mb-40">
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="business-post-thumb">
                                <img src="/images/business-1.jpg" alt="business" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="trending-news-item">
                                <div className="trending-news-content">
                                  <div className="post-meta">
                                    <div className="meta-categories">
                                      <a href="#">{item.category.category_name}</a>
                                    </div>
                                    <div className="meta-date">
                                      <span>{item.created_at}</span>
                                    </div>
                                  </div>
                                  <h3 className="title">
                                    <a href="#">{item.title && item.title.length > 110 ? item.title.substring(0,110) + "..." : item.title}</a>
                                  </h3>
                                  <p className="text">{item.content_pub && item.content_pub.length > 120 ? item.content_pub.substring(0,120)+ "..." : item.content_pub}</p>
                                  <a href="#">Read more</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-lg-12">
                      <Pagination />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="post_gallery_sidebar mt-40">
                <NewsTabs />
                <NewsLetter />
                <TrendingSingleCarousel />
                <TrendingNewsWidget />
                <AdWidgetTwo />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FooterCopyright />
    </Layout>
  );
}

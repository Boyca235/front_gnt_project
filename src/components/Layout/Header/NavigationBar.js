import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import data from '../../../data/navigation.json';
import axios from 'axios';

function NavigationBar({ customClass }) {
  const [postData, setCategories] = useState([])
  let Nav = []
  useEffect(() => {
    fetchCategory()
  }, [])
  const fetchCategory = async () => {
    try {
      await axios.get(`/category/list`).then(({ data }) => {
        setCategories(data)
        let i = 1 
        for (let index = 0; index < data.length; index++) {
          Nav[index] = [
            {
              "id": 1,
              "linkText": "Accueil",
              "link":"/",
              "child": false
              
            },
            {
              "id":i++,
              "linkText": data[index].category_name,
            }
          ]
          // console.log("la donnée : " + data[index].category_name)
        }
        console.log("les données de nav : " + Nav)
      })
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }
  return (
    <>
      <div className={`newspark-header-main-menu ${customClass}`}>
        {data && data.data&& data.data.length > 0 && (
          <ul>
            {data.data.map((item, i) => (
              <li key={i}>
                {item.child ? (
                  <>
                    <Link href="#">
                      {item.linkText}
                      <i className="fal fa-angle-down"></i>
                    </Link>
                  </>
                ) : (
                  <Link href={item.link}>{item.linkText}</Link>
                )}
                {item.child && (
                  <ul className="sub-menu">
                    {item.submenu.map((ltwo, j) => (
                      <li key={j}>
                        <Link href={ltwo.link}>
                          {ltwo.linkText}
                          {ltwo.child && <i className="fal fa-angle-down"></i>}
                        </Link>

                        {ltwo.child && (
                          <ul className="sub-menu">
                            {ltwo.third_menu.map((lthree, k) => (
                              <li key={k}>
                                <Link href={lthree.link}>
                                  {lthree.linkText}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default NavigationBar;

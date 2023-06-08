import React,{useState,useEffect} from 'react';
import NavigationBar from './NavigationBar';
import Topbar from './Topbar';
import LogoBanner from './LogoBanner';

function Temper() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('');

  const getTemper = async() => {
    try {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      })
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=0ec98fa1e800a0877c45203737094026`);
      const resJson = await response.json();
      // console.log(resJson)
      setCity(resJson.name)
      setTemp(resJson.main.temp)
    } catch (error) {
      console.log("Y'a une erreur : " + error)
    }
  }

  useEffect(() =>{getTemper()},[lat])
  return (
    <div>
      {
        city=="globe"?(<span></span>)  : (
          <span>
            <h5 className="title">
              {Math.round(temp)}
              <sup>
                0<sub>C</sub>
              </sup>
            </h5>
            <p>{city}</p>
          </span>
        )
      }
    </div>
  )
}

export default function Header({ customClass, className, action, dark }) {
  return (
    <header
      className={`newsprk-header-area
    header-area ${customClass}`}
    >
      <Topbar />
      <LogoBanner />
      <div className={`newsprk-header-area ${className || ''}`}>
        <div className="container">
          <div className="header-nav-box">
            <div className="row align-items-center position-relative">
              <div
                onClick={(e) => action(e)}
                className="toggle-btn ml-15 canvas_open d-lg-none d-block"
              >
                <i className="fa fa-bars" />
              </div>
              <div className="col-lg-8">
                <div
                  className={`newsprk-header-main-menu ${
                    dark ? 'newsprk-header-main-menu-dark' : ''
                  }`}
                >
                  <NavigationBar />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="header-menu-rightbar">
                  <div className="header-menu-search">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fal fa-search"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fal fa-user-circle"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="nice-select-item">
                    <select>
                      <option data-display="English">English</option>
                      <option value="1">Français</option>
                      <option value="2">Espagnol</option>
                      <option value="3">Italien</option>
                    </select>
                  </div> */}
                  <div className="header-temperature">
                    <div className="icon">
                      <img src="/images/temperature-icon.svg" alt="" />
                    </div>
                    <div className="temperature-content text-center">
                      {Temper()}
                      {/* <h5 className="title">
                        {Temper()}
                        <sup>
                          0<sub>C</sub>
                        </sup>
                      </h5>
                      <p>Libreville</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// "icon": "angle-down",
//       "submenu": [
//         {
//           "id": 11,
//           "link": "/",
//           "linkText": "Home 1",
//           "child": true,
//           "third_menu": [
//             {
//               "id": 12,
//               "link": "/home-1-1",
//               "linkText": "Home v1.1"
//             },
//             {
//               "id": 12,
//               "link": "/home-1-2",
//               "linkText": "Home v1.2"
//             },
//             {
//               "id": 12,
//               "link": "/home-1-3",
//               "linkText": "Home v1.3"
//             },
//             {
//               "id": 12,
//               "link": "/home-1-4",
//               "linkText": "Home v1.4"
//             }
//           ]
//         },
//         {
//           "id": 13,
//           "link": "/home-2",
//           "linkText": "Home 2",
//           "child": true,
//           "third_menu": [
//             {
//               "id": 12,
//               "link": "/home-2-1",
//               "linkText": "Home v2.1"
//             },
//             {
//               "id": 12,
//               "link": "/home-2-2",
//               "linkText": "Home v2.2"
//             },
//             {
//               "id": 12,
//               "link": "/home-2-3",
//               "linkText": "Home v2.3"
//             },
//             {
//               "id": 12,
//               "link": "/home-2-4",
//               "linkText": "Home v2.4"
//             }
//           ]
//         },
//         {
//           "id": 14,
//           "link": "/home-3",
//           "linkText": "Home 3",
//           "child": true,
//           "third_menu": [
//             {
//               "id": 12,
//               "link": "/home-3-1",
//               "linkText": "Home v3.1"
//             },
//             {
//               "id": 12,
//               "link": "/home-3-2",
//               "linkText": "Home v3.2"
//             },
//             {
//               "id": 12,
//               "link": "/home-3-3",
//               "linkText": "Home v3.3"
//             },
//             {
//               "id": 12,
//               "link": "/home-3-4",
//               "linkText": "Home v3.4"
//             }
//           ]
//         },
//         {
//           "id": 12,
//           "link": "/home-4",
//           "linkText": "Home 4",
//           "child": true,
//           "third_menu": [
//             {
//               "id": 12,
//               "link": "/home-4-1",
//               "linkText": "Home v4.1"
//             },
//             {
//               "id": 12,
//               "link": "/home-4-2",
//               "linkText": "Home v4.2"
//             },
//             {
//               "id": 12,
//               "link": "/home-4-3",
//               "linkText": "Home v4.3"
//             },
//             {
//               "id": 12,
//               "link": "/home-4-4",
//               "linkText": "Home v4.4"
//             }
//           ]
//         }
//       ]
// {
//       "id": 2,
//       "linkText": "Pages",
//       "child": true,
//       "icon": "angle-down",
//       "submenu": [
//         {
//           "id": 21,
//           "link": "/about",
//           "linkText": "A propos"
//         },
//         {
//           "id": 22,
//           "link": "/archive",
//           "linkText": "Archive"
//         },
//         {
//           "id": 23,
//           "link": "/contact",
//           "linkText": "Contact"
//         },
//         {
//           "id": 24,
//           "link": "/404",
//           "linkText": 404
//         }
//       ]
//     },
//     {
//       "id": 3,
//       "linkText": "Posts",
//       "child": true,
//       "icon": "angle-down",
//       "submenu": [
//         {
//           "id": 31,
//           "linkText": "Post 1",
//           "link": "/post-details-one"
//         },
//         {
//           "id": 32,
//           "linkText": "Post 2",
//           "link": "/post-details-two"
//         },
//         {
//           "id": 33,
//           "linkText": "Post 3",
//           "link": "/post-details-three"
//         }
//       ]
//     },

const Weather = () => {
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [temp, setTemp] = useState(0);

    const [wind, setWind] = useState('');
    const [windDir, setWindDir] = useState('');
    const [gust, setGust] = useState('');
    const [precip, setPrecip] = useState(0);
    const [icon, setIcon] = useState('');
    const [pic, setPic] = useState('');
    const [city, setCity] = useState('');
    
    const getWeather = async () => {

          try {
                await navigator.geolocation.getCurrentPosition((position) => {
                      setLat(position.coords.latitude);
                      setLong(position.coords.longitude);
                })
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=6e6263afb84f44279f731543222510&q=${lat},${long}&aqi=no`);
                console.log(response.data)
                setCity(response.data.location.name)
                setTemp(response.data.current.temp_f);
                setWind(response.data.current.wind_mph);
                setWindDir(response.data.current.wind_dir);
                setGust(response.data.current.gust_mph);
                setPrecip(response.data.current.precip_in);
                setPic(response.data.current.condition.icon.slice(-7))

                if(response.data.current.condition.icon.includes('day')){
                      setIcon(<img src={`/assets/weather/64x64/day/${pic}`}></img> 
                      )
                } else {
                      setIcon(<img src={`/assets/weather/64x64/night/${pic}`}></img> )
             
                }

          
          } catch (err) {
                console.error(err)
          }
    }

useEffect(() =>{

getWeather();
    
},[])
    

    return (
          <div className='weather-container'>
                <p>{icon}</p>
                <h2>{city}</h2>
                <p>{`Current Temp: ${Math.round(temp)} °F`}</p>
                <p>{`Wind: ${windDir} ${Math.round(wind)} mph Gusts: ${Math.round(gust)} mph`}</p>
                <p>{`Precip: ${Math.round(precip)}in`}</p>
          </div>
    )

}

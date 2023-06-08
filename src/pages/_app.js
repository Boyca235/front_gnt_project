import '@/assets/css/bootstrap.min.css';
import '@/assets/css/font-awesome.min.css';
import '@/assets/css/slick.css';
import '@/assets/css/navbar.css';
import '@/assets/css/default.css';
import '@/assets/scss/style.scss';
import 'react-modal-video/scss/modal-video.scss';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-date'

axios.defaults.withCredentials = true

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import { Header } from '../components/header';
import { Servicios } from '../components/servicios';
import { Nosotros } from '../components/nosotros';
import { Planes } from '../components/planes';
import { Testimonios } from '../components/testimonios';
import { Contacto } from '../components/contacto';
import JsonData from '../data/data.json';
import SmoothScroll from 'smooth-scroll';
import LoginModal from '../components/loginmodal';
import RegisterModal from '../components/registermodal';
import './Home.css';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Servicios data={landingPageData.Servicios} />
      <Nosotros data={landingPageData.Nosotros} />
      <Planes data={landingPageData.Planes} />
      <Testimonios data={landingPageData.Testimonios} />
      <Contacto data={landingPageData.Contacto} />
      <Route path="/login" component={LoginModal} />
      <Route path="/register" component={RegisterModal} />
    </div>
  );
};

export default Home;

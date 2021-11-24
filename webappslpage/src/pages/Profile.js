import SmoothScroll from 'smooth-scroll';
import './Home.css';
import UpdateClient from '../components/modifyclient';
import User from '../components/user';
import { NavigationUser } from '../components/navigationUser';
import { Route } from 'react-router-dom';
import ResponsiveDrawer from '../components/sidebar';
import SwipeableTemporaryDrawer from '../components/sidebar';
import Details from './detailsUser';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const profile = () => {

  return (
    <div>
      <NavigationUser/>
      <User />
      <Route path="/updateC" component={Details}/>

    </div>
  );
};

export default profile;

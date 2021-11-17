import SmoothScroll from 'smooth-scroll';
import './Home.css';
import UpdateClient from '../components/modifyclient';
import User from '../components/user';
import Details from '../components/detailsUser';
import { NavigationUser } from '../components/navigationUser';
import { Route } from 'react-router-dom';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const profile = () => {

  return (
    <div>
      <NavigationUser />
      <User />
      <Details />
      <Route path="/updateC" component={UpdateClient}/>

    </div>
  );
};

export default profile;

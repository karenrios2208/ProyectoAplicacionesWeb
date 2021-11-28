import SmoothScroll from 'smooth-scroll';
import './Home.css';
import User from '../components/user';
import { NavigationUser } from '../components/navigationUser';
import { Route } from 'react-router-dom';
import Details from '../components/detailsUser';
import PaymentsList from './PaymentsList';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const profile = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <NavigationUser />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Route path="/profile" component={User} />
      <Route path="/details" component={Details} />
      <Route path="/payments" component={PaymentsList} />
    </div>
  );
};

export default profile;

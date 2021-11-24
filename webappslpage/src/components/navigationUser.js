import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../auth';
import SwipeableTemporaryDrawer from './sidebar';


export const NavigationUser = () => {
  const history = useHistory();
 function Onlogout (){
    logout()
  
    history.push('/');

  }
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <SwipeableTemporaryDrawer/>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {' '}
            <span className="sr-only">Toggle navigation</span>{' '}
            <span className="icon-bar"></span>{' '}
            <span className="icon-bar"></span>{' '}
            <span className="icon-bar"></span>{' '}

          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            SRCapital
          </a>{' '}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/" className="page-scroll">
                Inicio
              </a>
            </li>

            <li>
              <button
                className="'btns btn--primary  btn--outline btn--large  page-scroll' "
                onClick= {()=>Onlogout()}
              >
                Log-out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

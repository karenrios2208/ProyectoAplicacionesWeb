import React from 'react';
import { useHistory } from 'react-router-dom';

export const Navigation = () => {
  const history = useHistory();

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
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
              <a href="#features" className="page-scroll">
                Financiamiento
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Sedes
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Guía de préstamo
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimoniales
              </a>
            </li>

            <li>
              <button
                className="'btns btn--primary  btn--outline btn--large  page-scroll' "
                onClick={() => history.push('/login')}
              >
                Sign-in
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

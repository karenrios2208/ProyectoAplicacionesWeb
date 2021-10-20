export const Nosotros = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {' '}
            <img src="img/birb2.jpg" className="img-responsive" alt="" />{' '}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Nosotros</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                sed dapibus leo nec ornare diam sed commodo nibh ante facilisis
                bibendum.
              </p>
              <h3>¿Por qué nosotros?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>Por esto</li>
                    <li>Esto</li>
                    <li>Esto</li>
                    <li>Lo otro</li>
                    <li>También esto</li>
                    <li>Y esto</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <ul>
                      <li>Por esto</li>
                      <li>Esto</li>
                      <li>Esto</li>
                      <li>Lo otro</li>
                      <li>También esto</li>
                      <li>Y esto</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

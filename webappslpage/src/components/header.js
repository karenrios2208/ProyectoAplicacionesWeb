export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  Lorem IPsum y esas cosas
                  <span></span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  ornare fringilla orci, id faucibus nisl laoreet id. Curabitur
                  iaculis mi tellus. Vivamus vel semper nisl. Donec id dolor
                  ipsum.
                </p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Habla con nuestro asistente!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

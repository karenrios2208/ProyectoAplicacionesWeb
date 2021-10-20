import Swal from 'sweetalert2';

export const Navigation = (props) => {
  const lggr = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      backdrop: `
  rgba(0,0,123,0.4)
  left top
  no-repeat
`,
      html:
        '<h6 style=margin-left:0px">Usuario</h7>' +
        '<br>' +
        '<input id="swal-input1" class="swal2-input">' +
        '<h6 style="margin-left:0px">Contraseña</h7>' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ];
      },
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  };
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
                Guía de prestamo
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimoniales
              </a>
            </li>

            <li>
              <button
                class="'btns btn--primary  btn--outline btn--large  page-scroll' "
                onClick={() => lggr()}
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

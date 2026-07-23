import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import tikTok from '../assets/tik-tok.png';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container-fluid p-4 px-5 shadow-lg">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 text-start">
            <h4>SHOP</h4>
            <ul className="list-unstyled">
              <li className="fs-5 grey-color">Dresses</li>
              <li className="fs-5 grey-color">Jackets</li>
              <li className="fs-5 grey-color">Skirts</li>
              <li className="fs-5 grey-color">Shoes & Bags</li>
              <li className="fs-5 grey-color">Gift Cards</li>
              <li className="fs-5 grey-color">Sales & Offers</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-4 text-md-start text-lg-center">
            <h4>INFORMATION</h4>
            <ul className="list-unstyled">
              <li className="fs-5 grey-color">About</li>
              <li className="fs-5 grey-color">Terms & Conditions</li>
              <li className="fs-5 grey-color">Privacy Policy</li>
              <li className="fs-5 grey-color">Delivery & Return</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-4 text-md-start text-lg-end">
            <h4>CUSTOMER SUPPORT</h4>
            <ul className="list-unstyled">
              <li className="fs-5 grey-color">Contact</li>
              <li className="fs-5 grey-color">Help</li>
              <li className="fs-5 grey-color">FAQ</li>
            </ul>
          </div>
        </div>

        <div className="row align-items-center">
          <p className="col-12 col-lg-6 text-center text-lg-start">
            Designed and developed by <strong>&copy; taica_rullz</strong>
          </p>

          <ul className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end gap-4 list-unstyled">
            <li>
              <img src={facebook} width="22" />
            </li>
            <li>
              <img src={instagram} width="22" />
            </li>
            <li>
              <img src={tikTok} width="22" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

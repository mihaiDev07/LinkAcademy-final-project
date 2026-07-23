import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/logo.png';

import cartLogo from '../assets/cart_logo.png';
import userLogo from '../assets/user_logo.png';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { itemCount } = useCart();

  const location = useLocation();

  useEffect(() => {
    document.getElementById('mobileMenu')?.classList.remove('show');
    document.getElementById('mobileSearch')?.classList.remove('show');
  }, [location]);

  return (
    <header id="header">
      <nav className="py-4 nav-shadow header-bg">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-4 d-lg-none d-flex align-items-center gap-3">
              <button
                className="btn fs-1 p-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileMenu"
                data-bs-dismiss="collapse"
                aria-label="Toggle menu"
              >
                ☰
              </button>

              <button
                className="btn fs-3 p-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileSearch"
                data-bs-dismiss="collapse"
                aria-label="Search"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>

            <div className="col-4 d-lg-none d-flex justify-content-center align-items-center">
              <Link to="/">
                <img className="actionsImg" src={logo} alt="ModernLogo" />
              </Link>
            </div>

            <div className="col-4 d-lg-none d-flex justify-content-end align-items-center gap-3">
              <Link
                className="text-decoration-none text-dark links-txt position-relative"
                to="/cart"
              >
                <img className="actionsImg" src={cartLogo} alt="Cart" />
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link
                className="text-decoration-none text-dark links-txt"
                to="/login"
              >
                <img className="actionsImg" src={userLogo} alt="Login" />
              </Link>
            </div>

            <div className="col-lg-8 d-none d-lg-flex align-items-center gap-5">
              <Link to="/">
                <img src={logo} alt="ModernLogo" id="brand" />
              </Link>

              <ul className="d-flex gap-4 mb-0 list-unstyled">
                <li>
                  <Link
                    className="d-block py-2 text-decoration-none text-dark h5"
                    to="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="d-block py-2 text-decoration-none text-dark h5"
                    to="/shop"
                  >
                    Shop
                  </Link>
                </li>

                <li>
                  <Link
                    className="d-block py-2 text-decoration-none text-dark h5"
                    to="/about"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="d-block py-2 text-decoration-none text-dark h5"
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    className="d-block py-2 text-decoration-none text-danger h5"
                    to="/sale"
                  >
                    Sale!
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 d-none d-lg-flex justify-content-end align-items-center gap-4">
              <input
                id="search-input"
                className="form-control form-control-sm py-2 text-end header-bg border border-secondary rounded header-bg"
                type="text"
                placeholder="Search"
              />

              <Link
                className="text-decoration-none text-dark links-txt position-relative"
                to="/cart"
              >
                <img className="actionsImg" src={cartLogo} alt="Cart" />
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link
                className="text-decoration-none text-dark links-txt"
                to="/login"
              >
                <img className="actionsImg" src={userLogo} alt="Login" />
              </Link>
            </div>
          </div>

          <div className="collapse d-lg-none mt-3" id="mobileMenu">
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/"
                  className="d-block py-2 text-decoration-none text-dark h5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="d-block py-2 text-decoration-none text-dark h5"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="d-block py-2 text-decoration-none text-dark h5"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="d-block py-2 text-decoration-none text-dark h5"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="d-block py-2 text-decoration-none text-danger h5"
                >
                  Sale!
                </Link>
              </li>
            </ul>
          </div>

          <div className="collapse d-lg-none mt-3" id="mobileSearch">
            <input
              type="text"
              className="form-control py-2 border border-secondary rounded header-bg"
              placeholder="Search products..."
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

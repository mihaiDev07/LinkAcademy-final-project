import { Link } from 'react-router-dom';
import homepageArrivals1 from '../assets/homepage-arrivals-m1.png';
import homepageArrivals2 from '../assets/homepage-arrivals-m2.png';
import homepageArrivals3 from '../assets/homepage-arrivals-m3.png';
import homepageArrivals4 from '../assets/homepage-arrivals-m4.png';
import homepageArrivals5 from '../assets/homepage-arrivals-m5.png';
import homepageBanner from '../assets/homepage-banner.png';

const Home = () => {
  return (
    <main className="py-5 my-5">
      {/* <!-- ================= HERO / BANNER ================= --> */}
      <section className="container-fluid p-0 shadow-lg">
        <img
          src={homepageBanner}
          className="img-fluid w-100"
          alt="Main Banner"
        />
      </section>

      {/* <!-- ================= NEW ARRIVALS ================= --> */}
      <section className="container-fluid py-5">
        <h2 className="text-center mb-4">New Arrivals</h2>

        <div className="row g-4">
          {/* <!-- ITEM --> */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="arrival-item">
              <img src={homepageArrivals1} className="img-fluid mb-2" alt="" />
              <div className="text-center mt-3">
                <Link
                  to="/shop?category=Women%20Clothing"
                  id="btn-women"
                  className="btn btn-dark  py-2 px-5 shop-filter-btn"
                  type="button"
                  data-category="women"
                >
                  Women
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="arrival-item">
              <img src={homepageArrivals2} className="img-fluid mb-2" alt="" />
              <div className="text-center mt-3">
                <Link
                  to="/shop?category=Kids"
                  id="btn-kids"
                  className="btn btn-dark px-5 py-2 shop-filter-btn"
                  type="button"
                  data-category="kids"
                >
                  Kids
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="arrival-item">
              <img src={homepageArrivals3} className="img-fluid mb-2" alt="" />
              <div className="text-center mt-3">
                <Link
                  to="/shop?category=Men%20Clothing"
                  id="btn-men"
                  className="btn btn-dark  py-2 px-5 shop-filter-btn"
                  type="button"
                  data-category="men"
                >
                  Men
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ================= PROMO SECTION ================= --> */}
      <section className="container-fluid px-0">
        <div className="row g-0">
          {/* <!-- IMAGE LEFT --> */}
          <div className="col-md-6">
            <img
              src={homepageArrivals4}
              className="img-fluid w-100 h-100"
              alt=""
            />
          </div>

          {/* <!-- IMAGE RIGHT --> */}
          <div className="col-md-6">
            <img
              src={homepageArrivals5}
              className="img-fluid w-100 h-100"
              alt=""
            />
          </div>
        </div>

        {/* <!-- TEXT + BUTTON --> */}
        <div className="container-fluid py-4 header-bg">
          <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-evenly align-items-center gap-3">
            <div className="text-center">
              <h1 className="text-danger">
                Enjoy <strong>20% off</strong> this season's styles
              </h1>
            </div>

            <div className="text-center">
              <Link to="/shop" className="btn btn-dark py-2 px-5">
                SHOW ALL
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

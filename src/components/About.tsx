import { Link } from 'react-router-dom';
import aboutUs1 from '../assets/aboutUs-1.png';

import { team } from '../data/team';
import Employer from './Employer';

const About = () => {
  return (
    <main className="py-5 my-5">
      {/* <!-- ================= SECTION 1: WHO WE ARE ================= --> */}
      <section className="container-fluid mb-5">
        <div className="row">
          {/* <!-- IMAGE (LEFT) --> */}
          <div className="col-12 col-lg-6">
            <img
              src={aboutUs1}
              className="img-fluid w-100 h-60 about-img"
              alt="About us"
            />
          </div>

          {/* <!-- TEXT (RIGHT) --> */}
          <div className="col-12 col-lg-6 p-5 d-flex flex-column">
            <h1 className="mb-4">So, who are we?</h1>

            <p className="fs-5 text-muted">
              Since our founding in 2015, our mission has always been to bring
              quality and convenience to our customers. We believe in
              transparency, sustainability, and delivering value in every
              product we offer. Over the years, we’ve grown from a small local
              shop to a trusted e-commerce brand serving thousands of satisfied
              customers. Every product is carefully selected and tested to
              ensure it meets our high standards. Our team is passionate about
              innovation and constantly works on improving the shopping
              experience, offering new products, and listening to our
              community’s feedback. We are committed to giving back to the
              community and supporting local initiatives, because we believe a
              business should make a positive impact beyond its sales.
            </p>

            <div className="mt-4">
              <Link to="/contact" className="btn btn-dark px-5 py-2">
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ================= SECTION 2: MEET THE TEAM ================= --> */}
      <section className="container">
        <h2 className="text-center mb-5">Meet the team</h2>

        <div className="row g-4">
          {/* <!-- TEAM MEMBER 1 --> */}
          {/* <div className="col-12 col-md-6 col-lg-4"> */}
          {team.map((employee) => (
            <Employer
              key={employee.id}
              image={employee.image}
              name={employee.name}
              job={employee.job}
              description={employee.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;

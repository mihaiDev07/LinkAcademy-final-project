import { useState, type BaseSyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../data/auth';
import { useNotification } from '../context/NotificationContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const navigate = useNavigate();

  const { notify } = useNotification();

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      notify({ message: 'Email is required', type: 'error' });
      return;
    }

    if (!password.trim()) {
      notify({ message: 'Password is required', type: 'error' });
      return;
    }

    if (!birthDate) {
      notify({ message: 'Birth date is required', type: 'error' });
      return;
    }

    try {
      const response = await register({
        username: email,
        email: email,
        password,
      });

      console.log(response);

      notify({ message: 'Account created successfully!', type: 'success' });
      navigate('/login');
    } catch (error) {
      console.error(error);
      notify({ message: 'Registration failed.', type: 'error' });
    }
  };

  return (
    <main className="container py-5">
      <section className="py-5">
        <h1 className="text-center fw-bold mb-5">Create an Account</h1>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="bg-light p-5 rounded shadow-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label btn-input-form-text">
                      Email
                      <span className="text-danger h4"> *</span>
                    </label>

                    <input
                      type="email"
                      className="form-control bg-light border border-dark py-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label btn-input-form-text">
                      Password
                      <span className="text-danger h4"> *</span>
                    </label>

                    <input
                      type="password"
                      className="form-control bg-light border border-dark py-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label btn-input-form-text">
                      Date of birth
                      <span className="text-danger h4"> *</span>
                    </label>

                    <input
                      type="date"
                      className="form-control bg-light border border-dark py-2"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row mb-4 px-3">
                    <div className="d-flex align-items-center gap-2 mb-2 form-check">
                      <input
                        className="form-check-input p-2 border border-dark"
                        type="checkbox"
                        id="promotions"
                      />

                      <label
                        className="form-check-label links-txt"
                        htmlFor="promotions"
                      >
                        I would like to receive personalized promotions
                      </label>
                    </div>

                    <div className="d-flex align-items-center gap-2 form-check">
                      <input
                        className="form-check-input p-2 border border-dark"
                        type="checkbox"
                        id="terms"
                        defaultChecked
                      />

                      <label
                        className="form-check-label links-txt"
                        htmlFor="terms"
                      >
                        I agree and accepted the{' '}
                        <a className="text-secondary links-txt" href="#">
                          Terms and conditions
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-2 mb-3 btn-input-form-text"
                  >
                    CREATE AN ACCOUNT
                  </button>

                  <Link
                    to="/login"
                    className="btn btn-outline-secondary w-100 py-2 mb-3 btn-input-form-text"
                  >
                    BACK TO LOGIN
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;

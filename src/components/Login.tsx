import { useState, type BaseSyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../data/auth';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login: authLogin } = useAuth();
  const { notify } = useNotification();

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      notify({ message: 'Email is required', type: 'error' });
      return;
    }

    if (!password.trim()) {
      notify({ message: 'Password is required', type: 'error' });
      return;
    }

    try {
      const response = await login({
        username,
        password,
      });

      authLogin({
        id: 70, // temporary
        username,
        token: response.token,
        expiresAt: response.expiresAt,
      });
      notify({ message: 'Login successful!', type: 'success' });
      navigate('/');
    } catch (error) {
      console.error(error);
      notify({ message: 'Invalid email or password.', type: 'error' });
    }
  };

  return (
    <main className="container py-5">
      <section className="py-5">
        <h1 className="text-center mb-5 fw-bold">Login</h1>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="bg-light p-5 rounded shadow-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label btn-input-form-text">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control bg-light border border-dark"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label btn-input-form-text">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control bg-light border border-dark"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-2 mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                      />

                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>

                    <a href="#" className="text-secondary">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-2 mb-3"
                  >
                    LOGIN
                  </button>

                  <p className="text-center mb-0">
                    Or{' '}
                    <Link to="/register" className="text-dark fw-semibold">
                      Create an Account
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

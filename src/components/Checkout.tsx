import { useEffect, useState, type BaseSyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import image1 from '../assets/PayPal.png';

import { createCart } from '../data/cart';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Checkout = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { notify } = useNotification();

  const [isPaying, setIsPaying] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const isLoggedIn = !!user && !!user.token;

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const currentAuth =
      typeof window !== 'undefined' ? sessionStorage.getItem('auth') : null;
    const parsedAuth = currentAuth ? JSON.parse(currentAuth) : null;
    const hasValidAuth = !!parsedAuth?.token && !!user?.token;

    if (!hasValidAuth) {
      logout();
      notify({ message: 'Please login first.', type: 'error' });
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      notify({ message: 'Your cart is empty.', type: 'info' });
      return;
    }

    try {
      setIsPaying(true);

      await createCart({
        userId: user!.id,
        products: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      setOrderSuccess(true);
    } catch (error) {
      console.error(error);
      notify({ message: 'Checkout failed.', type: 'error' });
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <main className="container py-5 my-5">
      <h1 className="text-center mb-5">Checkout</h1>

      {orderSuccess ? (
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="bg-light border rounded p-4 text-center">
              <p className="fs-1 mb-3">✅</p>
              <h3>Order placed successfully!</h3>
              <p className="mb-0">Thank you for your purchase.</p>
              <hr className="my-4" />
              <h4>🛒 Your cart is empty</h4>
              <p className="text-muted mb-4">
                Looks like you haven't added any products yet.
              </p>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* <!-- SHIPPING + PAYMENT --> */}
          <div className="col-12 col-lg-6">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white p-4 rounded shadow-lg"
            >
              <h5 className="mb-4">Shipping Information</h5>

              <div className="row g-3">
                <div className="col-12 col-lg-6">
                  <label htmlFor="firstName" className="form-label h6">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12 col-lg-6">
                  <label htmlFor="lastName" className="form-label h6">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label h6">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="apartment" className="form-label h6">
                    Apartment, suite, etc.
                  </label>
                  <input id="apartment" type="text" className="form-control" />
                </div>

                <div className="col-12 col-lg-4">
                  <label htmlFor="country" className="form-label h6">
                    Country
                  </label>
                  <select id="country" className="form-select">
                    <option value="Romania">Romania</option>
                    <option value="France">France</option>
                    <option value="USA">USA</option>
                  </select>
                </div>

                <div className="col-12 col-lg-4">
                  <label htmlFor="city" className="form-label h6">
                    City
                  </label>
                  <select id="city" className="form-select">
                    <option value="Facaeni">Facaeni</option>
                    <option value="Slobozia">Facaeni</option>
                    <option value="Bucuresti">Bucuresti</option>
                  </select>
                </div>

                <div className="col-12 col-lg-4">
                  <label htmlFor="zip" className="form-label h6">
                    Zipcode
                  </label>
                  <select id="zip" className="form-select">
                    <option value="927110">927110</option>
                  </select>
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      id="saveInfo"
                      type="checkbox"
                      className="form-check-input"
                    />
                    <label htmlFor="saveInfo" className="form-check-label">
                      Save contact information
                    </label>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="mb-3">Payment Information</h5>

              <div className="d-flex flex-column flex-lg-row gap-2 mb-3">
                <button
                  type="button"
                  className="btn btn-outline-dark flex-fill"
                >
                  <img src={image1} height="20" />
                </button>
                <button type="button" className="btn btn-dark flex-fill fs-5">
                  Cash
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="cardName" className="form-label h6">
                  Cardholder Name
                </label>
                <input id="cardName" type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label h6">
                  Card Number
                </label>
                <input id="cardNumber" type="text" className="form-control" />
              </div>

              <div className="row g-3">
                <div className="col-12 col-lg-4">
                  <label className="form-label h6">Month</label>
                  <select className="form-select"></select>
                </div>
                <div className="col-12 col-lg-4">
                  <label className="form-label h6">Year</label>
                  <select className="form-select"></select>
                </div>
                <div className="col-12 col-lg-4">
                  <label className="form-label h6">CVC</label>
                  <input type="number" className="form-control" />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 mt-4 fs-5"
                disabled={isPaying}
                formNoValidate
              >
                {isPaying ? 'Processing...' : 'Pay'}
              </button>
            </form>
          </div>

          {/* <!-- ORDER SUMMARY --> */}
          <div className="col-12 col-lg-6">
            <div className="bg-white p-4 rounded shadow-lg">
              <h5 className="mb-4">Review your cart</h5>

              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <h3>Your cart is empty</h3>

                  <p className="text-muted">
                    Looks like you haven't added any products yet.
                  </p>

                  <Link to="/shop" className="btn btn-dark">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex gap-3 pb-3 mb-3 border-bottom"
                  >
                    <img
                      src={item.image}
                      width="70"
                      className="rounded"
                      alt={item.title}
                    />
                    <div className="flex-grow-1">
                      <p className="h6 mb-2">{item.title}</p>
                      <div className="d-flex justify-content-between align-items-center col-4 border rounded px-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 text-dark"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          −
                        </button>
                        <span className="h6 mb-0">{item.quantity}</span>
                        <button
                          type="button"
                          className="btn btn-link p-0 text-dark"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-end">
                      <strong>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                      <button
                        type="button"
                        className="btn btn-link text-danger p-0 d-block mt-2 text-decoration-none"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Checkout;

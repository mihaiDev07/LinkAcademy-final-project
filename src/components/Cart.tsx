import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';
import { getProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        await getProducts();

        if (isMounted) {
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setError('Something went wrong.');
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // fraction, e.g., 0.2 for 20%

  const discountAmount = totalPrice * discount;
  const discountedTotal = totalPrice - discountAmount;

  const formattedSubtotal = totalPrice.toFixed(2);
  const formattedDiscount =
    discountAmount > 0 ? `-$${discountAmount.toFixed(2)}` : '$0';
  const formattedTotal = discountedTotal.toFixed(2);

  const { notify } = useNotification();

  const handleApply = () => {
    const code = promoCode.trim().toLowerCase();
    if (!code) {
      notify({ message: 'Please enter a promo code.', type: 'info' });
      return;
    }

    if (discount > 0) {
      notify({ message: 'A promo code is already applied.', type: 'info' });
      return;
    }

    if (code === 'linkacademy') {
      setDiscount(0.2);
      notify({ message: 'Promo applied — 20% off', type: 'success' });
    } else {
      notify({ message: 'Invalid promo code.', type: 'error' });
    }
  };

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <h1 className="mb-4">Your Cart</h1>
        <p>Loading…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5 text-center">
        <h1 className="mb-4">Your Cart</h1>
        <p>Something went wrong.</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="text-center mb-5">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ minHeight: '60vh' }}
        >
          <h2 className="mb-3">🛒 Your cart is empty</h2>

          <p className="text-muted mb-4">
            Looks like you haven't added any products yet.
          </p>

          <Link to="/shop" className="btn btn-dark px-5">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="shadow-lg rounded p-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.title}
                  price={item.price}
                  color={item.color}
                  size={item.size}
                  quantity={item.quantity}
                  image={item.image}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeProduct={removeFromCart}
                />
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="shadow-lg rounded p-4 h-100">
              <h4 className="mb-4 fw-bold">Order Summary</h4>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">${formattedSubtotal}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Discount</span>
                <span>{formattedDiscount}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold mb-4">
                <span>Total</span>
                <span>${formattedTotal}</span>
              </div>

              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control text-center fst-italic"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-dark px-4"
                  onClick={handleApply}
                >
                  Apply
                </button>
              </div>

              <p className="small text-muted">
                Your promo code is : <strong> linkacademy </strong>
              </p>

              <Link to="/checkout" className="btn btn-dark w-100 mb-3">
                Go To Checkout
              </Link>

              <small className="text-muted d-block mb-2">
                Prices and costs are not displayed until you complete your
                purchase.
              </small>

              <small className="text-muted d-block">
                You have 30 days to change your mind.
                <a
                  href="#"
                  className="text-dark text-decoration-underline ms-1"
                >
                  Delivery & Return
                </a>
              </small>

              <small className="text-muted d-block mt-2">
                Need help?
                <a
                  href="#"
                  className="text-dark text-decoration-underline ms-1"
                >
                  Customer Support
                </a>
              </small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;

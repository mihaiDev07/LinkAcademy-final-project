import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type SaleItemProps = {
  id: number;
  image: string;
  title: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  inStock: boolean;
};

const SaleItem = ({
  id,
  image,
  title,
  originalPrice,
  salePrice,
  discount,
  inStock,
}: SaleItemProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, title, price: salePrice, image, category: 'Sale' });
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <Link to={`/product/${id}`} className="text-decoration-none text-dark">
        <div className="card h-100 position-relative shadow-sm">
          {/* Discount Badge */}
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            -{discount}%
          </span>

          {/* Product Image */}
          <img src={image} className="card-img-top p-3" alt={title} />

          {/* Card Body */}
          <div className="card-body">
            <h6 className="card-title">{title}</h6>

            <p className="text-muted text-decoration-line-through mb-1">
              ${originalPrice}
            </p>

            <p className="fw-bold text-danger h5 mb-2">${salePrice}</p>

            <p className={`small ${inStock ? 'text-success' : 'text-danger'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </div>
      </Link>
      <button
        className="btn btn-outline-dark btn-sm w-100"
        disabled={!inStock}
        onClick={handleAddToCart}
      >
        {inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default SaleItem;

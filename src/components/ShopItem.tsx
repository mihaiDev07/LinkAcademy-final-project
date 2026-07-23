import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type ShopItemProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
};

const ShopItem = ({
  id,
  title,
  price,
  category,
  image,
  inStock,
}: ShopItemProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price,
      image,
      category,
    });
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4 d-flex">
      <div className="card shadow-sm w-100 h-100">
        <Link to={`/product/${id}`} className="text-decoration-none text-dark">
          <img
            src={image}
            alt={title}
            className="card-img-top"
            style={{
              height: '320px',
              objectFit: 'cover',
            }}
          />

          <div className="card-body d-flex flex-column">
            <h5
              className="card-title"
              style={{
                minHeight: '48px',
              }}
            >
              {title}
            </h5>

            <p className="text-muted mb-2">{category}</p>

            <h4 className="fw-bold mb-2">${price}</h4>

            <p
              className={`fw-semibold ${
                inStock ? 'text-success' : 'text-danger'
              }`}
            >
              {inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </Link>

        <div className="card-footer bg-white border-0 mt-auto">
          <button
            className="btn btn-outline-dark w-100"
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;

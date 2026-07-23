import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProduct } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product as ProductType } from '../types/Product';

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading product...</h3>
      </div>
    );
  }

  return (
    <main className="container py-5">
      <div className="row g-5">
        {/* LEFT SIDE - IMAGE */}
        <div className="col-12 col-lg-6">
          <div className="border rounded p-3 text-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="d-flex justify-content-start gap-3 mt-3">
            <img
              src={product.image}
              width={90}
              className="border rounded p-1"
              alt={product.title}
            />

            <img
              src={product.image}
              width={90}
              className="border rounded p-1"
              alt={product.title}
            />

            <img
              src={product.image}
              width={90}
              className="border rounded p-1"
              alt={product.title}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-lg-6">
          <h2 className="fw-bold mb-3">{product.title}</h2>

          {/* PRICE */}
          <div className="mb-3">
            <span className="fw-bold fs-3">${product.price}</span>
          </div>

          {/* RATING */}
          <div className="mb-3 text-warning">
            ★★★★☆
            <span className="text-dark fs-6 ms-2">(24 Reviews)</span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-muted">{product.description}</p>

          {/* CATEGORY */}
          <p>
            <strong>Category:</strong> {product.category}
          </p>

          {/* STOCK */}
          <p
            className={
              product.inStock ? 'text-success fw-bold' : 'text-danger fw-bold'
            }
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* SIZE */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Size</label>

            <select
              className="form-select w-50"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          {/* QUANTITY */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Quantity</label>

            <input
              type="number"
              className="form-control w-25"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* BUTTONS */}
          <div className="d-flex gap-3">
            <button
              className="btn btn-dark px-4"
              disabled={!product.inStock}
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  size: size || 'One Size',
                  quantity,
                })
              }
            >
              Add to Cart
            </button>

            <button className="btn btn-outline-secondary">❤</button>
          </div>

          {/* EXTRA INFO */}
          <div className="mt-4 border-top pt-3">
            <p className="mb-1">
              <strong>Free Shipping</strong> on orders over $50
            </p>

            <p className="mb-1">
              <strong>Delivery:</strong> 3–5 business days
            </p>

            <p className="mb-0">
              <strong>Return Policy:</strong> 30-day return
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;

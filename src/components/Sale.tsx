import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { getProducts } from '../data/products';

import SaleItem from './SaleItem';
import { Link } from 'react-router-dom';

const Sale = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await getProducts();

        const saleProducts = products
          .filter((product) => (product.discount ?? 0) > 0 || product.price > 0)
          .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
          .slice(0, 4);

        setSaleProducts(saleProducts);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="text-center py-5 bg-danger text-white mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold">MEGA SALE 🔥</h1>
          <p className="lead">Up to 50% OFF on selected items</p>

          <Link to="/shop" className="btn btn-light btn-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* PRODUCTS */}

      <section className="container">
        <div className="row g-4">
          {saleProducts.map((product) => {
            const discount =
              product.discount && product.discount > 0
                ? product.discount
                : Math.floor(Math.random() * 40) + 10;

            const salePrice = Number(
              (product.price * (1 - discount / 100)).toFixed(2),
            );

            return (
              <SaleItem
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                originalPrice={product.price}
                salePrice={salePrice}
                discount={discount}
                inStock={product.inStock}
              />
            );
          })}
        </div>
      </section>

      <section className="text-center mt-5">
        <h2 className="fw-bold">Hurry Up ⏳</h2>

        <p>Limited time offer. Don't miss your chance!</p>
      </section>
    </main>
  );
};

export default Sale;

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Product } from '../types/Product';
import { getProducts } from '../data/products';

import ShopItem from './ShopItem';

const PRICE_RANGES = [
  { label: '$0 - $50', value: '0-50' },
  { label: '$50 - $100', value: '50-100' },
  { label: '$100 +', value: '100+' },
];

const CATEGORY_OPTIONS = [
  'Women Clothing',
  'Men Clothing',
  'Footwear',
  'Accessories',
];

const CATEGORY_ALIAS_MAP: Record<string, string> = {
  women: 'Women Clothing',
  men: 'Men Clothing',
  kids: 'Kids',
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [appliedPriceRanges, setAppliedPriceRanges] = useState<string[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const categoryParams = searchParams.getAll('category').map((category) => {
      const normalized = category.toLowerCase();
      return CATEGORY_ALIAS_MAP[normalized] ?? category;
    });

    if (categoryParams.length) {
      setSelectedCategories(categoryParams);
      setAppliedCategories(categoryParams);
    }

    const priceParams = searchParams.getAll('price');
    if (priceParams.length) {
      setSelectedPriceRanges(priceParams);
      setAppliedPriceRanges(priceParams);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (fetchError) {
        console.error(fetchError);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const togglePriceRange = (value: string) => {
    setSelectedPriceRanges((current) =>
      current.includes(value)
        ? current.filter((range) => range !== value)
        : [...current, value],
    );
  };

  const toggleCategory = (value: string) => {
    setSelectedCategories((current) =>
      current.includes(value)
        ? current.filter((category) => category !== value)
        : [...current, value],
    );
  };

  const handleApplyFilters = () => {
    setAppliedCategories(selectedCategories);
    setAppliedPriceRanges(selectedPriceRanges);

    const params = new URLSearchParams();

    selectedCategories.forEach((category) => {
      params.append('category', category);
    });

    selectedPriceRanges.forEach((price) => {
      params.append('price', price);
    });

    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesPrice =
        appliedPriceRanges.length === 0 ||
        appliedPriceRanges.some((range) => {
          if (range === '0-50') {
            return product.price <= 50;
          }

          if (range === '50-100') {
            return product.price > 50 && product.price <= 100;
          }

          if (range === '100+') {
            return product.price > 100;
          }

          return true;
        });

      const matchesCategory =
        appliedCategories.length === 0 ||
        appliedCategories.includes(product.category);

      return matchesPrice && matchesCategory;
    });
  }, [products, appliedCategories, appliedPriceRanges]);

  const noProductsMessage =
    selectedCategories.length === 1 && selectedCategories[0] === 'Kids'
      ? 'No kids products available right now. Please check back soon!'
      : 'No products match your filters. Try changing the category or price selection.';

  return (
    <main className="container py-5">
      <h1 className="text-center mb-5">View All Products</h1>

      <div className="row">
        {/* Filters */}

        <aside className="col-lg-3 mb-5">
          <div className="border rounded p-4 shadow-sm">
            <h3 className="mb-4">Filters</h3>

            <div className="mb-4">
              <strong>Price</strong>

              {PRICE_RANGES.map((range) => (
                <div className="form-check mt-2" key={range.value}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.value)}
                    onChange={() => togglePriceRange(range.value)}
                    id={`price-${range.value}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`price-${range.value}`}
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <strong>Categories</strong>

              {CATEGORY_OPTIONS.map((category) => (
                <div className="form-check mt-2" key={category}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    id={`category-${category.replace(/\s+/g, '-')}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`category-${category.replace(/\s+/g, '-')}`}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>

            <button className="btn btn-dark w-100" onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products */}

        <section className="col-lg-9">
          {loading ? (
            <div className="text-center py-5">
              <p>Loading products…</p>
            </div>
          ) : error ? (
            <div className="text-danger text-center py-5">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="mb-3">{noProductsMessage}</h4>
              <p className="text-muted">
                Clear the filters or choose a different category to see more
                items.
              </p>
            </div>
          ) : (
            <div className="row g-4 align-items-stretch">
              {filteredProducts.map((product) => (
                <ShopItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  image={product.image}
                  inStock={product.inStock}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Shop;

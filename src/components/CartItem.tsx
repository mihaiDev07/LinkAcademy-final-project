type CartItemProps = {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeProduct: (id: number) => void;
};

const CartItem = ({
  id,
  name,
  price,
  color,
  size,
  quantity,
  image,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
}: CartItemProps) => {
  return (
    <div className="d-flex gap-3 pb-4 mb-4 border-bottom">
      <img
        src={image}
        className="rounded flex-shrink-0"
        width="100"
        alt="Product"
      />

      <div className="flex-grow-1">
        <p className="fw-semibold mb-1">{name}</p>
        <small className="text-muted d-block">Color:{color}</small>
        <small className="text-muted d-block mb-3">Size: {size}</small>

        <div
          className="input-group input-group-sm"
          style={{ maxWidth: '120px' }}
        >
          <button
            onClick={() => decreaseQuantity(id)}
            className="btn btn-secondary"
            type="button"
          >
            −
          </button>
          <input
            type="text"
            className="form-control text-center"
            value={quantity}
            readOnly
          />
          <button
            onClick={() => increaseQuantity(id)}
            className="btn btn-secondary"
            type="button"
          >
            +
          </button>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-between align-items-end text-end">
        <strong>${price}</strong>
        <button
          onClick={() => removeProduct(id)}
          className="btn btn-link text-danger p-0 mt-auto text-decoration-none"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

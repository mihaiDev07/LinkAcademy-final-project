import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  color: string;
  size: string;
  quantity: number;
};

type CartItemInput = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  color?: string;
  size?: string;
  quantity?: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItemInput) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'ecommerce-cart';

const readStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error('Failed to read cart from local storage', error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    readStoredCart(),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItemInput) => {
    setCartItems((currentItems) => {
      const itemColor = item.color ?? 'N/A';
      const itemSize = item.size ?? 'One Size';
      const itemQuantity =
        item.quantity && item.quantity > 0 ? item.quantity : 1;

      const existingItem = currentItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === itemColor &&
          cartItem.size === itemSize,
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === itemColor &&
          cartItem.size === itemSize
            ? {
                ...cartItem,
                quantity: cartItem.quantity + itemQuantity,
              }
            : cartItem,
        );
      }

      return [
        ...currentItems,
        {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          color: itemColor,
          size: itemSize,
          quantity: itemQuantity,
        },
      ];
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.id !== id) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [
          {
            ...item,
            quantity: item.quantity - 1,
          },
        ];
      }),
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      itemCount,
    }),
    [cartItems, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

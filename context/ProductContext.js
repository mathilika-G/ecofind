import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '../utils/helpers';
import { AuthContext } from './AuthContext';

export const ProductContext = createContext();

const PRODUCTS_KEY = 'EF_PRODUCTS';
const CART_KEY = 'EF_CART';
const PURCHASES_KEY = 'EF_PURCHASES';

export const ProductProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); // array of productIds
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(PRODUCTS_KEY);
      const rawCart = await AsyncStorage.getItem(CART_KEY);
      const rawPurch = await AsyncStorage.getItem(PURCHASES_KEY);

      if (raw) setProducts(JSON.parse(raw));
      else {
        // seed some demo products
        const seed = [
          { id: 'p1', title: 'Vintage Jacket', description: 'Warm, used once', category: 'Clothing', price: 40, ownerId: 'seed', image: null },
          { id: 'p2', title: 'Wooden Chair', description: 'Solid wood', category: 'Furniture', price: 25, ownerId: 'seed', image: null },
          { id: 'p3', title: 'Used Laptop', description: 'Good condition', category: 'Electronics', price: 200, ownerId: 'seed', image: null }
        ];
        setProducts(seed);
        await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(seed));
      }

      if (rawCart) setCartItems(JSON.parse(rawCart));
      if (rawPurch) setPurchases(JSON.parse(rawPurch));
    })();
  }, []);

  const persist = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const addProduct = async (data) => {
    const newP = { id: generateId(), ...data, ownerId: user?.id || 'anon' };
    const next = [newP, ...products];
    setProducts(next);
    await persist(PRODUCTS_KEY, next);
    return newP;
  };

  const updateProduct = async (id, changes) => {
    const next = products.map((p) => (p.id === id ? { ...p, ...changes } : p));
    setProducts(next);
    await persist(PRODUCTS_KEY, next);
  };

  const deleteProduct = async (id) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    await persist(PRODUCTS_KEY, next);

    // remove from cart if present
    const cartNext = cartItems.filter((cid) => cid !== id);
    setCartItems(cartNext);
    await persist(CART_KEY, cartNext);
  };

  const addToCart = async (productId) => {
    if (!cartItems.includes(productId)) {
      const next = [...cartItems, productId];
      setCartItems(next);
      await persist(CART_KEY, next);
    }
  };

  const removeFromCart = async (productId) => {
    const next = cartItems.filter((p) => p !== productId);
    setCartItems(next);
    await persist(CART_KEY, next);
  };

  const clearCart = async () => {
    setCartItems([]);
    await persist(CART_KEY, []);
  };

  const getCartProducts = () => {
    return cartItems.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  };

  const purchaseCart = async () => {
    const items = getCartProducts();
    const purchased = items.map((i) => ({ ...i, purchasedAt: Date.now() }));
    const nextPurch = [...purchases, ...purchased];
    setPurchases(nextPurch);
    await persist(PURCHASES_KEY, nextPurch);
    await clearCart();
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cartItems,
      addToCart,
      removeFromCart,
      getCartProducts,
      clearCart,
      purchaseCart,
      purchases
    }}>
      {children}
    </ProductContext.Provider>
  );
};

import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartModal = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen,
    totalItems 
  } = useCart();

  const handleQuantityChange = (item, newQuantity) => {
    const quantity = parseInt(newQuantity, 10) || 1;
    updateQuantity(item.id, quantity);
  };

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, delay: 0.2 }
    }
  };

  const modal = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          
          <motion.div 
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 overflow-y-auto"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center">
                  <ShoppingCart className="h-6 w-6 text-red-500 mr-2" />
                  <h2 className="text-xl font-bold text-white">
                    Your Cart <span className="text-gray-400">({totalItems})</span>
                  </h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <ShoppingCart className="h-16 w-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
                    <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li 
                        key={item.id} 
                        className="flex items-center p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3 className="line-clamp-1">{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">{item.material}</p>
                          
                          <div className="mt-2 flex items-center">
                            <select
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item, e.target.value)}
                              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-2 py-1"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                  Qty {num}
                                </option>
                              ))}
                            </select>
                            
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="ml-4 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-800 p-6">
                  <div className="flex justify-between text-base font-medium text-white mb-6">
                    <p>Subtotal</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to="/cart"
                      className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                  <p className="mt-4 text-center text-sm text-gray-400">
                    or{' '}
                    <button
                      type="button"
                      className="text-red-400 font-medium hover:text-red-300 transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </button>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;

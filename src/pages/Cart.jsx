import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaArrowLeft, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    totalItems,
    clearCart 
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10) || 1;
    updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to a checkout page
    alert('Proceeding to checkout!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-800/50 rounded-xl p-8 md:p-12">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-600">
              <FaShoppingCart className="w-full h-full" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to find some amazing swords!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="md:flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Your Cart ({totalItems})</h1>
              <button
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center"
              >
                <FaTrash className="mr-1" />
                Clear Cart
              </button>
            </div>

            <div className="bg-gray-800/50 rounded-xl overflow-hidden">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="border-b border-gray-700 last:border-b-0"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-full sm:w-40 h-40 bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-white">
                                <Link to={`/products/${item.id}`} className="hover:text-red-400 transition-colors">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-400 mt-1">{item.material}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                              aria-label="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus className="h-3 w-3" />
                              </button>
                              <span className="w-10 text-center text-white font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                                disabled={item.quantity >= 10}
                              >
                                <FaPlus className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-semibold text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-400">
                                  ${item.price.toFixed(2)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:w-80 lg:w-96">
            <div className="bg-gray-800/50 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400">
                    {cartTotal > 200 ? 'FREE' : '$19.99'}
                  </span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-white">
                      ${(cartTotal > 200 ? cartTotal : cartTotal + 19.99).toFixed(2)}
                    </span>
                  </div>
                  {cartTotal < 200 && (
                    <p className="text-sm text-green-400 mt-2">
                      Spend ${(200 - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our{' '}
                <a href="#" className="text-gray-400 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-gray-400 hover:underline">Privacy Policy</a>.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-sm font-medium text-white mb-3">We Accept</h3>
                <div className="flex space-x-4">
                  <div className="h-8 w-12 bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-xs font-medium">VISA</span>
                  </div>
                  <div className="h-8 w-12 bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-xs font-medium">MC</span>
                  </div>
                  <div className="h-8 w-12 bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-xs font-medium">AMEX</span>
                  </div>
                  <div className="h-8 w-12 bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-xs font-medium">PP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Secure Checkout</h3>
              <p className="text-sm text-gray-400 mb-4">
                Your payment information is encrypted and secure. We don't store your credit card details.
              </p>
              <div className="flex items-center space-x-2">
                <div className="text-green-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

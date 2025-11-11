import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <motion.div 
      className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-red-500/50"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            aria-label="Add to cart"
          >
            <FaShoppingCart className="text-lg" />
          </button>
          <Link 
            to={`/products/${product.id}`}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
            aria-label="View details"
          >
            <FaEye className="text-lg" />
          </Link>
        </div>
        
        {/* Category Badge */}
        <span className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-gray-400 text-sm">{product.material}</p>
          </div>
          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="text-xs font-medium bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-full transition-colors flex items-center"
          >
            <FaShoppingCart className="mr-1" /> Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

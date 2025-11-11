import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaChevronLeft, FaStar, FaRegStar, FaPlus, FaMinus, FaFacebook, FaTwitter, FaPinterest, FaEnvelope } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

// Sample product data with proper image URLs
const products = [
  {
    id: 1,
    name: 'Dragon Slayer Katana',
    category: 'katana',
    price: 349.99,
    material: '1095 Carbon Steel',
    description: 'A masterfully crafted katana with a razor-sharp edge, perfect for both display and practice. The blade features a beautiful hamon line and comes with a traditional black lacquered saya.',
    specifications: {
      bladeLength: '28 inches',
      totalLength: '40 inches',
      weight: '2.5 lbs',
      bladeMaterial: '1095 Carbon Steel',
      handleMaterial: 'Wood with genuine ray skin and black cotton ito',
      tsuba: 'Iron tsuba with dragon motif',
      saya: 'Black lacquered wood with sageo cord',
    },
    features: [
      'Hand-forged 1095 carbon steel blade',
      'Authentic hamon temper line',
      'Full tang construction',
      'Razor sharp edge',
      'Includes maintenance kit',
      'Certificate of authenticity',
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1450&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589985270823-503d93d7c6e9?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584733762236-358d1c7f7d6a?q=80&w=1374&auto=format&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'Medieval Longsword',
    category: 'longsword',
    price: 299.99,
    material: 'High Carbon Steel',
    description: 'A classic medieval longsword with a double-edged blade, designed for both cutting and thrusting. The crossguard and pommel are crafted from solid steel with a leather-wrapped grip for superior handling.',
    specifications: {
      bladeLength: '34 inches',
      totalLength: '45 inches',
      weight: '3.2 lbs',
      bladeMaterial: '1060 High Carbon Steel',
      handleMaterial: 'Wood core with leather wrap',
      crossguard: 'Steel with decorative quillons',
      pommel: 'Steel with peened construction',
    },
    features: [
      'Hand-forged high carbon steel blade',
      'Full tang construction',
      'Leather-wrapped grip',
      'Includes leather scabbard',
      'Battle-ready construction',
      'Perfect for reenactment or display',
    ],
    rating: 4.7,
    reviews: 98,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1614631839750-6a2b8d7e1b9a?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614631839750-6a2b8d7e1b9a?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'Viking Sword',
    category: 'viking',
    price: 279.99,
    material: '5160 Spring Steel',
    description: 'Inspired by historical Viking swords, this weapon features a pattern-welded blade with a distinctive fuller for reduced weight and improved balance. The hilt is crafted from hardwood with steel fittings.',
    specifications: {
      bladeLength: '30 inches',
      totalLength: '38 inches',
      weight: '2.8 lbs',
      bladeMaterial: '5160 Spring Steel',
      handleMaterial: 'Hardwood with steel fittings',
      guard: 'Steel with curved quillons',
      pommel: 'Steel with peened construction',
    },
    features: [
      'Pattern-welded blade',
      'Full tang construction',
      'Hardwood grip with steel fittings',
      'Includes leather-wrapped wooden scabbard',
      'Historically accurate design',
      'Perfect for collectors and reenactors',
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1589985270823-503d93d7c6e9?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1450&auto=format&fit=crop',
    ],
  },
  {
    id: 4,
    name: 'Tactical Wakizashi',
    category: 'wakizashi',
    price: 249.99,
    material: '1095/15n20 Damascus Steel',
    description: 'A modern tactical take on the traditional Japanese wakizashi. This short sword features a stunning Damascus steel blade with a blackened steel tsuba and black cord-wrapped handle for a sleek, modern look.',
    specifications: {
      bladeLength: '18 inches',
      totalLength: '26 inches',
      weight: '2.1 lbs',
      bladeMaterial: '1095/15n20 Damascus Steel',
      handleMaterial: 'Wood with black cotton ito wrap',
      tsuba: 'Blackened steel with geometric design',
      saya: 'Black lacquered wood with sageo cord',
    },
    features: [
      'Hand-forged Damascus steel blade',
      'Distinctive pattern welding',
      'Full tang construction',
      'Black cord-wrapped handle',
      'Includes black lacquered saya',
      'Perfect for collectors and martial artists',
    ],
    rating: 4.8,
    reviews: 87,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1450&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589985270823-503d93d7c6e9?q=80&w=1374&auto=format&fit=crop',
    ],
  },
  {
    id: 5,
    name: 'Claymore Greatsword',
    category: 'greatsword',
    price: 399.99,
    material: '5160 High Carbon Steel',
    description: 'A massive two-handed claymore sword inspired by Scottish highlanders. This impressive weapon features a broad, double-edged blade with a distinctive crossguard and a leather-wrapped grip for a secure two-handed hold.',
    specifications: {
      bladeLength: '42 inches',
      totalLength: '55 inches',
      weight: '5.5 lbs',
      bladeMaterial: '5160 High Carbon Steel',
      handleMaterial: 'Wood core with leather wrap',
      crossguard: 'Steel with down-sloping quillons',
      pommel: 'Steel with peened construction',
    },
    features: [
      'Massive two-handed design',
      'Full tang construction',
      'Leather-wrapped grip',
      'Includes leather-wrapped wooden scabbard',
      'Perfect for display or reenactment',
      'Certificate of authenticity included',
    ],
    rating: 4.9,
    reviews: 112,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1450&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589985270823-503d93d7c6e9?q=80&w=1374&auto=format&fit=crop',
    ],
  },
  {
    id: 6,
    name: 'Roman Gladius',
    category: 'gladius',
    price: 229.99,
    material: '1080 High Carbon Steel',
    description: 'A faithful reproduction of the classic Roman gladius, the standard sidearm of the Roman legionaries. This short sword features a wide, double-edged blade with a distinctive point for thrusting attacks.',
    specifications: {
      bladeLength: '20 inches',
      totalLength: '28 inches',
      weight: '2.4 lbs',
      bladeMaterial: '1080 High Carbon Steel',
      handleMaterial: 'Wood with bone grip plates',
      guard: 'Steel with rounded profile',
      pommel: 'Steel with peened construction',
    },
    features: [
      'Historically accurate design',
      'Full tang construction',
      'Bone grip plates with brass pins',
      'Includes leather scabbard with brass fittings',
      'Perfect for reenactment or display',
      'Battle-ready construction',
    ],
    rating: 4.6,
    reviews: 78,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1589985270823-503d93d7c6e9?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1450&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
    ],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));
  
  // If product not found, redirect to 404 or products page
  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);
  
  if (!product) {
    return null; // or a loading spinner
  }
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return; // Limit to 10 items
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Show a toast notification
  };
  
  const handleImageHover = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };
  
  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FaChevronLeft className="mr-2" />
            Back to Products
          </button>
        </div>
        
        {/* Product Section */}
        <div className="bg-gray-800/50 rounded-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 p-6">
            {/* Product Images */}
            <div className="mb-8 lg:mb-0">
              <div 
                className="relative overflow-hidden rounded-lg bg-black aspect-square mb-4 cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleImageHover}
              >
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
                {isZoomed && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-sm">
                    Scroll to zoom | Click to zoom out
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-md overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-red-500' 
                        : 'border-transparent hover:border-gray-600'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:pl-8">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-900/50">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {renderRating(product.rating)}
                </div>
                <span className="text-sm text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="text-3xl font-bold text-white mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-300 mb-8">{product.description}</p>
              
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Material</h3>
                <p className="text-white">{product.material}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-700 pt-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                      disabled={quantity <= 1}
                    >
                      <FaMinus className="h-3 w-3" />
                    </button>
                    <span className="w-12 text-center text-white font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                      disabled={quantity >= 10}
                    >
                      <FaPlus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>
                
                {!product.inStock && (
                  <p className="mt-3 text-sm text-red-400">
                    Out of stock. Contact us for availability.
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-4 border-t border-gray-700 pt-6">
                <span className="text-sm text-gray-400">Share:</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    <FaFacebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                    <FaPinterest className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                    <FaEnvelope className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="border-t border-gray-700">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      true ? 'border-red-500 text-red-500' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      false ? 'border-red-500 text-red-500' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      false ? 'border-red-500 text-red-500' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    Reviews ({product.reviews})
                  </button>
                </nav>
              </div>
              
              <div className="py-8">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-white mb-4">Product Description</h3>
                  <p className="text-gray-300 mb-6">
                    {product.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 mt-8">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-gray-400 w-40 flex-shrink-0">
                          {key.split(/(?=[A-Z])/).join(' ')}
                        </span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 mt-8">Care Instructions</h3>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li>Wipe the blade with a clean, dry cloth after each use</li>
                    <li>Apply a thin coat of oil to the blade when storing for extended periods</li>
                    <li>Store in a dry place to prevent rust and corrosion</li>
                    <li>Do not use harsh chemicals or abrasives to clean the blade</li>
                    <li>Keep out of reach of children</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-colors">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-medium mb-1 group-hover:text-red-400 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-red-400 font-semibold">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-400">
                              {relatedProduct.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

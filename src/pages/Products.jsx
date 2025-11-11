import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

// Sample product data - in a real app, this would come from an API
const allProducts = [
  // Katanas
  {
    id: 1,
    name: 'Dragon Slayer Katana',
    category: 'katana',
    price: 349.99,
    material: '1095 Carbon Steel',
    rating: 4.8,
    reviews: 124,
    featured: true,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1450&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Black Lotus Katana',
    category: 'katana',
    price: 399.99,
    material: 'T10 Tool Steel',
    rating: 4.9,
    reviews: 98,
    featured: true,
    image: 'https://images.unsplash.com/photo-1584733762236-358d1c7f7d6a?q=80&w=1374&auto=format&fit=crop',
  },
  // Medieval Swords
  {
    id: 3,
    name: 'Knightly Longsword',
    category: 'medieval',
    price: 299.99,
    material: '5160 Spring Steel',
    rating: 4.7,
    reviews: 87,
    featured: true,
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Viking Battle Axe',
    category: 'medieval',
    price: 249.99,
    material: '1060 High Carbon Steel',
    rating: 4.6,
    reviews: 76,
    featured: true,
    image: 'https://images.unsplash.com/photo-1584733762236-358d1c7f7d6a?q=80&w=1374&auto=format&fit=crop',
  },
  // Fantasy Swords
  {
    id: 5,
    name: 'Elven Dagger',
    category: 'fantasy',
    price: 199.99,
    material: 'Damascus Steel',
    rating: 4.9,
    reviews: 156,
    featured: true,
    image: 'https://images.unsplash.com/photo-1589985270823-503d93d7c6e9?q=80&w=1374&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Dwarven Battle Axe',
    category: 'fantasy',
    price: 279.99,
    material: '5160 High Carbon Steel',
    rating: 4.7,
    reviews: 112,
    featured: false,
    image: 'https://images.unsplash.com/photo-1584733762236-358d1c7f7d6a?q=80&w=1374&auto=format&fit=crop',
  },
  // More products...
  {
    id: 7,
    name: 'Samurai Wakizashi',
    category: 'katana',
    price: 279.99,
    material: '1095 Carbon Steel',
    rating: 4.8,
    reviews: 92,
    featured: false,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1450&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Claymore Greatsword',
    category: 'medieval',
    price: 349.99,
    material: '5160 Spring Steel',
    rating: 4.9,
    reviews: 78,
    featured: false,
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13c?q=80&w=1470&auto=format&fit=crop',
  },
];

const categories = [
  { id: 'all', name: 'All Swords' },
  { id: 'katana', name: 'Katanas' },
  { id: 'medieval', name: 'Medieval Swords' },
  { id: 'fantasy', name: 'Fantasy Blades' },
];

const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: '0-100', name: 'Under $100' },
  { id: '100-200', name: '$100 - $200' },
  { id: '200-300', name: '$200 - $300' },
  { id: '300+', name: 'Over $300' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
  });

  // Get filter values from URL or use defaults
  const category = searchParams.get('category') || 'all';
  const price = searchParams.get('price') || 'all';
  const search = searchParams.get('search') || '';

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Filter by category
    const categoryMatch = category === 'all' || product.category === category;
    
    // Filter by price range
    let priceMatch = true;
    if (price !== 'all') {
      const [min, max] = price.includes('+')
        ? [parseInt(price.replace('+', '')), Infinity]
        : price.split('-').map(Number);
      
      priceMatch = product.price >= min && product.price <= max;
    }
    
    // Filter by search query
    const searchMatch = 
      searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && priceMatch && searchMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // featured
        return b.featured - a.featured || b.rating - a.rating;
    }
  });

  // Update URL when filters change
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams);
    
    if (value === 'all') {
      params.delete(key);
    } else if (value === '') {
      params.delete('search');
    } else {
      params.set(key, value);
    }
    
    // Reset to first page when filters change
    params.delete('page');
    
    setSearchParams(params);
    
    // Close mobile filters after selection
    if (window.innerWidth < 768) {
      setMobileFiltersOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters('search', searchQuery);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Collection</h1>
          <p className="text-gray-400">Discover our handcrafted selection of premium swords</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter dialog */}
          <div className="md:hidden mb-6">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-lg border border-gray-700"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FaFilter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            <AnimatePresence>
              {mobileFiltersOpen && (
                <>
                  <div 
                    className="fixed inset-0 bg-black/70 z-40"
                    onClick={() => setMobileFiltersOpen(false)}
                  />
                  <motion.div 
                    className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-gray-900 z-50 p-6 overflow-y-auto"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'tween', ease: 'easeInOut' }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Filters</h2>
                      <button 
                        className="text-gray-400 hover:text-white"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <FaTimes className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Search */}
                    <div className="mb-6">
                      <form onSubmit={handleSearch} className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </form>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                      <div 
                        className="flex items-center justify-between cursor-pointer mb-3"
                        onClick={() => toggleFilterSection('category')}
                      >
                        <h3 className="font-medium text-white">Categories</h3>
                        {expandedFilters.category ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                      
                      {expandedFilters.category && (
                        <div className="space-y-2 pl-2">
                          {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center">
                              <input
                                id={`mobile-category-${cat.id}`}
                                name="category"
                                type="radio"
                                className="h-4 w-4 border-gray-600 rounded text-red-600 focus:ring-red-500"
                                checked={category === cat.id}
                                onChange={() => updateFilters('category', cat.id)}
                              />
                              <label
                                htmlFor={`mobile-category-${cat.id}`}
                                className={`ml-3 text-sm ${
                                  category === cat.id ? 'text-red-400' : 'text-gray-300'
                                }`}
                              >
                                {cat.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price Range */}
                    <div>
                      <div 
                        className="flex items-center justify-between cursor-pointer mb-3"
                        onClick={() => toggleFilterSection('price')}
                      >
                        <h3 className="font-medium text-white">Price Range</h3>
                        {expandedFilters.price ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                      
                      {expandedFilters.price && (
                        <div className="space-y-2 pl-2">
                          {priceRanges.map((range) => (
                            <div key={range.id} className="flex items-center">
                              <input
                                id={`mobile-price-${range.id}`}
                                name="price"
                                type="radio"
                                className="h-4 w-4 border-gray-600 rounded text-red-600 focus:ring-red-500"
                                checked={price === range.id}
                                onChange={() => updateFilters('price', range.id)}
                              />
                              <label
                                htmlFor={`mobile-price-${range.id}`}
                                className={`ml-3 text-sm ${
                                  price === range.id ? 'text-red-400' : 'text-gray-300'
                                }`}
                              >
                                {range.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-8">
                      <button
                        type="button"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        onClick={() => {
                          setSearchParams({});
                          setSearchQuery('');
                        }}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <div>
                <h3 className="font-medium text-white mb-3">Search</h3>
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </form>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium text-white mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center">
                      <input
                        id={`category-${cat.id}`}
                        name="category"
                        type="radio"
                        className="h-4 w-4 border-gray-600 rounded text-red-600 focus:ring-red-500"
                        checked={category === cat.id}
                        onChange={() => updateFilters('category', cat.id)}
                      />
                      <label
                        htmlFor={`category-${cat.id}`}
                        className={`ml-3 text-sm ${
                          category === cat.id ? 'text-red-400' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-white mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        id={`price-${range.id}`}
                        name="price"
                        type="radio"
                        className="h-4 w-4 border-gray-600 rounded text-red-600 focus:ring-red-500"
                        checked={price === range.id}
                        onChange={() => updateFilters('price', range.id)}
                      />
                      <label
                        htmlFor={`price-${range.id}`}
                        className={`ml-3 text-sm ${
                          price === range.id ? 'text-red-400' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg border border-gray-700 transition-colors"
                  onClick={() => {
                    setSearchParams({});
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <p className="text-gray-400 mb-4 sm:mb-0">
                Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
                {category !== 'all' && (
                  <span> in <span className="text-red-400">
                    {categories.find(c => c.id === category)?.name}
                  </span></span>
                )}
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm font-medium text-gray-400 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {sortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      layout
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-800/50 rounded-xl">
                <div className="max-w-md mx-auto
                ">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-white">No products found</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    We couldn't find any products matching your filters. Try adjusting your search or filter criteria.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => {
                        setSearchParams({});
                        setSearchQuery('');
                      }}
                    >
                      <FaTimes className="-ml-1 mr-2 h-5 w-5" />
                      Clear all filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

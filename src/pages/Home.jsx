import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';

// Sample product data - in a real app, this would come from an API
const featuredProducts = [
  {
    id: 1,
    name: 'Dragon Slayer Katana',
    category: 'Katana',
    price: 349.99,
    material: '1095 Carbon Steel',
    rating: 4.8,
    reviews: 124,
    image: '/assets/key.jpg',
  },
  {
    id: 2,
    name: 'Knightly Longsword',
    category: 'Medieval',
    price: 299.99,
    material: '5160 Spring Steel',
    rating: 4.7,
    reviews: 98,
    image: '/assets/key1.jpg',
  },
  {
    id: 3,
    name: 'Elven Dagger',
    category: 'Fantasy',
    price: 199.99,
    material: 'Damascus Steel',
    rating: 4.9,
    reviews: 156,
    image: '/assets/key2.jpg',
  },
  {
    id: 4,
    name: 'Viking Battle Axe',
    category: 'Medieval',
    price: 279.99,
    material: '1060 High Carbon Steel',
    rating: 4.6,
    reviews: 87,
    image: '/assets/key3.jpg',
  },
];

const Home = () => {
  return (
    <div className="bg-gray-900">
      <HeroSection />
      
      {/* Featured Collection */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
              Featured Collection
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover our handpicked selection of premium swords, each crafted with precision and care by master swordsmiths.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            to="/products" 
            className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/20"
          >
            View All Products
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Choose <span className="text-red-500">SwordStore</span>?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authentic Craftsmanship',
                description: 'Each sword is handcrafted using traditional techniques passed down through generations of master swordsmiths.',
                icon: '⚔️'
              },
              {
                title: 'Premium Materials',
                description: 'We use only the finest high-carbon steel and materials to ensure durability and authenticity.',
                icon: '🔪'
              },
              {
                title: 'Lifetime Warranty',
                description: 'All our swords come with a lifetime warranty against manufacturing defects.',
                icon: '🛡️'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 p-8 rounded-xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568031813264-d394c5d12bcc?q=80&w=1471&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Find Your Perfect Blade?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore our extensive collection of handcrafted swords and find the perfect addition to your collection.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/products" 
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/20"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="inline-block bg-transparent border-2 border-white/20 hover:border-red-500 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:bg-white/5"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

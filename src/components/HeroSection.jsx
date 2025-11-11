import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/assets/key4.jpg')] bg-cover bg-center" />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="block mb-2">Forged in Excellence,</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              Wielded by Warriors
            </span>
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our exclusive collection of handcrafted swords, where tradition meets modern craftsmanship.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/products" 
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/20"
              >
                Explore Collection
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/products?category=featured" 
                className="inline-block bg-transparent border-2 border-white/20 hover:border-red-500 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:bg-white/5"
              >
                Featured Blades
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Animated Sword Slash */}
        <motion.div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [30, 0, 0, -30],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/20"
          >
            <path 
              d="M6.92 5H5L14 14L15 15L22 8V11.5L12 21.5L2.5 12L6.92 5Z" 
              fill="currentColor"
              className="drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg 
            className="w-8 h-8 text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

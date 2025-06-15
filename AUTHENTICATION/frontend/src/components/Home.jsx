import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth() || { user: null };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-32 px-4 text-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://source.unsplash.com/1600x900/?pizza')",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Hot, Fresh & Delicious</h1>
          <p className="text-xl mb-8">Order your favorite pizza online and get it delivered right to your doorstep!</p>
          
          {user ? (
            <Link 
              to="/menu" 
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-block"
            >
              Order Now
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors inline-block"
              >
                Login
              </Link>
              <Link 
                to="/menu" 
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors inline-block"
              >
                Order as Guest
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl mb-4">🍕</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Quality Ingredients</h3>
              <p className="text-gray-600">We use only the freshest and highest quality ingredients for our pizzas.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">Get your pizza delivered within 30 minutes or it's free!</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Best Prices</h3>
              <p className="text-gray-600">Enjoy the best pizzas at the most affordable prices in town.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Pizzas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Pizza Cards */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full">
                <img 
                  src="https://source.unsplash.com/500x300/?pepperoni-pizza" 
                  alt="Pepperoni Pizza" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Pepperoni</h3>
                <p className="text-gray-600 mb-4">Classic pepperoni pizza with mozzarella cheese and tomato sauce.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">$12.99</span>
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full">
                <img 
                  src="https://source.unsplash.com/500x300/?margherita-pizza" 
                  alt="Margherita Pizza" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Margherita</h3>
                <p className="text-gray-600 mb-4">Classic Italian pizza with tomatoes, mozzarella cheese, and basil.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">$10.99</span>
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full">
                <img 
                  src="https://source.unsplash.com/500x300/?bbq-chicken-pizza" 
                  alt="BBQ Chicken Pizza" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">BBQ Chicken</h3>
                <p className="text-gray-600 mb-4">Grilled chicken, red onions, and BBQ sauce with mozzarella cheese.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">$14.99</span>
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* View All Button */}
          <div className="text-center">
            <Link 
              to="/menu" 
              className="px-8 py-3 border border-gray-800 text-gray-800 font-semibold rounded-md hover:bg-gray-800 hover:text-white transition-colors inline-block"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
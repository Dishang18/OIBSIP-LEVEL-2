import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Pizza Delight</h3>
            <p className="mb-4">Delicious pizzas made with fresh ingredients.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/" className="text-white hover:text-red-500">Home</Link></li>
              <li className="mb-2"><Link to="/menu" className="text-white hover:text-red-500">Menu</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">123 Pizza St, Foodville</p>
            <p className="mb-2">(555) 123-4567</p>
            <p className="mb-2">info@pizzadelight.com</p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full p-2 mb-2 text-gray-800 rounded" 
                required 
              />
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>© {currentYear} Pizza Delight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
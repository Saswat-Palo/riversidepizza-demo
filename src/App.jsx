import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Menu, X, ChevronRight, Star, Gift, Sun, Moon } from 'lucide-react';

import logo from './assets/Riverside-Logo-1.png';

const menuData = [
  {
    category: "Gourmet Pizzas",
    items: [
      { name: "Riverside Special Pizza", desc: "Pepperoni, sausage, hamburger, onions, green peppers, mushrooms, black olives.", price: "$17.45+" },
      { name: "Margherita", desc: "Fresh mozzarella, fresh tomatoes, and fresh basil.", price: "$16.45+" },
      { name: "Meat Lovers", desc: "Sausage, pepperoni, hamburger, bacon, and ham.", price: "$17.45+" },
      { name: "Veggie Delight", desc: "Fresh tomatoes, onions, green peppers, mushrooms, black olives, spinach, and broccoli.", price: "$17.45+" }
    ]
  },
  {
    category: "Subs & Sandwiches",
    items: [
      { name: "Riverside Famous Italian", desc: "Ham, salami, pepperoni, provolone, lettuce, tomato, onion and oil/vinegar.", price: "$12.99" },
      { name: "Steak & Cheese", desc: "Classic shaved steak with American cheese.", price: "$13.99" },
      { name: "Chicken Parm", desc: "Crispy chicken, cheese sauce, provolone, and toasted.", price: "$13.99" },
      { name: "The Fenway", desc: "Fenway Sausage, onions, peppers, red sauce and American cheese toasted.", price: "$14.99" }
    ]
  },
  {
    category: "Appetizers",
    items: [
      { name: "Chicken Wings", desc: "Tender and juicy wings, perfect for snacking.", price: "$12.25" },
      { name: "Mozzarella Sticks", desc: "Served with homemade Marinara sauce.", price: "$9.99" },
      { name: "Garlic Bread", desc: "Freshly baked bread infused with garlic.", price: "$4.99" },
      { name: "Loaded Potato Skins", desc: "Large homemade skins topped with cheese and bacon. Served with sour cream.", price: "$9.99" }
    ]
  }
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 gap-4">
            
            {/* 1. Logo (Left) - Added shrink-0 so it doesn't get squished */}
            <div className="flex items-center z-10 shrink-0">
              <img 
                src={logo} 
                alt="Riverside Pizza Logo" 
                className="h-16 w-auto object-contain drop-shadow-md transition-transform hover:scale-105" 
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} 
              />
              <span className="hidden playfair text-2xl font-bold ml-2 text-red-600">Riverside Pizza</span>
            </div>

            {/* 2. Phone Number (Center) - Using flex-1 to naturally center without absolute positioning */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-3 text-gray-800 dark:text-gray-200 transition-colors">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full text-red-600">
                <Phone size={18} fill="currentColor" />
              </div>
              <span className="font-medium text-lg tracking-wider hover:text-red-600 transition-colors cursor-default">(781) 329-3329</span>
            </div>

            {/* 3. Desktop Nav (Right) */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center z-10 shrink-0">
              <a href="#about" className="text-sm font-medium hover:text-red-500 transition-colors">About Us</a>
              <a href="#menu" className="text-sm font-medium hover:text-red-500 transition-colors">Menu</a>
              <a href="#location" className="text-sm font-medium hover:text-red-500 transition-colors">Location</a>
              <a href="#rewards" className="text-sm font-medium hover:text-red-500 transition-colors">Rewards</a>
              
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg shadow-red-500/30">
                Order Online
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 z-10">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t dark:border-gray-700 absolute w-full bg-white dark:bg-gray-800 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <div className="flex items-center gap-2 px-3 py-3 text-red-600 font-bold border-b dark:border-gray-700 mb-1">
                <Phone size={18} fill="currentColor" />
                <span>(781) 329-3329</span>
              </div>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">About Us</a>
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Menu</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Location</a>
              <a href="#rewards" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Rewards</a>
              <button className="mt-2 w-full bg-red-600 text-white px-3 py-2 rounded-md font-medium">Order Online Now</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <p className="text-red-400 font-semibold tracking-wider uppercase mb-2">Dedham's Favorite Since Day One</p>
          <h1 className="playfair text-5xl md:text-7xl text-white font-bold mb-6 drop-shadow-lg">Great Taste, Quality<br/>& Friendly Service</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">Serving Dedham, MA with the greatest tasting hand-tossed pizza, fresh over-stuffed subs, and crisp salads at reasonable prices.</p>
          <div className="flex gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all transform hover:-translate-y-1 flex items-center shadow-lg shadow-red-500/40">
              Start Your Order <ChevronRight className="ml-2" size={20} />
            </button>
            <a href="#menu" className={`px-8 py-3 rounded-full text-lg font-medium transition-all transform hover:-translate-y-1 flex items-center border-2 ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-white text-white hover:bg-white hover:text-gray-900'} backdrop-blur-sm`}>
              View Menu
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="playfair text-4xl font-bold mb-6 text-red-600">Welcome to Riverside Pizza</h2>
          <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We have been serving the local community the greatest tasting food with the friendliest service in the neighborhood. Whether you are craving our famous hand-tossed pizzas, fresh over-stuffed subs, or crisp salads, our fast and dependable delivery service brings it right to your door.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className={`py-20 px-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-500 font-bold tracking-widest uppercase text-sm mb-2">Made Fresh Daily</p>
            <h2 className="playfair text-4xl md:text-5xl font-bold">Our Menu</h2>
          </div>

          <div className="space-y-16">
            {menuData.map((section, index) => (
              <div key={index}>
                <h3 className={`text-2xl font-bold mb-8 pb-2 border-b-2 inline-block ${darkMode ? 'border-gray-700 text-gray-200' : 'border-gray-300 text-gray-800'}`}>
                  {section.category}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {section.items.map((item, i) => (
                    <div key={i} className={`p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg playfair">{item.name}</h4>
                        <span className="text-red-600 font-bold whitespace-nowrap ml-4">{item.price}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all transform hover:-translate-y-1 shadow-lg shadow-red-500/40">
              Order Full Menu Online
            </button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="playfair text-4xl font-bold mb-4">Visit Us</h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Everything you need to get your hands on a fresh slice</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Info Cards */}
            <div className="flex flex-col gap-6 justify-center">
              <div className={`p-8 rounded-2xl shadow-xl transition-transform hover:-translate-y-1 ${darkMode ? 'bg-gray-900 shadow-black/50' : 'bg-white shadow-gray-200/50'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-full text-red-600">
                    <Clock size={24} />
                  </div>
                  <h3 className="playfair text-2xl font-bold">Store Hours</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Sun - Wed</span>
                    <span className="font-medium">10:30am - 8:00pm</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Thursday</span>
                    <span className="font-medium">10:30am - 9:00pm</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Friday</span>
                    <span className="font-medium">10:00am - 9:00pm</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Saturday</span>
                    <span className="font-medium">10:30am - 9:00pm</span>
                  </li>
                </ul>
              </div>

              <div className={`p-8 rounded-2xl shadow-xl transition-transform hover:-translate-y-1 ${darkMode ? 'bg-gray-900 shadow-black/50' : 'bg-white shadow-gray-200/50'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-full text-red-600">
                    <Phone size={24} />
                  </div>
                  <h3 className="playfair text-2xl font-bold">Contact</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium">7 Needham St</p>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Dedham, MA 02026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-red-500 flex-shrink-0" size={20} />
                    <p className="font-medium text-lg">(781) 329-3329</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-[400px] md:h-auto min-h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2952.8806296339174!2d-71.1735160234796!3d42.25959664142168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37fc76b059ef9%3A0xc68297b69d8b3a0!2sRiverside%20Pizza%20%26%20Subs!5e0!3m2!1sen!2sus!4v1716315200000!5m2!1sen!2sus" 
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23dc2626\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center relative z-10">
          
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-6 font-semibold">
              <Star size={18} fill="currentColor" /> Riverside Rewards
            </div>
            <h2 className="playfair text-4xl md:text-5xl font-bold mb-6">Earn Free Pizza.</h2>
            <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join our loyalty program today. For every $1.00 spent, you earn 1 point. Sign up now and receive a 25 point bonus instantly!
            </p>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="bg-orange-100 p-3 rounded-full text-orange-500"><Gift size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">200 Points</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Free Small Cheese Pizza</p>
                </div>
              </div>
              <div className={`p-4 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="bg-red-100 p-3 rounded-full text-red-600"><Star size={24} fill="currentColor" /></div>
                <div>
                  <h4 className="font-bold text-lg">500 Points</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Free Large Cheese Pizza</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-md p-8 rounded-3xl shadow-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <div className="flex mb-8 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
              <button 
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${authMode === 'login' ? 'bg-white dark:bg-gray-700 text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${authMode === 'register' ? 'bg-white dark:bg-gray-700 text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                Sign Up
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {authMode === 'register' && (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                  <input type="text" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="John Doe" />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                <input type="email" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="you@example.com" />
              </div>
              {authMode === 'register' && (
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <input type="tel" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="(555) 000-0000" />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                <input type="password" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="••••••••" />
              </div>
              
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-red-500/30 mt-2">
                {authMode === 'login' ? 'Sign In to Order' : 'Create Account & Earn Points'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="playfair text-2xl text-white font-bold mb-4">Riverside Pizza</h3>
          <p className="mb-6 max-w-md mx-auto">Great taste, quality and service for the Dedham community.</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="hover:text-white transition-colors">Order Tracker</a>
            <a href="#" className="hover:text-white transition-colors">Rewards</a>
            <a href="#" className="hover:text-white transition-colors">Feedback</a>
          </div>
          <p className="text-sm">&copy; 2026 Riverside Pizza. All Rights Reserved. Powered by FoodTec Solutions.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
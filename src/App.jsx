import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Menu, X, ChevronRight, Star, Gift, Sun, Moon, Facebook, Instagram, Truck, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';

import logo from './assets/Riverside-Logo-1.png';

// --- PIZZA SLICE LOGIC ---
const SL = [
  {n:'Veggie',t:'veggie',d:'The pie regulars bring up first in reviews.'},
  {n:'Margherita',t:'marg',d:'Light, crispy crust with tomato and plenty of mozzarella.'},
  {n:'Spinach and pepperoni',t:'spin',d:'Savory and not heavy, slice after slice.'},
  {n:'Hawaiian',t:'haw',d:'A customer favorite, sweet and salty.'},
  {n:'Pepperoni',t:'pep',d:'The classic, crisp at the edges.'},
  {n:'Greek',t:'greek',d:'Feta, olives and onion on a hand-tossed base.'},
  {n:'Texas BBQ',t:'bbq',d:'Smoky sauce, chicken and a little sweetness.'},
  {n:'Buffalo chicken',t:'buff',d:'Also stuffed into calzones people drive back for.'}
];

const cx = 200, cy = 200;
const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
const wedge = (r, a0, a1) => {
  const p0 = pt(r, a0), p1 = pt(r, a1);
  return `M${cx} ${cy} L${p0[0]} ${p0[1]} A${r} ${r} 0 0 1 ${p1[0]} ${p1[1]} Z`;
};

const seeded = (s) => () => {
  s = (s * 9301 + 49297) % 233280;
  return s / 233280;
};

const getToppings = (t, a0, a1, rnd) => {
  const elements = [];
  const cnt = t === 'pep' ? 6 : 9;
  for (let i = 0; i < cnt; i++) {
    const r = 48 + rnd() * 92;
    const a = a0 + 0.13 + rnd() * (a1 - a0 - 0.26);
    const [x, y] = pt(r, a);
    const key = `${t}-${i}`;

    if (t === 'pep') {
      elements.push(<circle key={`1-${key}`} cx={x} cy={y} r={11} fill="#B3261E" />);
      elements.push(<circle key={`2-${key}`} cx={x-2} cy={y-2} r={3} fill="#D9483B" />);
    } else if (t === 'veggie') {
      const k = i % 3;
      if (k === 0) elements.push(<circle key={key} cx={x} cy={y} r={8} fill="none" stroke="#2F7D4F" strokeWidth={3} />);
      else if (k === 1) elements.push(<circle key={key} cx={x} cy={y} r={5} fill="#3B2A2A" />);
      else elements.push(<circle key={key} cx={x} cy={y} r={6} fill="#D63A24" />);
    } else if (t === 'marg') {
      if (i % 3 === 0) elements.push(<ellipse key={key} cx={x} cy={y} rx={9} ry={5} fill="#2F7D4F" transform={`rotate(${a * 57} ${x} ${y})`} />);
      else elements.push(<circle key={key} cx={x} cy={y} r={9} fill="#E04A32" opacity={0.9} />);
    } else if (t === 'spin') {
      if (i % 2 === 0) elements.push(<ellipse key={key} cx={x} cy={y} rx={10} ry={5} fill="#2E6B3F" transform={`rotate(${i * 40} ${x} ${y})`} />);
      else elements.push(<circle key={key} cx={x} cy={y} r={9} fill="#B3261E" />);
    } else if (t === 'haw') {
      if (i % 2 === 0) elements.push(<rect key={key} x={x-6} y={y-6} width={12} height={12} rx={2} fill="#F7E27A" transform={`rotate(20 ${x} ${y})`} />);
      else elements.push(<rect key={key} x={x-8} y={y-5} width={16} height={10} rx={4} fill="#E9908A" />);
    } else if (t === 'greek') {
      const m = i % 3;
      if (m === 0) elements.push(<circle key={key} cx={x} cy={y} r={5} fill="#3B2A2A" />);
      else if (m === 1) elements.push(<rect key={key} x={x-6} y={y-6} width={12} height={12} fill="#FFFDF5" />);
      else elements.push(<circle key={key} cx={x} cy={y} r={7} fill="none" stroke="#7B3F8C" strokeWidth={3} />);
    } else if (t === 'bbq') {
      if (i % 2 === 0) elements.push(<rect key={key} x={x-8} y={y-6} width={16} height={12} rx={5} fill="#E9C48A" />);
      else elements.push(<path key={key} d={`M${x-10} ${y}q5 -8 10 0t10 0`} stroke="#6B2E12" strokeWidth={4} fill="none" strokeLinecap="round" />);
    } else if (t === 'buff') {
      if (i % 2 === 0) elements.push(<rect key={key} x={x-8} y={y-6} width={16} height={12} rx={5} fill="#EFC98F" />);
      else elements.push(<path key={key} d={`M${x-10} ${y}q5 -8 10 0t10 0`} stroke="#E2571F" strokeWidth={4} fill="none" strokeLinecap="round" />);
    }
  }
  return elements;
};

const dealsData = [
  { platform: "Facebook", icon: <Facebook size={24} />, text: "Mid-Week Madness: 15% OFF on all Gourmet Pizzas every Wednesday!", code: "FBWED15" },
  { platform: "Instagram", icon: <Instagram size={24} />, text: "Tag us in your story and get a FREE Garlic Bread on your next order!", code: "INSTAFREE" }
];

const faqData = [
  { q: "Do you offer gluten-free crusts?", a: "Yes! We offer a cauliflower-based gluten-free crust for all our medium pizzas." },
  { q: "How long does delivery usually take?", a: "Standard delivery takes about 30-45 minutes depending on your location in Dedham." },
  { q: "Can I host a party at Riverside Pizza?", a: "Absolutely! We have large booths perfect for family gatherings. Call us to reserve." }
];

const menuData = [
  {
    category: "Gourmet Pizzas",
    items: [
      { name: "Riverside Special Pizza", desc: "Pepperoni, sausage, hamburger, onions, green peppers, mushrooms.", price: "$17.45+", photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80", tag: null },
      { name: "Margherita", desc: "Light crust, tomato, generous mozzarella.", price: "$16.45+", photo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80", tag: null },
      { name: "Meat Lovers", desc: "Sausage, pepperoni, hamburger, bacon, and ham.", price: "$17.45+", photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80", tag: null },
      { name: "Veggie Delight", desc: "A regular favorite in customer reviews.", price: "$17.45+", photo: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=500&q=80", tag: "Local favorite" },
      { name: "Hawaiian", desc: "Sweet, salty and easy to share.", price: "$15.45+", photo: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80", tag: null },
      { name: "Buffalo Chicken Calzone", desc: "Stuffed full, and a repeat order for many.", price: "$16.99+", photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80", tag: "Local favorite" }
    ]
  },
  {
    category: "Subs & Sandwiches",
    items: [
      { name: "Riverside Famous Italian", desc: "Classic cold cuts, ready to go.", price: "$12.99", photo: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=500&q=80", tag: null },
      { name: "Steak & Cheese", desc: "Hot, stacked and served on a fresh roll.", price: "$13.99", photo: "https://images.unsplash.com/photo-1627308595229-7830f5c90683?auto=format&fit=crop&w=500&q=80", tag: "Local favorite" },
      { name: "Tuna Club", desc: "Piled high, a lunch-hour standby.", price: "$12.99", photo: null, tag: null }
    ]
  },
  {
    category: "Salads & Starters",
    items: [
      { name: "Grilled Chicken Greek Salad", desc: "Big enough to split into two meals.", price: "$14.25", photo: null, tag: "Local favorite" },
      { name: "Chicken Wings", desc: "Order them plain or sauced.", price: "$13.99+", photo: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=500&q=80", tag: null },
      { name: "Mozzarella Sticks", desc: "Crisp outside, stretchy inside.", price: "$11.99", photo: "https://images.unsplash.com/photo-1537284646869-7c88b64e5257?auto=format&fit=crop&w=500&q=80", tag: null }
    ]
  }
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [activeSlice, setActiveSlice] = useState(null);
  const [orders, setOrders] = useState(4);
  
  const pts = 25 + (orders * 30);
  const fillPercentage = Math.min(100, (pts / 500) * 100);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#F5F8FA] text-gray-800'}`}>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Public+Sans:wght@400;500;600&display=swap');
          
          .font-heading { font-family: 'Montserrat', sans-serif; }
          .font-display { font-family: 'Bricolage Grotesque', sans-serif; }
          
          @keyframes drop {
            from { transform: translateY(-40px) rotate(-14deg); opacity: 0; }
            to { transform: none; opacity: 1; }
          }
          .pizza-anim {
            animation: drop 0.9s cubic-bezier(.2,.8,.3,1) both;
            filter: drop-shadow(0 18px 24px rgba(0,0,0,.35));
          }
        `}
      </style>

      {/* Header - Now Beige in Light Mode */}
      <header className={`sticky top-0 z-50 shadow-sm transition-colors duration-300 ${darkMode ? 'bg-[#0A1A2C] text-white' : 'bg-[#FDFBF7] text-[#1A1A1A]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 gap-4">
            
            <div className="flex items-center z-10 shrink-0">
              <img src={logo} alt="Riverside Pizza Logo" className="h-16 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
              <span className={`hidden font-display text-2xl font-black ml-2 tracking-tight ${darkMode ? 'text-white' : 'text-[#D63A24]'}`}>Riverside Pizza</span>
            </div>

            <div className="hidden lg:flex flex-1 justify-center items-center gap-3 transition-colors">
              <div className={`p-2 rounded-full ${darkMode ? 'bg-white/10 text-[#F5C453]' : 'bg-[#FDE8E8] text-[#D63A24]'}`}><Phone size={18} fill="currentColor" /></div>
              <span className={`font-bold text-lg tracking-wider transition-colors cursor-default font-heading ${darkMode ? 'hover:text-[#F5C453]' : 'hover:text-[#D63A24]'}`}>(781) 329-3329</span>
            </div>

            <nav className="hidden md:flex space-x-5 lg:space-x-7 items-center z-10 shrink-0">
              <a href="#about" className={`text-sm font-bold font-heading transition-colors ${darkMode ? 'hover:text-[#F5C453]' : 'hover:text-[#D63A24]'}`}>About Us</a>
              <a href="#menu" className={`text-sm font-bold font-heading transition-colors ${darkMode ? 'hover:text-[#F5C453]' : 'hover:text-[#D63A24]'}`}>Menu</a>
              <a href="#location" className={`text-sm font-bold font-heading transition-colors ${darkMode ? 'hover:text-[#F5C453]' : 'hover:text-[#D63A24]'}`}>Find Us</a>
              <a href="#rewards" className={`text-sm font-bold font-heading transition-colors ${darkMode ? 'hover:text-[#F5C453]' : 'hover:text-[#D63A24]'}`}>Rewards</a>
              
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200'}`}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button className="bg-[#D63A24] hover:bg-[#B72E1B] text-white px-6 py-2 rounded-full font-bold font-heading transition-all transform hover:-translate-y-1 shadow-lg">Order Online</button>
            </nav>

            <div className="md:hidden flex items-center gap-4 z-10">
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200'}`}>{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${darkMode ? 'text-white hover:text-[#F5C453]' : 'text-[#1A1A1A] hover:text-[#D63A24]'}`}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className={`md:hidden border-t absolute w-full shadow-xl ${darkMode ? 'border-white/10 bg-[#14304D]' : 'border-gray-200 bg-[#FDFBF7]'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <div className={`flex items-center gap-2 px-3 py-3 font-bold border-b mb-1 ${darkMode ? 'text-[#F5C453] border-white/10' : 'text-[#D63A24] border-gray-200'}`}>
                <Phone size={18} fill="currentColor" />
                <span className="font-heading">(781) 329-3329</span>
              </div>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-bold font-heading ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>About Us</a>
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-bold font-heading ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>Menu</a>
              <a href="#location" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-bold font-heading ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>Find Us</a>
              <a href="#rewards" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-bold font-heading ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>Rewards</a>
              <button className="mt-2 w-full bg-[#D63A24] text-white px-3 py-2 rounded-md font-bold font-heading">Order Online Now</button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION - Now Beige in Light Mode */}
      <div className={`relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden ${darkMode ? 'bg-[#0A1A2C] text-white' : 'bg-[#FDFBF7] text-[#1A1A1A]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 text-center lg:text-left mt-4 lg:mt-0">
            <div className={`inline-block px-5 py-2 rounded-full mb-6 md:mb-8 ${darkMode ? 'bg-white/10' : 'bg-[#FDE8E8]'}`}>
              <span className={`font-bold font-heading tracking-widest text-xs md:text-sm uppercase flex items-center gap-2 ${darkMode ? 'text-[#7CE0A5]' : 'text-[#D63A24]'}`}>
                <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-[#7CE0A5]' : 'bg-[#D63A24]'}`}></span> Open Now
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-[1.05] tracking-tight">
              Pizza your neighbors keep coming back for.
            </h1>
            
            <p className={`text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed font-heading ${darkMode ? 'opacity-90' : 'text-[#555555]'}`}>
              Hand-tossed pies, stacked subs and big fresh salads from 7 Needham St in Dedham. Pick it up, have it delivered, or we will bring it out to your car.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#D63A24] hover:bg-[#B72E1B] text-white px-8 py-4 rounded-full text-lg font-bold font-heading transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20">
                Order Online Now
              </button>
              <a href="#menu" className={`border-2 px-8 py-4 rounded-full text-lg font-bold font-heading transition-all flex items-center justify-center ${darkMode ? 'border-white/30 hover:bg-white/10 text-white' : 'border-[#D63A24] text-[#D63A24] hover:bg-[#D63A24] hover:text-white'}`}>
                See the menu
              </a>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-md mx-auto flex flex-col items-center">
            <svg id="pizza" className="pizza-anim w-full h-auto overflow-visible focus:outline-none" viewBox="0 0 400 400">
              {SL.map((slice, i) => {
                const a0 = -Math.PI / 2 + i * Math.PI / 4 + 0.012;
                const a1 = a0 + Math.PI / 4 - 0.024;
                const mid = (a0 + a1) / 2;
                const tx = Math.cos(mid) * 16;
                const ty = Math.sin(mid) * 16;
                const rnd = seeded(i * 77 + 13);
                const isActive = activeSlice === i;
                
                return (
                  <g
                    key={i}
                    className="cursor-pointer transition-transform duration-300 outline-none"
                    style={{ transform: isActive ? `translate(${tx}px, ${ty}px)` : 'none' }}
                    onClick={() => setActiveSlice(i)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveSlice(i)}
                    tabIndex={0}
                  >
                    <path d={wedge(186, a0, a1)} fill="#C9853A" />
                    <path d={wedge(164, a0, a1)} fill="#F2C14E" className={isActive ? 'stroke-[#F5C453] stroke-[3px]' : ''} />
                    <path d={wedge(164, a0, a1)} fill="#E5A92F" opacity={0.35} />
                    {getToppings(slice.t, a0, a1, rnd)}
                  </g>
                );
              })}
            </svg>
            
            <div className="text-center mt-6 min-h-[4rem] text-[1.05rem]">
              {activeSlice !== null ? (
                <>
                  <b className={`font-display text-xl block tracking-tight mb-1 ${darkMode ? 'text-[#F5C453]' : 'text-[#D63A24]'}`}>{SL[activeSlice].n}</b>
                  <span className={`${darkMode ? 'opacity-90' : 'text-[#555555]'}`}>{SL[activeSlice].d}</span>
                </>
              ) : (
                <>
                  <b className={`font-display text-xl block tracking-tight mb-1 ${darkMode ? 'text-[#F5C453]' : 'text-[#D63A24]'}`}>Pick a slice</b>
                  <span className={`${darkMode ? 'opacity-90' : 'text-[#555555]'}`}>Eight customer favorites, one pie.</span>
                </>
              )}
            </div>
          </div>
          
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
            <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#FFFFFF"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-23.82V0Z" opacity=".5" fill="#FFFFFF"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={darkMode ? 'fill-gray-900' : 'fill-[#F5F8FA]'}></path>
            </svg>
        </div>
      </div>

      {/* Origin & Delivery Methods Block */}
      <section id="about" className="py-20 px-4 relative z-10 -mt-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className={`p-8 rounded-3xl shadow-xl transition-transform hover:-translate-y-1 ${darkMode ? 'bg-[#12253A] border-none' : 'bg-white border border-[#D5E0E8]'}`}>
              <h3 className="font-display text-2xl font-black mb-3">Pickup</h3>
              <p className={`font-medium mb-6 ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>Order ahead and walk in to a hot box. Several booths if you would rather eat here.</p>
              <a href="#" className="font-bold text-[#D63A24] hover:underline underline-offset-4">Start a pickup order</a>
            </div>
            <div className={`p-8 rounded-3xl shadow-xl transition-transform hover:-translate-y-1 ${darkMode ? 'bg-[#12253A] border-none' : 'bg-white border border-[#D5E0E8]'}`}>
              <h3 className="font-display text-2xl font-black mb-3">Delivery</h3>
              <p className={`font-medium mb-6 ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>Enter your address to check if we deliver to you. Local customers call it fast and dependable.</p>
              <a href="#" className="font-bold text-[#D63A24] hover:underline underline-offset-4">Check my address</a>
            </div>
            <div className={`p-8 rounded-3xl shadow-xl transition-transform hover:-translate-y-1 ${darkMode ? 'bg-[#12253A] border-none' : 'bg-white border border-[#D5E0E8]'}`}>
              <h3 className="font-display text-2xl font-black mb-3">Curbside</h3>
              <p className={`font-medium mb-6 ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>Pull up, tell us you are here, and we bring the food out. No parking hunt, no waiting inside.</p>
              <a href="#" className="font-bold text-[#D63A24] hover:underline underline-offset-4">Start a curbside order</a>
            </div>
          </div>

          <div className="text-center max-w-5xl mx-auto">
             <p className="text-[#D63A24] font-bold font-heading tracking-widest uppercase text-sm mb-2">Straight from the neighborhood</p>
             <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-10">Our Origin</h2>
             <div className={`w-full h-64 md:h-80 border-4 border-dashed rounded-3xl flex flex-col items-center justify-center p-6 transition-colors ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-[#D5E0E8] bg-[#E6EFF5]'}`}>
               <MapPin size={40} className={`mb-4 ${darkMode ? 'text-gray-500' : 'text-[#4A5F73]'}`} />
               <h3 className={`font-display text-xl font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Space for Origin Story</h3>
               <p className={`max-w-md text-center font-medium ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>
                 Add the history of Riverside Pizza here. Describe how it started, the family tradition, and the secret recipes that make the food special.
               </p>
             </div>
          </div>

        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className={`py-20 px-4 border-t ${darkMode ? 'border-gray-800' : 'border-[#D5E0E8]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-4">What people order here</h2>
              <p className={`font-medium max-w-xl ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>A short list of the dishes customers mention most. The full menu lives in our online ordering.</p>
            </div>
            <button className="bg-[#D63A24] hover:bg-[#B72E1B] text-white px-6 py-3 rounded-full font-bold font-heading transition-all shadow-lg shrink-0">
              See Full Menu
            </button>
          </div>

          <div className="space-y-16">
            {menuData.map((section, index) => (
              <div key={index}>
                <h3 className={`text-2xl font-black font-display tracking-tight mb-8 pb-2 border-b-2 inline-block ${darkMode ? 'border-gray-700' : 'border-[#D5E0E8]'}`}>
                  {section.category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, i) => (
                    <div key={i} className={`rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col ${darkMode ? 'bg-[#12253A] border-none' : 'bg-white shadow-sm border border-[#D5E0E8]'}`}>
                      {item.photo && (
                        <div className="h-48 overflow-hidden bg-gray-200">
                          <img src={item.photo} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold font-display text-lg">
                            {item.name}
                            {item.tag && <span className="inline-block bg-[#F5C453] text-[#3A2A00] text-xs font-bold px-2 py-0.5 rounded-md ml-2 align-middle">{item.tag}</span>}
                          </h4>
                          <span className="text-[#D63A24] font-black font-display whitespace-nowrap ml-4">{item.price}</span>
                        </div>
                        <p className={`text-sm font-medium flex-1 ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>{item.desc}</p>
                        <button className={`mt-4 w-full py-2 rounded-lg font-bold font-heading text-sm transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-[#E6EFF5] hover:bg-[#D5E0E8] text-[#14304D]'}`}>Add to Order</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section with the Point Calculator */}
      <section id="rewards" className={`py-20 px-4 ${darkMode ? 'bg-[#0A1A2C]' : 'bg-[#14304D]'} text-white`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-6">Every order gets you closer to a free pie</h2>
            <p className="text-lg mb-4 font-medium opacity-90 max-w-xl">
              Join Riverside Rewards and get 25 points just for signing up. Earn 1 point for every $1 you spend. Reach 200 points for a free small cheese pizza, or 500 for a free large.
            </p>
            
            <div className="bg-white/10 p-6 md:p-8 rounded-3xl mt-8 border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between font-bold mb-4 font-heading">
                <span>Orders this month</span>
                <span className="text-xl">{orders}</span>
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="16" 
                value={orders} 
                onChange={(e) => setOrders(parseInt(e.target.value))}
                className="w-full accent-[#F5C453] cursor-pointer"
              />
              
              <div className="relative h-4 bg-white/20 rounded-full mt-12 mb-8 shadow-inner">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-[#F5C453] rounded-full transition-all duration-300" 
                  style={{ width: `${fillPercentage}%` }}
                ></div>
                
                <div className="absolute top-0 bottom-0" style={{ left: '40%' }}>
                  <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap opacity-90 font-heading">200 points</span>
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[2px] h-6 bg-white/50"></div>
                </div>

                <div className="absolute top-0 bottom-0" style={{ left: '100%' }}>
                  <span className="absolute -top-7 right-0 text-xs font-bold whitespace-nowrap opacity-90 font-heading">500 points</span>
                  <div className="absolute top-5 right-0 w-[2px] h-6 bg-white/50"></div>
                </div>
              </div>

              <div className="text-[1.05rem] font-heading font-medium">
                <b className="font-display text-3xl text-[#F5C453] mb-1 block">{pts} points</b>
                {pts >= 500 ? (
                  <span>You have unlocked a free large cheese pizza.</span>
                ) : pts >= 200 ? (
                  <span>Free small cheese pizza unlocked. {500 - pts} more points for a large.</span>
                ) : (
                  <span>{200 - pts} more points for a free small cheese pizza.</span>
                )}
              </div>
              <p className="text-[0.85rem] mt-4 opacity-70 font-medium">Example assumes about $30 per order plus the 25 point sign-up bonus.</p>
            </div>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
            <div className="flex mb-8 bg-black/20 p-1 rounded-xl">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${authMode === 'login' ? 'bg-[#F5C453] text-[#3A2A00] shadow-sm' : 'text-gray-300 hover:text-white'}`}>Login</button>
              <button onClick={() => setAuthMode('register')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${authMode === 'register' ? 'bg-[#F5C453] text-[#3A2A00] shadow-sm' : 'text-gray-300 hover:text-white'}`}>Sign Up</button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-200">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:border-[#F5C453] outline-none transition-all text-white" placeholder="John Doe" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-200">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:border-[#F5C453] outline-none transition-all text-white" placeholder="you@example.com" />
              </div>
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-200">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:border-[#F5C453] outline-none transition-all text-white" placeholder="(555) 000-0000" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-200">Password</label>
                <input type="password" className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:border-[#F5C453] outline-none transition-all text-white" placeholder="••••••••" />
              </div>
              
              <button className="w-full bg-[#F5C453] hover:bg-[#e0b243] text-[#3A2A00] font-black tracking-wide py-3 px-4 rounded-xl transition-all shadow-lg mt-4">
                {authMode === 'login' ? 'Sign In' : 'Create Account & Claim 25 Points'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Catering & FAQ Section */}
      <section id="help" className={`py-20 px-4 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-[#E6EFF5] border-[#D5E0E8]'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-6">Feeding the office or the team?</h2>
            <p className={`text-lg font-medium mb-8 ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>Pizza, subs, wraps and salads by the tray for meetings, game days and family gatherings. Tell us the headcount and the date, and we handle the rest.</p>
            
            <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? 'bg-[#12253A]' : 'bg-[#F5C453]'}`}>
              <h3 className={`font-display text-2xl font-black mb-4 ${darkMode ? 'text-white' : 'text-[#2B2000]'}`}>Catering in three steps</h3>
              <ul className={`space-y-3 font-medium mb-8 ${darkMode ? 'text-gray-300' : 'text-[#2B2000]'}`}>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-black/50 shrink-0"></span> Call or send us your headcount and pickup time</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-black/50 shrink-0"></span> We build a mix of pies, subs and salads to fit</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-black/50 shrink-0"></span> Pick up ready to serve, or ask about delivery</li>
              </ul>
              <a href="tel:7813293329" className={`inline-block px-8 py-3 rounded-full font-bold font-heading transition-all ${darkMode ? 'bg-[#D63A24] text-white hover:bg-[#B72E1B]' : 'bg-[#D63A24] text-white hover:bg-[#B72E1B]'}`}>Call (781) 329-3329</a>
            </div>
          </div>

          <div className="space-y-4">
              <h3 className="font-display text-3xl font-black mb-8 flex items-center gap-2"><HelpCircle className="text-[#D63A24]" /> Frequently Asked Questions</h3>
              {faqData.map((faq, index) => (
                <div key={index} className={`p-6 rounded-2xl shadow-sm border ${darkMode ? 'bg-[#12253A] border-none' : 'bg-white border-[#D5E0E8]'}`}>
                  <h4 className="font-bold font-display text-xl mb-2 flex justify-between items-center">
                    {faq.q} <ChevronDown size={20} className="text-[#9FB3C5]" />
                  </h4>
                  <p className={`font-medium ${darkMode ? 'text-[#9FB3C5]' : 'text-[#4A5F73]'}`}>{faq.a}</p>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14304D] text-[#9FB3C5] py-12 border-t border-[#0A1A2C]">
        <div className="max-w-7xl mx-auto px-4 text-center font-heading">
          <h3 className="font-display text-2xl text-white font-black tracking-tight mb-4">Riverside Pizza</h3>
          <p className="mb-6 max-w-md mx-auto font-medium">Great taste, quality and service for the Dedham community.</p>
          <div className="flex justify-center space-x-6 mb-8 font-bold">
            <a href="#" className="hover:text-white transition-colors">Order Tracker</a>
            <a href="#rewards" className="hover:text-white transition-colors">Rewards</a>
            <a href="#help" className="hover:text-white transition-colors">Catering</a>
          </div>
          <p className="text-sm font-medium">&copy; 2026 Riverside Pizza. All Rights Reserved. Not the live site.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
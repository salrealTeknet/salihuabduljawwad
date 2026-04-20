import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2 } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import ThemeToggle from './ThemeToggle';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar: React.FC = () => {
  const { data } = usePortfolio();
  const { hero } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Me', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white shadow-lg py-3' 
          : 'bg-transparent text-slate-900 dark:text-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BarChart2 size={24} className="text-white" />
            </div>
            <span>{hero.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {isHomePage ? (
              navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  {link.name}
                </ScrollLink>
              ))
            ) : (
              <Link to="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Back to Portfolio
              </Link>
            )}
            
            <ThemeToggle />

            <Link
              to="/dashboard-demo"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md shadow-blue-600/20"
            >
              View Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="text-current focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl py-4 flex flex-col items-center gap-4 border-t border-slate-200 dark:border-slate-800">
          {isHomePage ? (
            navLinks.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer py-2"
              >
                {link.name}
              </ScrollLink>
            ))
          ) : (
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 py-2"
            >
              Back to Portfolio
            </Link>
          )}
          <Link
            to="/dashboard-demo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold mt-2 w-11/12 text-center"
          >
            View Dashboard
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;

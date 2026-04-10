import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DashboardDemo from './pages/DashboardDemo';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PortfolioProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300">
            <Routes>
              {/* Admin Routes without Navbar/Footer */}
              <Route path="/portfolio-abdul" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Public Routes with Navbar/Footer */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/dashboard-demo" element={<DashboardDemo />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;

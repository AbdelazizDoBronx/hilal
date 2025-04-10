import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import MainContent from '../ui/MainContent';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              marginLeft: isSidebarOpen ? 280 : 0 
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1] 
            }}
            className="min-h-screen relative z-10"
          >
            <Header 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
              isSidebarOpen={isSidebarOpen} 
            />
            <MainContent>
              {children}
            </MainContent>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
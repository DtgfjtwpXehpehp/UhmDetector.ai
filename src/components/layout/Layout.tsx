import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isSessionPage = location.pathname.includes('/session');
  
  // Use a simplified layout for the session page to minimize distractions
  return (
    <div className="flex flex-col min-h-screen">
      {!isSessionPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isSessionPage && <Footer />}
    </div>
  );
};

export default Layout;
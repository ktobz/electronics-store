import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import OrderTracking from './pages/OrderTracking';
import BlogSection from './components/BlogSection';
import WhatsAppChatbot from './components/WhatsAppChatbot';
import { StoreProvider } from './context/StoreContext';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <StoreProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Categories />
                  <FeaturedProducts />
                </>
              } />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/tracking" element={<OrderTracking />} />
            </Routes>
          </main>
          <BlogSection />
          <Footer />
          <WhatsAppChatbot />
        </div>
      </StoreProvider>
    </Router>
  );
}

export default App;


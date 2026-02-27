import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import OrderTracking from './pages/OrderTracking';
import ComparisonPage from './pages/ComparisonPage';
import Recommendations from './components/Recommendations';
import BlogSection from './components/BlogSection';
import WhatsAppChatbot from './components/WhatsAppChatbot';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import { StoreProvider } from './context/StoreContext';
import Toast from './components/Toast';
import CartDrawer from './components/CartDrawer';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <StoreProvider>
        <div className="app">
          <Toast />
          <CartDrawer />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Categories />
                  <FeaturedProducts />
                  <Recommendations />
                </>
              } />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/tracking" element={<OrderTracking />} />
              <Route path="/compare" element={<ComparisonPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
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


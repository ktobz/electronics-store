import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Footer from './components/Footer';
import { StoreProvider } from './context/StoreContext';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <StoreProvider>
        <div className="app">
          <Navbar />
          <main>
            <Hero />
            <Categories />
            <FeaturedProducts />
          </main>
          <Footer />
        </div>
      </StoreProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Footer from './components/Footer';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Categories />
          <FeaturedProducts />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

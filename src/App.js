import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ShopGrid from './components/ShopGrid';
import './App.css';

export default function App() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState('');

  async function handleSearch(location) {
    setLoading(true);
    setError(null);
    setShops([]);
    setSearchedLocation(location);

    try {
      const res = await fetch(
        `https://shopsafe-worker.brandon-d44.workers.dev/search?location=${encodeURIComponent(location)}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setShops(data.shops || []);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">Shop<span>Safe</span></div>
          <p className="tagline">Find mechanics you can actually trust</p>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Stop Getting Ripped Off<br />at the Auto Shop</h1>
          <p className="hero-sub">
            ShopSafe uses AI to analyze thousands of reviews and find mechanics who are honest,
            fair, and won't upsell you on repairs you don't need.
          </p>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </section>

        {!loading && shops.length === 0 && !searchedLocation && (
          <section className="how-it-works">
            <h2 className="section-title">How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-icon">📍</div>
                <h3>Enter Your Location</h3>
                <p>Type your city or zip code to find nearby auto shops.</p>
              </div>
              <div className="step">
                <div className="step-icon">🤖</div>
                <h3>AI Analyzes Reviews</h3>
                <p>Our AI scans reviews for honesty signals, price complaints, and upsell patterns.</p>
              </div>
              <div className="step">
                <div className="step-icon">✅</div>
                <h3>Get Trusted Results</h3>
                <p>Every shop gets a ShopSafe Score so you know who to trust before you go.</p>
              </div>
            </div>
          </section>
        )}

        <ShopGrid
          shops={shops}
          loading={loading}
          error={error}
          location={searchedLocation}
        />
      </main>

      <footer className="footer">
        <p>© 2026 ShopSafe · Powered by AI · Built to protect everyday drivers</p>
      </footer>
    </div>
  );
}

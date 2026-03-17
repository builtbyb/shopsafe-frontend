import ShopCard from './ShopCard';
import './ShopGrid.css';

export default function ShopGrid({ shops, loading, error, location }) {
  if (loading) {
    return (
      <div className="grid-state">
        <div className="loading-spinner" />
        <p>Analyzing shops near <strong>{location}</strong>...</p>
        <p className="loading-sub">AI is scanning reviews for honesty signals. This takes about 2 minutes.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid-state error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (location && shops.length === 0) {
    return (
      <div className="grid-state">
        <p>No shops found for <strong>{location}</strong>. Try a different location.</p>
      </div>
    );
  }

  if (shops.length === 0) return null;

  const trusted = shops.filter(s => s.shopsafe_score >= 80);
  const caution = shops.filter(s => s.shopsafe_score >= 50 && s.shopsafe_score < 80);
  const avoid = shops.filter(s => s.shopsafe_score != null && s.shopsafe_score < 50);

  return (
    <div className="shop-grid-wrapper">
      <div className="results-header">
        <h2 className="results-title">
          {shops.length} Shops Analyzed Near <span>{location}</span>
        </h2>
        <div className="results-summary">
          <span className="summary-pill green">{trusted.length} Trusted</span>
          <span className="summary-pill yellow">{caution.length} Caution</span>
          <span className="summary-pill red">{avoid.length} Avoid</span>
        </div>
      </div>

      {trusted.length > 0 && (
        <section className="grid-section">
          <h3 className="grid-section-title">✅ Trusted Shops</h3>
          <div className="shop-grid">
            {trusted.map(shop => <ShopCard key={shop.place_id} shop={shop} />)}
          </div>
        </section>
      )}

      {caution.length > 0 && (
        <section className="grid-section">
          <h3 className="grid-section-title">⚠️ Proceed with Caution</h3>
          <div className="shop-grid">
            {caution.map(shop => <ShopCard key={shop.place_id} shop={shop} />)}
          </div>
        </section>
      )}

      {avoid.length > 0 && (
        <section className="grid-section">
          <h3 className="grid-section-title">🚫 Avoid</h3>
          <div className="shop-grid">
            {avoid.map(shop => <ShopCard key={shop.place_id} shop={shop} />)}
          </div>
        </section>
      )}
    </div>
  );
}

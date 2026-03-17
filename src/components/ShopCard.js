import { useState } from 'react';
import './ShopCard.css';

const VERDICT_CONFIG = {
  'Highly Trusted': { color: '#4ade80', bg: '#0f2a1a', emoji: '✅' },
  'Trusted': { color: '#86efac', bg: '#0a1f14', emoji: '👍' },
  'Proceed with Caution': { color: '#fbbf24', bg: '#2a1f00', emoji: '⚠️' },
  'Avoid': { color: '#f87171', bg: '#2a0a0a', emoji: '🚫' },
  'Unscored': { color: '#888', bg: '#1a1a1e', emoji: '❓' },
};

function ScoreRing({ score }) {
  if (score == null) return <div className="score-ring unscored">?</div>;
  const color = score >= 80 ? '#4ade80' : score >= 60 ? '#fbbf24' : '#f87171';
  return (
    <div className="score-ring" style={{ borderColor: color, color }}>
      {score}
    </div>
  );
}

export default function ShopCard({ shop }) {
  const [expanded, setExpanded] = useState(false);
  const verdict = VERDICT_CONFIG[shop.trust_verdict] || VERDICT_CONFIG['Unscored'];

  return (
    <div className="shop-card">
      <div className="shop-card-top">
        <ScoreRing score={shop.shopsafe_score} />
        <div className="shop-info">
          <h3 className="shop-name">{shop.name}</h3>
          <p className="shop-address">{shop.address || 'Address unavailable'}</p>
          <div className="shop-meta">
            {shop.google_rating && (
              <span className="meta-item">⭐ {shop.google_rating} ({shop.review_count?.toLocaleString()} reviews)</span>
            )}
            {shop.price_fairness && shop.price_fairness !== 'Unknown' && (
              <span className="meta-item">💰 {shop.price_fairness}</span>
            )}
          </div>
        </div>
      </div>

      <div className="verdict-badge" style={{ background: verdict.bg, color: verdict.color }}>
        {verdict.emoji} {shop.trust_verdict}
      </div>

      {shop.summary && <p className="shop-summary">{shop.summary}</p>}

      {(shop.green_flags?.length > 0 || shop.red_flags?.length > 0) && (
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide Details ▲' : 'View AI Analysis ▼'}
        </button>
      )}

      {expanded && (
        <div className="shop-details">
          {shop.green_flags?.length > 0 && (
            <div className="flags-section">
              <h4 className="flags-title green">✅ Green Flags</h4>
              <ul className="flags-list">
                {shop.green_flags.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}
          {shop.red_flags?.length > 0 && (
            <div className="flags-section">
              <h4 className="flags-title red">🚩 Red Flags</h4>
              <ul className="flags-list">
                {shop.red_flags.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}
          {shop.best_for && (
            <p className="best-for"><strong>Best for:</strong> {shop.best_for}</p>
          )}
        </div>
      )}

      <div className="shop-links">
        {shop.phone && (
          <a href={`tel:${shop.phone}`} className="shop-link">📞 {shop.phone}</a>
        )}
        {shop.website && (
          <a href={shop.website} target="_blank" rel="noopener noreferrer" className="shop-link">🌐 Website</a>
        )}
      </div>
    </div>
  );
}

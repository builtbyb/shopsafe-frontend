import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-box">
        <span className="search-icon">📍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Enter city, state or zip code..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
        />
        <button className="search-btn" type="submit" disabled={loading || !value.trim()}>
          {loading ? <span className="spinner" /> : 'Find Safe Shops'}
        </button>
      </div>
      {loading && (
        <p className="search-status">
          Analyzing shops near <strong>{value}</strong> — this takes about 2 minutes...
        </p>
      )}
    </form>
  );
}

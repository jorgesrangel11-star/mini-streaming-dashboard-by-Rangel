import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', margin: '20px' }}>
      <input
        type="text"
        placeholder="Busca un artista o canción..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: '10px', width: '250px' }}
      />
      <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Buscar</button>
    </form>
  );
}

export default SearchBar;
import React from 'react';

function TrackCard({ track, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(track)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        width: '180px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}
    >
      {/* Aquí es donde se muestra la portada del álbum */}
      <img 
        src={track.image} 
        alt={track.title} 
        style={{ width: '100%', height: '160px', borderRadius: '5px', objectFit: 'cover' }} 
      />
      <h4 style={{ fontSize: '14px', margin: '10px 0 5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {track.title}
      </h4>
      <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{track.artist}</p>
      <div style={{ marginTop: '10px' }}>
        <span style={{ fontSize: '10px', padding: '2px 5px', backgroundColor: '#eee', borderRadius: '3px' }}>
          {track.source}
        </span>
      </div>
    </div>
  );
}

export default TrackCard;
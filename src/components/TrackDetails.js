import React from 'react';

function TrackDetails({ track }) {
  if (!track) return <p>Selecciona una canción para el preview.</p>;

  return (
    <div style={{ padding: '15px', border: '1px solid #333', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <img src={track.image} alt={track.title} style={{ width: '100%', borderRadius: '8px' }} />
      <h3>{track.title}</h3>
      <p><strong>Artista:</strong> {track.artist}</p>
      
      {track.preview ? (
        <audio controls src={track.preview} autoPlay style={{ width: '100%' }} />
      ) : (
        <p>Audio no disponible.</p>
      )}

      {/* Reto 3: Botón dinámico */}
      <div style={{ marginTop: '20px' }}>
        <a 
          href={track.source === 'iTunes' ? `https://music.apple.com` : `https://www.deezer.com`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '10px',
            backgroundColor: track.source === 'iTunes' ? '#FA243C' : '#EF5466',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Ver en {track.source}
        </a>
      </div>
    </div>
  );
}

export default TrackDetails;
import React, { useState, useEffect } from 'react'; // Agregamos useEffect
import { searchITunes } from './services/itunesApi';
import { searchDeezer } from './services/deezerApi';
import SearchBar from './components/SearchBar';
import TrackCard from './components/TrackCard';
import TrackDetails from './components/TrackDetails';

function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- RETO 4: PERSISTENCIA (LOCALSTORAGE) ---
  // Inicializamos el estado con lo que haya en localStorage [cite: 586]
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('streaming_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardamos en localStorage cada vez que el historial cambie [cite: 586, 587]
  useEffect(() => {
    localStorage.setItem('streaming_history', JSON.stringify(history));
  }, [history]);

  // Función para borrar historial (Requisito nivel Estratégico) [cite: 583, 607]
  const clearHistory = () => {
    if (window.confirm("¿Borrar todo el historial?")) {
      setHistory([]);
      localStorage.removeItem('streaming_history');
    }
  };

  const handleSearch = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const [itunesRes, deezerRes] = await Promise.all([
        searchITunes(term),
        searchDeezer(term)
      ]);

      const itunesMapped = itunesRes.map(item => ({
        id: item.trackId, title: item.trackName, artist: item.artistName, 
        image: item.artworkUrl100, source: 'iTunes', preview: item.previewUrl,
        link: item.trackViewUrl // Para el Reto 3 [cite: 566]
      }));

      const deezerMapped = deezerRes.map(item => ({
        id: item.id, title: item.title, artist: item.artist.name, 
        image: item.album.cover_medium, source: 'Deezer', preview: item.preview,
        link: item.link // Para el Reto 3 [cite: 566]
      }));

      setTracks([...itunesMapped, ...deezerMapped]);
      setHistory(prev => [{ term, time: new Date().toLocaleTimeString() }, ...prev]);
    } catch (err) {
      setError("Error al conectar con las plataformas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundImage: 'url("https://sm.ign.com/t/ign_latam/feature/i/invincible/invincible-what-you-need-to-know-before-watching-season-2_bgc9.1280.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ 
        color: 'white', 
        textShadow: '4px 4px 10px #000', 
        fontSize: '3.5rem',
        margin: '20px 0'
      }}>
        Producciones medio metro
      </h1>
      
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Un poco de transparencia para ver el fondo
        borderRadius: '20px', 
        padding: '30px', 
        width: '95%', 
        maxWidth: '1200px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        color: '#080606'
      }}>
        {/* Pasamos loading para deshabilitar el botón en el Reto 1 [cite: 527] */}
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {!loading && tracks.length > 0 && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Resultados encontrados: {tracks.length}
          </p>
        )}

        <div style={{ display: 'flex', gap: '25px', marginTop: '20px' }}>
          <div style={{ flex: 3 }}>
            {loading && <p style={{ textAlign: 'center' }}>🚀 Buscando música...</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {tracks.map(t => (
                <TrackCard key={`${t.source}-${t.id}`} track={t} onSelect={setSelectedTrack} />
              ))}
            </div>
          </div>
          
          <div style={{ width: '350px', borderLeft: '2px solid #ddd', paddingLeft: '20px' }}>
            <TrackDetails track={selectedTrack} />
            <hr style={{ margin: '20px 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Historial</h4>
              {history.length > 0 && (
                <button onClick={clearHistory} style={{ fontSize: '10px', cursor: 'pointer' }}>
                  Borrar todo
                </button>
              )}
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {history.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#888' }}>Aún no hay búsquedas.</p>
              ) : (
                history.map((h, i) => (
                  <p key={i} style={{ fontSize: '13px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                    {h.term} <small style={{ color: '#888' }}>({h.time})</small>
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
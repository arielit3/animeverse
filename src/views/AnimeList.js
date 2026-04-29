import React, { useState, useEffect } from 'react';
import { getAnimes } from '../services/jikanServices';
import { filterAnimesByGenre } from '../controllers/filterController';
import CategoryBar from './CategoryBar';
import './AnimeList.css';

const AnimeList = () => {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [genre, setGenre] = useState('');

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Romance',
    'Sci-Fi',
    'Mystery',
    'Supernatural',
    'Suspense',
    'Ecchi',
    'Horror',
    'Sports',
    'Award Winning',
    'Avant Garde',
    'Gourmet'
  ];

  const handleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const animeList = await getAnimes();
        setAnimes(animeList);
        setFilteredAnimes(animeList.slice(0, 12));
      } catch (error) {
        console.error('Error cargando animes:', error.message);
      }
    };

    fetchAnimes();
  }, []);

  const handleFilterByGenre = (selectedGenre) => {
    const filtered = selectedGenre
      ? filterAnimesByGenre(animes, selectedGenre).slice(0, 12)
      : animes.slice(0, 12);
    setFilteredAnimes(filtered);
    setGenre(selectedGenre);
    setExpandedCard(null);
  };

  const handleReset = () => {
    setGenre('');
    setFilteredAnimes(animes.slice(0, 12));
    setExpandedCard(null);
  };

  return (
    <div className="main-content">
      <h1 className="title">Encuentra informacion sobre diferentes tipos de animes</h1>

      <CategoryBar
        genres={genres}
        onReset={handleReset}
        onSelectGenre={handleFilterByGenre}
        selectedGenre={genre}
      />

      <div className="anime-grid">
        {filteredAnimes.map((anime) => (
          <div
            className={`anime-card ${expandedCard === anime.id ? 'expanded' : ''}`}
            key={anime.id}
          >
            <img src={anime.image} alt={anime.title} className="anime-image" />
            <h3 className="anime-title">{anime.title}</h3>
            <p className="anime-synopsis">
              {expandedCard === anime.id
                ? anime.synopsis
                : anime.synopsis.length > 100
                ? `${anime.synopsis.slice(0, 100)}...`
                : anime.synopsis}
            </p>
            <button
              className="expand-button"
              onClick={() => handleExpandCard(anime.id)}
            >
              {expandedCard === anime.id ? 'Cerrar' : 'Ver más'}
            </button>
          </div>
        ))}
      </div>

      {expandedCard && (
        <div
          className="modal-overlay"
          onClick={() => setExpandedCard(null)}
        ></div>
      )}
    </div>
  );
};

export default AnimeList;
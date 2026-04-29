import React from 'react';
import './CategoryBar.css';

const CategoryBar = ({ genres, onSelectGenre, onReset, selectedGenre }) => {
  return (
    <div className="category-bar-container">
      <button
        className={`category-btn ${selectedGenre === '' ? 'active' : ''}`}
        onClick={onReset}
      >
        Todas
      </button>
      
      <div className="category-scroll-wrapper">
        <div className="category-bar">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`category-btn ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => onSelectGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;

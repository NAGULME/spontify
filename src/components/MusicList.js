import React, { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { songs } from '../data/songs';
import '../styles/MusicList.scss';

const MusicList = ({ onSongSelect, currentSong, isPlaying }) => {
  const [hoveredSong, setHoveredSong] = useState(null);

  return (
    <div className="music-list">
      <h1>Trending songs</h1>
      <div className="trending-grid">
        {songs.map((song) => (
          <div 
            key={song.id} 
            className="song-card"
            onMouseEnter={() => setHoveredSong(song.id)}
            onMouseLeave={() => setHoveredSong(null)}
          >
            <div className="song-artwork">
              <img src={song.thumbnail} alt={song.title} />
              <button 
                className={`play-button ${currentSong?.id === song.id ? 'playing' : ''}`}
                onClick={() => onSongSelect(song)}
                style={{ opacity: hoveredSong === song.id || currentSong?.id === song.id ? 1 : 0 }}
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </button>
            </div>
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artistName}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Popular artists</h2>
      <div className="artists-grid">
        {/* Add artists section here */}
      </div>
    </div>
  );
};

export default MusicList;

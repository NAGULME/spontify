import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { songs } from '../data/songs';
import '../styles/HomePage.scss';

const HomePage = ({ onSongSelect, setIsPlaying, currentSong, isPlaying }) => {
  const navigate = useNavigate();
  const [hoveredSong, setHoveredSong] = useState(null);

  const handleSongClick = (song) => {
    onSongSelect(song);
    setIsPlaying(true);
    navigate(`/song/${song.id}`);
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>For You</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search Song, Artist" />
        </div>
      </div>

      <div className="songs-list">
        {songs.map((song, index) => (
          <div 
            key={song.id} 
            className={`song-row ${currentSong?.id === song.id ? 'active' : ''}`}
            onMouseEnter={() => setHoveredSong(song.id)}
            onMouseLeave={() => setHoveredSong(null)}
            onClick={() => handleSongClick(song)}
          >
            <div className="song-index">
              {hoveredSong === song.id ? (
                <PlayArrowIcon className="play-icon" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="song-info">
              <img src={song.thumbnail} alt={song.title} />
              <div className="text">
                <span className="title">{song.title}</span>
                <span className="artist">{song.artistName}</span>
              </div>
            </div>
            <div className="duration">{song.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
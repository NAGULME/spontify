import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import '../styles/SongPage.scss';

const SongPage = ({ currentSong, isPlaying, setIsPlaying }) => {
  const navigate = useNavigate();

  if (!currentSong) {
    navigate('/');
    return null;
  }

  return (
    <div className="song-page">
      <div className="header">
        <IconButton onClick={() => navigate('/')} className="back-btn">
          <ArrowBackIcon />
        </IconButton>
      </div>
      
      <div className="song-content">
        <div className="artwork">
          <img src={currentSong.thumbnail} alt={currentSong.title} />
        </div>
        
        <div className="song-details">
          <span className="label">Single</span>
          <h1>{currentSong.title}</h1>
          <div className="artist-info">
            <img src={currentSong.artistImage} alt={currentSong.artist} />
            <span>{currentSong.artist}</span>
          </div>
          <div className="song-meta">
            <span>2025</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        <div className="controls">
          <button 
            className="play-button"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongPage;
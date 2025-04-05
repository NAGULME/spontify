import React from 'react';
import '../styles/NowPlayingView.scss';

const NowPlayingView = ({ song, onClose, isPlaying, setIsPlaying }) => {
  if (!song) return null;

  return (
    <div className="now-playing-view">
      <div className="header">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-chevron-down"></i>
        </button>
        <span>Now Playing</span>
      </div>
      <div className="content">
        <div className="artwork">
          <img src={song.thumbnail} alt={song.title} />
        </div>
        <div className="song-details">
          <h1>{song.title}</h1>
          <h2>{song.artistName}</h2>
        </div>
        <div className="controls">
          <button className="control-btn">
            <i className="fas fa-random"></i>
          </button>
          <button className="control-btn">
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="control-btn play-btn" onClick={() => setIsPlaying(!isPlaying)}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <button className="control-btn">
            <i className="fas fa-step-forward"></i>
          </button>
          <button className="control-btn">
            <i className="fas fa-repeat"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingView;
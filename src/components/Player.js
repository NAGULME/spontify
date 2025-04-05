import React, { useRef, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import DevicesIcon from '@mui/icons-material/Devices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const Player = ({ song, isPlaying, setIsPlaying, expanded, onClose }) => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying && song) {
      audioRef.current.play().catch(error => {
        console.log('Audio playback error:', error);
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, song, setIsPlaying]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
    if (audioRef.current) {
      audioRef.current.currentTime = clickPosition * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!song) return null;

  return (
    <div className={`player ${expanded ? 'expanded' : ''}`}>
      {expanded ? (
        <div className="expanded-view">
          <div className="header">
            <IconButton className="back-btn" onClick={() => navigate('/')}>
              <ArrowBackIcon />
            </IconButton>
            <div className="song-type">
              <span>Single</span>
            </div>
          </div>
          
          <div className="content">
            <div className="artwork-container">
              <img src={song.thumbnail} alt={song.title} className="large-artwork" />
            </div>
            
            <div className="song-details">
              <h1>{song.title}</h1>
              <p className="artist">{song.artistName}</p>
              <div className="release-info">
                <span>{song.releaseYear} • {song.duration}</span>
              </div>
            </div>

            <div className="action-buttons">
              <IconButton 
                className={`like-btn ${isLiked ? 'active' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <DevicesIcon />
              </IconButton>
              <IconButton>
                <QueueMusicIcon />
              </IconButton>
            </div>

            <div className="player-controls">
              <div className="time-info">
                <span>{formatTime(currentTime)}</span>
                <div className="progress-bar" onClick={handleProgressClick}>
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="control-buttons">
                <IconButton 
                  className={`shuffle-btn ${isShuffle ? 'active' : ''}`}
                  onClick={() => setIsShuffle(!isShuffle)}
                >
                  <ShuffleIcon />
                </IconButton>
                <IconButton className="prev-btn">
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton 
                  className="play-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton className="next-btn">
                  <SkipNextIcon />
                </IconButton>
                <IconButton 
                  className={`repeat-btn ${isRepeat ? 'active' : ''}`}
                  onClick={() => setIsRepeat(!isRepeat)}
                >
                  <RepeatIcon />
                </IconButton>
              </div>

              <div className="volume-control">
                <VolumeUpIcon />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mini-player">
          <div className="now-playing">
            <img 
              src={song.thumbnail} 
              alt={song.title} 
              onClick={() => onClose()} 
            />
            <div className="song-info">
              <h4>{song.title}</h4>
              <p>{song.artistName}</p>
            </div>
            <IconButton 
              className={`like-btn ${isLiked ? 'active' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </div>

          <div className="main-controls">
            <div className="buttons">
              <IconButton 
                className={`shuffle-btn ${isShuffle ? 'active' : ''}`}
                onClick={() => setIsShuffle(!isShuffle)}
              >
                <ShuffleIcon fontSize="small" />
              </IconButton>
              <IconButton className="prev-btn">
                <SkipPreviousIcon />
              </IconButton>
              <IconButton 
                className="play-btn"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton className="next-btn">
                <SkipNextIcon />
              </IconButton>
              <IconButton 
                className={`repeat-btn ${isRepeat ? 'active' : ''}`}
                onClick={() => setIsRepeat(!isRepeat)}
              >
                <RepeatIcon fontSize="small" />
              </IconButton>
            </div>
            <div className="progress-bar" onClick={handleProgressClick}>
              <span className="time">{formatTime(currentTime)}</span>
              <div className="progress-wrapper">
                <div className="progress" style={{ width: `${progress}%` }} />
              </div>
              <span className="time">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="extra-controls">
            <IconButton>
              <QueueMusicIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <DevicesIcon fontSize="small" />
            </IconButton>
            <div className="volume-control">
              <VolumeUpIcon fontSize="small" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        src={song.musicUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Player;

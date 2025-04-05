import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SongPage from './pages/SongPage';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import './styles/App.scss';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="app">
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage onSongSelect={setCurrentSong} setIsPlaying={setIsPlaying} />} 
            />
            <Route 
              path="/song/:id" 
              element={<SongPage currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />} 
            />
          </Routes>
        </main>
      </div>
      <Player song={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
}

export default App;

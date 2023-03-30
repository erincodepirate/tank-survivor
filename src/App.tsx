import React from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config';
import GameScene from './scenes/Game';

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene]
  })
);


function App() {
  return (
    <div className="App">
      <div id="game"></div>
    </div>
  );
}

export default App;

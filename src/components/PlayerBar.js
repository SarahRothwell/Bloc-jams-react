import React, { Component } from 'react';
import './PlayerBar.css';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar-container">
        <section className = "player-controls">
          <button id="play-pause" onClick={this.props.handleSongClick}>
            <span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></span>
          </button>
          <div className="player-progress">
            <input
              type="range"
              className="seek-bar-time"
              value={(this.props.currentTime / this.props.duration) || 0}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
            />
          </div>
          <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
          <div className="time-slash">/</div>
          <div className="total-time">{this.props.formatTime(this.props.duration)}</div>


            <div className="icon ion-md-volume-low">{this.props.volume}</div>
            <div className="volume-control">
            <input
              type="range"
              className="seek-bar-volume"
              value={this.props.volume}
              max="1"
              min="0"
              step="0.1"
              onChange={this.props.handleVolumeChange}/>
          </div>
      </section>
      <section className="tracks">
        <button id="previous" onClick={this.props.handlePrevClick}>
          <span className="ion-md-skip-backward"></span>
        </button>
        <button id="next" onClick={this.props.handleNextClick}>
          <span className="ion-md-skip-forward"></span>
        </button>
      </section>
    </section>
);
}
}
export default PlayerBar;

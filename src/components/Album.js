import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './Album.css';

class Album extends Component {
  constructor(props){
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0.1,
      isPlaying: false,
      onMouse: null,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = 0.1;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume});
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

play() {
  this.audioElement.play();
  this.setState({ isPlaying: true});
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false});
}

setSong(song) {
  this.audioElement.src = song.audioSrc;
  this.setState({ currentSong: song });
}

trackMouse(index){
  this.setState({onMouse: index});
}

untrackMouse(){
  this.setState({onMouse: null});
}

playPauseChange(song, index){
  const isSameSong = this.state.currentSong === song;
  if (this.state.isPlaying && isSameSong){
    return <td><button><span className="ion-md-pause"></span></button></td>;
  } else if (this.state.onMouse === index){
    return <td><button><span className="ion-md-play"></span></button></td>;
  } else {
    return <td><span className="song-number">{index+1}</span></td>
    }
  }

formatTime(time){
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time - (minutes * 60));
  var timeOutput = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds <10 ? "0"+ seconds : seconds);
  console.log(time);
  console.log(minutes);
  console.log(seconds);
  console.log(timeOutput);

  if (isNaN(minutes) || isNaN(seconds)){
    return "--:--";
  } else {
    return timeOutput;
  }
}

handleSongClick(song) {
  const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      } else {
          if (!isSameSong) {
            this.setSong(song);
          }
          this.play();
          }
      }

handlePrevClick(){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleNextClick(){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.min(4, currentIndex + 1);
  console.log(newIndex);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleTimeChange(e) {
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}

handleVolumeChange(e){
  const newVolume = e.target.value;
  console.log(newVolume);
  this.audioElement.volume = newVolume;
  this.setState({ volume: newVolume});
}

  render() {
    return (
      <section className="album-container">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 className="artist">{this.state.album.artist}</h1>
            <h2 id="album-title">{this.state.album.title}</h2>
            <div id='release-info'>{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime= {this.state.currentTime}
          formatTime = {(time) => this.formatTime(time)}
          duration={this.audioElement.duration}
          currentVolume={this.state.currentVolume}
          handleSongClick={()=> this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
        <table id="song-list">
          <colgroup>
            <col id="song-number-column"/>
            <col id="song-title-column"/>
            <col id="song-duration-column"/>
          </colgroup>
          <tbody>
            { this.state.album.songs.map((song, index) =>
            <tr className="song" key={index} onMouseEnter={() => this.trackMouse(index)} onMouseLeave={() => this.untrackMouse()} onClick = {() => this.handleSongClick(song)}>
              {this.playPauseChange(song, index)}
              <td>{song.title}</td>
              <td>{this.formatTime(song.duration)}</td>
            </tr>
            )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;

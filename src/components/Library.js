import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';

class Library extends Component {
  constructor(props){
    super(props);
    this.state = { albums: albumData};
  }
  render(){

    return(
        <section className='library-wrapper'>

          {
            this.state.albums.map((album, index) =>
            <Link to={`/album/${album.slug}`} key={index}>
              <div className= 'album-image'>
                <img src={album.albumCover} alt={album.title} />
              </div>
              <div className='album-info'>
                <div id="name">{album.artist}</div>
                <div id="title">{album.title}</div>
                <div id="songs">{album.songs.length} songs</div>
              </div>
            </Link>
            )
          }
        </section>
    );
  }
}

export default Library;

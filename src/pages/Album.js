import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    this.requestAlbum();
  }

  requestAlbum = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const request = await getMusics(id);
    request.shift();
    this.setState({
      album: request,
    });
  }

  render() {
    const { album } = this.state;
    console.log(album);
    return (
      <div data-testid="page-album">
        <section>
          {
            album.map(({ artistName, collectionName }, index) => (
              <div key={ index }>
                <p data-testid="artist-name">{ artistName }</p>
                <p data-testid="album-name">{ collectionName }</p>
              </div>
            )).find(({ artistName, collectionName, artworkUrl100 }) => (
              <div>
                <p data-testid="artist-name">{ artistName }</p>
                <p data-testid="album-name">{ collectionName }</p>
                <img src={ artworkUrl100 } alt={ artistName } />
              </div>
            ))
          }
          {
            album.map(({ previewUrl, trackName, trackNumber }, index) => (
              <div key={ index }>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                </audio>
                <MusicCard trackName={ trackName } trackNumber={ trackNumber } />
              </div>
            ))
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: {
    params: {
      id: PropTypes.string,
    },
  },
}.isRequired;

export default Album;

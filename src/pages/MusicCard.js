import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // isFavoriteSong: false,
      // favoritesSongs: [],
      check: false,
      loading: false,
    };
  }

  changeFavoriteSong = async ({ target }) => {
    const { idAlbum } = this.props;
    const { id, checked } = target;
    const convertId = parseInt(id, 10);
    this.setState({
      loading: true,
      check: checked,
    });
    const requestFavorite = await getMusics(idAlbum);
    const removeFirst = requestFavorite.filter((_element, index) => index !== 0);
    const fav = removeFirst.filter((element) => element.trackId === convertId);
    const addFavoriteSong = await addSong(fav);
    this.setState({
      // isFavoriteSong: checked,
      // favoritesSongs: fav,
      loading: false,
    });
  };

  render() {
    const { trackId, trackName, trackNumber, previewUrl, idAlbum } = this.props;
    const { loading, check } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-music-card">
        <div>{ trackNumber }</div>
        <div>{ trackName }</div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="favoriteSong">
          Favorita:
          <input
            idAlbum={ idAlbum }
            type="checkbox"
            id={ trackId }
            checked={ check }
            onChange={ this.changeFavoriteSong }
            onClick={ () => {} }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  idAlbum: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;

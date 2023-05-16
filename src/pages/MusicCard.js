import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import styleMusicCard from '../styles/MusicCard.module.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { favoritesSongs } = this.state;
    console.log(favoritesSongs);
    this.getFavoritesFunction();
  }

  getFavoritesFunction = async () => {
    const getFavorites = await getFavoriteSongs();
    this.setState({
      favoritesSongs: getFavorites,
    }, () => {
      console.log(this.state);
    });
  };

  // checkFavorite = () => {
  //   const isFavorite = favoritesSongs.some((element) => element.trackId === trackId);
  //   return isFavorite;
  // }

  changeFavoriteSong = async ({ target }) => {
    const { idalbum } = this.props;
    // const { favoritesSongs } = this.state;
    const { id } = target;
    const convertId = parseInt(id, 10);
    this.setState({
      loading: true,
      // isFavoriteSong: checked,
    });
    const requestFavorite = await getMusics(idalbum);
    const removeFirst = requestFavorite.filter((_element, index) => index !== 0);
    const addFav = removeFirst.filter((element) => element.trackId === convertId);
    const addFavoriteSong = await addSong(...addFav);
    const getFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesSongs: getFavorites,
    });
    console.log(addFavoriteSong);
  };

  render() {
    const { trackId, trackName, trackNumber, previewUrl, idalbum } = this.props;
    const { loading, favoritesSongs } = this.state;
    if (loading) return <Loading />;
    return (
      <div
        className={ styleMusicCard.containerGeral }
        data-testid="page-music-card"
      >
        <div className={ styleMusicCard.containerTrackInfo }>
          <p>
            {`${trackNumber}- ${trackName}`}
          </p>
        </div>
        <div className={ styleMusicCard.containerAudioPlayer }>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
        </div>
        <div className={ styleMusicCard.containerFavoriteCheck }>
          <label htmlFor="favoriteSong">
            <input
              idalbum={ idalbum }
              type="checkbox"
              id={ trackId }
              checked={ favoritesSongs.some((element) => element.trackId === trackId) }
              onChange={ this.changeFavoriteSong }
              onClick={ () => {} }
              data-testid={ `checkbox-music-${trackId}` }
            />
            Marcar como Favorita
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  idalbum: PropTypes.number.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;

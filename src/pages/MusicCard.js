import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackId, trackName, trackNumber, previewUrl } = this.props;
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
          Favoritar:
          <input
            type="checkbox"
            name="favoriteSong"
            id="favoriteSong"
            // checked={ favoriteSong }
            // onChange={ addFavoriteSong }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;

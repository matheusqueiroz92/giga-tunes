import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, trackNumber } = this.props;
    return (
      <div data-testid="page-music-card">
        <div>{ trackNumber }</div>
        <div>{ trackName }</div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
};

export default MusicCard;

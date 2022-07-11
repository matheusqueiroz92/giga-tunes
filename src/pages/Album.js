import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      albumInfo: [],
      loading: true,
      // favoriteSongs: [],
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
    const requestFilter = request.filter((_element, index) => index !== 0);
    const saveAlbumInfo = request.find(({ artistName, collectionName,
      artworkUrl100 }) => (
      { artistName, collectionName, artworkUrl100 }
    ));
    this.setState({
      album: requestFilter,
      albumInfo: saveAlbumInfo,
      loading: false,
    });
  }

  // changeFavoriteSong = () => {

  // }

  // isChecked = () => {

  // }

  render() {
    const { album, albumInfo, loading } = this.state;
    if (loading) return <Loading />;
    console.log(album);
    console.log(albumInfo);
    return (
      <div data-testid="page-album">
        <section>
          {
            // albumInfo.map(({ artistName, collectionName, artWorkUrl100 }, index) => (
            //   <div key={ index }>
            //     <p data-testid="artist-name">{ artistName }</p>
            //     <p data-testid="album-name">{ collectionName }</p>
            //     <img src={ artWorkUrl100 } alt={ artistName } />
            //   </div>
            // )).find(({ artistName, collectionName, artWorkUrl100 }) => (
            //   <div>
            //     <p data-testid="artist-name">{ artistName }</p>
            //     <p data-testid="album-name">{ collectionName }</p>
            //     <img src={ artWorkUrl100 } alt={ artistName } />
            //   </div>
            // ))
          }
          <div>
            <p data-testid="artist-name">{ albumInfo.artistName }</p>
            <p data-testid="album-name">{ albumInfo.collectionName }</p>
            <img src={ albumInfo.artWorkUrl100 } alt={ albumInfo.artistName } />
          </div>
          {
            album.map(({ previewUrl, trackId, trackName, trackNumber }, index) => (
              <div key={ index }>
                <MusicCard
                  trackId={ trackId }
                  trackName={ trackName }
                  trackNumber={ trackNumber }
                  previewUrl={ previewUrl }
                  changeFavoriteSong={ this.changeFavoriteSong }
                  isChecked={ this.isChecked }
                />
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

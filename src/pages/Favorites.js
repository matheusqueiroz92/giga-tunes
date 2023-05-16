import React from 'react';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import styleFavorites from '../styles/Favorites.module.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      loading: false,
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

  render() {
    const { loading, favoritesSongs } = this.state;
    if (loading) return <Loading />;
    return (
      <div
        className={ styleFavorites.containerFavorites }
        data-testid="page-favorites"
      >
        <h2>Músicas Favotitas</h2>
        { favoritesSongs.map(({ artistName, trackName, index }) => (
          <div
            className={ styleFavorites.containerMusic }
            key={ index }
          >
            <p>{ artistName }</p>
            <p>{ trackName }</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;

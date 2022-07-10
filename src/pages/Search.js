import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistSearch: '',
      artistResults: [],
      disableButton: true,
      loading: false,
      searchBtn: false,
      showResults: false,
      artistShowResult: '',
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      artistSearch: target.value,
      artistShowResult: target.value,
    }, this.validateInput);
  };

  buttonSearch = async (e) => {
    e.preventDefault();
    const { artistSearch } = this.state;
    this.setState({
      loading: true,
      searchBtn: true,
    });
    const search = await searchAlbumsAPI(artistSearch);
    this.setState({
      artistResults: search,
      artistSearch: '',
      loading: false,
      showResults: true,
    });
  }

  validateInput = () => {
    const { artistSearch } = this.state;
    const TAMANHO_INPUT = 2;
    if (artistSearch.length >= TAMANHO_INPUT) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  };

  render() {
    const {
      artistSearch,
      disableButton,
      loading,
      artistResults,
      searchBtn,
      showResults,
      artistShowResult,
    } = this.state;
    const vazio = '';
    console.log(artistSearch);
    if (loading) return <Loading />;
    return (
      <div data-testid="page-search">
        <label htmlFor="artist-name">
          Nome do Artista
          <input
            type="text"
            name="artist-name"
            id="artist-name"
            value={ artistSearch }
            onChange={ this.inputChange }
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disableButton }
          onClick={ this.buttonSearch }
        >
          Pesquisar
        </button>
        <div>
          {
            (showResults)
              ? (
                <h3>
                  Resultado de álbuns de:
                  {' '}
                  { artistShowResult }
                </h3>
              )
              : <p>{ vazio }</p>
          }
        </div>
        <section>
          {
            (artistResults.length === 0 && searchBtn)
              ? <h2>Nenhum álbum foi encontrado</h2>
              : (
                artistResults.map(
                  ({ artistId,
                    artistName,
                    collectionId,
                    collectionName,
                    collectionPrice,
                    artworkUrl100,
                    releaseDate,
                    trackCount,
                  }, index) => (
                    <Link to={ `/album/${collectionId}` } key={ index }>
                      <div
                        key={ index }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        <h4>{ artistId }</h4>
                        <h4>{ artistName }</h4>
                        <h4>{ collectionId }</h4>
                        <h4>{ collectionName }</h4>
                        <h4>{ collectionPrice }</h4>
                        <img src={ artworkUrl100 } alt={ artistName } />
                        <h4>{ releaseDate }</h4>
                        <h4>{ trackCount }</h4>
                      </div>
                    </Link>
                  ),
                ))

          }
        </section>
      </div>
    );
  }
}

export default Search;

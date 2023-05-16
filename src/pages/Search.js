import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styleSearch from '../styles/Search.module.css';
import botaoPlay from '../styles/botao-play (1).png';

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
    if (loading) return <Loading />;
    return (
      <div
        className={ styleSearch.containerGeral }
        data-testid="page-search"
      >
        <div
          className={ styleSearch.containerSearch }
        >
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
        </div>
        <div className={ styleSearch.containerTitleResults }>
          {
            (showResults)
              ? (
                <h3>
                  Resultado de álbuns para:
                  {' '}
                  { artistShowResult }
                </h3>
              )
              : <p>{ vazio }</p>
          }
        </div>
        <section className={ styleSearch.containerResults }>
          {
            (artistResults.length === 0 && searchBtn)
              ? <h2>Nenhum álbum foi encontrado</h2>
              : (
                artistResults.map(
                  ({ artistName,
                    collectionId,
                    collectionName,
                    artworkUrl100,
                  }, index) => (
                    <Link
                      className={ styleSearch.containerLink }
                      to={ `/album/${collectionId}` }
                      key={ index }
                    >
                      <div
                        className={ styleSearch.containerResultCard }
                        key={ index }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        <div className={ styleSearch.containerParagraph }>
                          <p>
                            {
                              `${artistName},
                              ${' '}
                              ${collectionName}`
                            }
                          </p>
                        </div>
                        <img
                          src={ artworkUrl100 }
                          alt={ artistName }
                          width="200px"
                          height="200px"
                        />
                        <div className={ styleSearch.containerBtnPlay }>
                          <img
                            src={ botaoPlay }
                            alt="botao-play"
                            height="50px"
                            width="50px"
                          />
                          <p>Clique e ouça</p>
                        </div>
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

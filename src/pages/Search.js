import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      disableButton: true,
      // loading: false,
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      artistName: target.value,
    }, this.validateInput);
  };

  validateInput = () => {
    const { artistName } = this.state;
    const TAMANHO_INPUT = 2;
    if (artistName.length >= TAMANHO_INPUT) {
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
    const { artistName, disableButton } = this.state;
    return (
      <div data-testid="page-search">
        <label htmlFor="artist-name">
          Nome do Artista
          <input
            type="text"
            name="artist-name"
            id="artist-name"
            value={ artistName }
            onChange={ this.inputChange }
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disableButton }
          onClick={ () => {} }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;

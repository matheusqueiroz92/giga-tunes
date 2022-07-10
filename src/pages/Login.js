import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      disableButton: true,
      loading: false,
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      userName: target.value,
    }, this.validateInput);
  };

  buttonCreateUser = async (e) => {
    e.preventDefault();
    const { userName } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      loading: false,
    });
    history.push('/search');
  }

  validateInput = () => {
    const { userName } = this.state;
    const TAMANHO_INPUT = 3;
    if (userName.length >= TAMANHO_INPUT) {
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
    const { userName, disableButton, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <label htmlFor="username">
          Login:
          <input
            type="text"
            name="username"
            id="username"
            value={ userName }
            onChange={ this.inputChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ disableButton }
          onClick={ this.buttonCreateUser }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: {
    push: PropTypes.func,
  },
}.isRequired;

export default Login;

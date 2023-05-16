import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import styleLogin from '../styles/Login.module.css';

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
      <div className={ styleLogin.containerExtern }>
        <div
          className={ styleLogin.containerLogin }
          data-testid="page-login"
        >
          <div className={ styleLogin.containerTitleLogin }>
            <p>LOGIN</p>
          </div>
          <div className={ styleLogin.containerInput }>
            <label htmlFor="username">
              Usuário:
              <input
                type="text"
                name="username"
                id="username"
                value={ userName }
                onChange={ this.inputChange }
                data-testid="login-name-input"
              />
            </label>
          </div>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disableButton }
            onClick={ this.buttonCreateUser }
          >
            Entrar
          </button>
        </div>
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

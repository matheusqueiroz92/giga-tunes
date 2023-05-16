import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import styleHeader from '../styles/Header.module.css';
import logoTrybeTunes from '../styles/fones-de-ouvido.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: {},
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userLogin = await getUser();
    this.setState({
      userName: userLogin,
      loading: false,
    });
    console.log(userLogin);
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header
        className={ styleHeader.containerHeader }
        data-testid="header-component"
      >
        <div className={ styleHeader.containerImgName }>
          <img src={ logoTrybeTunes } alt="trybetunes-logo" width="100" heigth="100" />
          { loading ? <Loading />
            : <p data-testid="header-user-name">{ userName.name }</p> }
        </div>
        <div className={ styleHeader.containerNavMenu }>
          <Link
            className={ styleHeader.buttonNavMenu }
            data-testid="link-to-gome"
            to="/"
          >
            Início
          </Link>
          {' '}
          <Link
            className={ styleHeader.buttonNavMenu }
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar
          </Link>
          {' '}
          <Link
            className={ styleHeader.buttonNavMenu }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>
          {' '}
          <Link
            className={ styleHeader.buttonNavMenu }
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        Header
        { loading ? <Loading />
          : <p data-testid="header-user-name">{ userName.name }</p> }
        <Link data-testid="link-to-gome" to="/">Início</Link>
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <nav>
          <NavLink
            data-testid="link-to-gome"
            activeClassName="selected"
            to="/"
          >
            Início
          </NavLink>
          <NavLink
            data-testid="link-to-search"
            activeClassName="selected"
            to="/search"
          >
            Pesquisar
          </NavLink>
          <NavLink
            data-testid="link-to-favorites"
            activeClassName="selected"
            to="/favorites"
          >
            Favoritas
          </NavLink>
          <NavLink
            data-testid="link-to-profile"
            activeClassName="selected"
            to="/profile"
          >
            Perfil
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;

import React from 'react';
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
      </header>
    );
  }
}

export default Header;

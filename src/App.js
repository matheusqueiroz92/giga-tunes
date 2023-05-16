import React from 'react';
import Header from './components/Header';
import Content from './Content';
import styleApp from './styles/App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={ styleApp.containerApp }>
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;

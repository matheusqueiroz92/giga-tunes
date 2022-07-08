import React from 'react';
import Header from './components/Header';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p>TrybeTunes</p>
        <Content />
      </div>
    );
  }
}

export default App;

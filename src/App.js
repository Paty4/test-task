import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import reduxStore from './redux/reduxStore';
import MainDataContainer from './MainData/MainDataContainer';

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <MainDataContainer />
      </div>
    </Provider>
  );
}

export default App;

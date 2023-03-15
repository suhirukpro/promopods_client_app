import logo from './logo.svg';
// import './App.css';
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';
import PageRouters from './routes';

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";




const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PageRouters />
      </PersistGate>
    </Provider>
  );
};

export default App;
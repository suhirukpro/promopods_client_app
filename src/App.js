import logo from './logo.svg';
// import './App.css';
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';
import PageRouters from './routes';

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


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
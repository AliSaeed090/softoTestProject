import React from 'react';
 import Pages from '../src/Pages'
 import { Provider } from "react-redux";
import { store } from "../src/redux/store";
function App() {
  return (
    <Provider store={store}>
    <Pages/>
    </Provider>
  );
}

export default App;

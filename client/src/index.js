import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { positions, transitions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from 'react-alert-template-basic';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} timeout={5000} position={positions.BOTTOM_CENTER} transition={transitions.FADE}>
    <App />
    </AlertProvider>
  </Provider>
);
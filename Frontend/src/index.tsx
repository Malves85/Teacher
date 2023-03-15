import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Navbar />
    <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
    <App />
  </React.StrictMode>
);

reportWebVitals();

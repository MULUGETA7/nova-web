import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export { default as Novalabs } from './Novalabs';

window.addEventListener('unhandledrejection', (event) => {
  console.error('CRITICAL UNHANDLED REJECTION:', {
    reason: event.reason,
    promise: event.promise,
    message: event.reason?.message || 'No message',
    stack: event.reason?.stack || 'No stack'
  });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

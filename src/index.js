import React from 'react';
import ReactDOM from 'react-dom';

import { ViewProvider } from './context/ViewProvider';

import Home from './views/Home';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';

ReactDOM.render(
    <React.StrictMode>
        <ViewProvider>
            <Home />
        </ViewProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

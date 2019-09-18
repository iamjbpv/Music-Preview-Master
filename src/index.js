import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, HashRouter  } from 'react-router-dom';

import App from './components/App';
import './index.css';

// ReactDOM.render(<App />,document.getElementById('root'));

ReactDOM.render(
    <HashRouter>
        <Route path='/' render={(props) => <App {...props} /> } />
    </HashRouter>,
    document.getElementById('root')
);

// ReactDOM.render(<App />,document.getElementById('root'));
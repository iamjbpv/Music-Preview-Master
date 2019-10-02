import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, HashRouter  } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from  './reducers'

import App from './components/App';
import './index.css';

// ReactDOM.render(<App />,document.getElementById('root'));

const store = createStore(rootReducer, applyMiddleware(thunk));
// console.log('store', store);
console.log('store.getState()',store.getState());

store.subscribe(() => console.log('store.getState()',store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route path='/' render={(props) => <App {...props} /> } />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);


// ReactDOM.render(<App />,document.getElementById('root'));
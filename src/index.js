import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthContextProvider} from "./context/authContext";
import {DarkModeContextProvider} from "./context/darkModeContext";
import {Provider} from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DarkModeContextProvider>
        <AuthContextProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AuthContextProvider>
    </DarkModeContextProvider>
);


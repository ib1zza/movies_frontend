import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@app/App.tsx'
import {ThemeContextProvider} from './context/ThemeContext';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@app/Store/config/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeContextProvider>
                    <App/>
                </ThemeContextProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)

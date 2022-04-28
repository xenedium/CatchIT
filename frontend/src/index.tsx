import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './Pages/HomePage';
import Error404 from './Pages/Error404';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
);

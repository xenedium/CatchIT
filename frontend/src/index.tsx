import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';


import './Scss/custom.scss';

import HomePage from './Pages/HomePage';
import Error404 from './Pages/Error404';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Account from './Pages/Account';
import MyArticles from './Pages/MyArticles';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<Account />} />
            <Route path='/my-articles' element={<MyArticles />} />

            <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
);

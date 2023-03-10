import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './Routes/Home/Home';
import SearchCustomer from './Routes/Customer/SearchCustomer/SearchCustomer';
import CustomerCard from './Routes/Customer/DisplayCustomer/CustomerCard';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/customer",
        element: <SearchCustomer/>
    },
    {
        path: "/customer/id/:id",
        element: <CustomerCard/>
    },
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);


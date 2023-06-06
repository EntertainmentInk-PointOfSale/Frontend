import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './Routes/Home/Home';
import SearchCustomer from './Routes/Customer/SearchCustomer/SearchCustomer';
import CustomerCard from './Routes/Customer/DisplayCustomer/CustomerCard';
import CreateCustomer from './Routes/Customer/Create/CreateCustomer'
import SearchProduct from './Routes/Product/SearchProduct';
import AddProduct from './Routes/Product/AddProduct';
import TransactionHome from './Routes/Transaction/TransactionHome';

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
        path: "/customer/create",
        element: <CreateCustomer/>
    },
    {
        path: "/customer/id/:id",
        element: <CustomerCard/>
    },
    {
        path: "/product",
        element: <SearchProduct/>
    },
    {
        path: "/product/add",
        element: <AddProduct/>
    },
    {
        path: '/transaction',
        element: <TransactionHome></TransactionHome>
    }
])

root.render(
    <RouterProvider router={router}/>
);


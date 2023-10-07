import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.scss';
import Home from './Routes/Home/Home';

// Customer
import SearchCustomer from './Routes/Customer/SearchCustomer';
import DisplayCustomer from './Routes/Customer/DisplayCustomer';
import CreateCustomer from './Routes/Customer/CreateCustomer'

// Products
import DisplayProduct from './Routes/Product/DisplayProduct'
import SearchProduct from './Routes/Product/SearchProduct';
import AddProduct from './Routes/Product/AddProduct';

// Transaction
import TransactionTabs from './Routes/Transaction/TransactionTabs';


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
        element: <DisplayCustomer/>
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
        path: "/product/:id",
        element: <DisplayProduct/>
    },
    {
        path: '/transaction',
        element: <TransactionTabs/>
    }
])

root.render(
    <RouterProvider router={router}/>
);


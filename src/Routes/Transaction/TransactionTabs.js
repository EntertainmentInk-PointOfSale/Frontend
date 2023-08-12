import {
    Tabs,
    Tab
} from 'react-bootstrap'
import TransactionHome from './TransactionHome';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Customer from '../../Objects/Customer';
import App from '../../App';
import { v1 as uuidv1 } from 'uuid';

export default function TransactionTabs() {
    const [activeKey, setActiveKey] = useState(`0`);
    const [storeCustomer, setStoreCustomer] = useState({})
    const [tabs, setTabs] = useState([])

    //Customer tab object
    function CustomerTab(customer) {
        this.id = `${uuidv1()}`;
        this.customer = customer;
    }
    
    const createNewTab = (customer) => {
        let new_customers = []

        for(let i = 0; i < 1; i ++) {
            new_customers.push(new CustomerTab(customer))
        }

        setTabs(tabs.concat(new_customers))
    }

    const getStoreCustomer = async () => {
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "customer/store",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setStoreCustomer(Customer.Load(response.data[0]));
            createNewTab(Customer.Load(response.data[0]))
        })
    }

    const updateActiveTab = (new_key) => {
        if (new_key.toUpperCase() == 'NEW') {
            createNewTab(storeCustomer)
            return;
        }

        setActiveKey(new_key)
    }

    useEffect(() => {
        if (!tabs.map((tab) => tab.id).includes(activeKey)) {
            if(tabs.length > 0) {
                setActiveKey(tabs[0].id)
            } else {
                setActiveKey(0)
            }
        }   
    }, [tabs])

    useEffect(() => {
        getStoreCustomer()
    }, [])

    return (
        <App title="Transaction">
            <div className='container tab-div'>
                <Tabs
                    id="all_tabs"
                    activeKey={activeKey}
                    onSelect={(k) => updateActiveTab(k)}
                    transition={false}
                    className='mb-2'
                >
                    {tabs.map(tab => <Tab key={tab.id} eventKey={tab.id} title={`${tab.customer.name}`} tabClassName={`${activeKey === tab.id ? 'active-tab' : ''}`} ><TransactionHome customer={tab.customer}/></Tab>)}
                    <Tab key={'New'} eventKey={'new'} title={`➕`} tabClassName={`last-item`}/>
                </Tabs>
            </div>
        </App>
    )
}
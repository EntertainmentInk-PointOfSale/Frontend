import React from "react";
import App from "../../App"
import CustomerCard from "../Customer/Customer";

export default function Home(props) {
    return(
        <App title="Home">
            <CustomerCard/>
        </App>
    );
}
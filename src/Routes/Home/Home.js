import React from "react";
import App from "../../App"
import CustomerCard from "../Customer/CustomerCard";

export default function Home(props) {
    return(
        <App title="Home">
            <CustomerCard/>
        </App>
    );
}
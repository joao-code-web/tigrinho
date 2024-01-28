import { useContext, useState } from "react"
import { Form } from "../Layouts/Form/Form";
import ListTransactions from "../Layouts/ListTransactions/ListTransactions";
import Dashboard from "../Layouts/Dashboard/Dasboard";

export default function Card() {


    return (
        <div className="card">
            <Dashboard />
            <ListTransactions />
            <Form />
        </div>
    )
}
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';




const EditContact = (props) => {
    const location = useLocation();
    const [contact, setContact] = useState({
        _id: location.state.contact._id,
        name: location.state.contact.name,
        quantity: location.state.contact.quantity,
        unit_price: location.state.contact.unit_price
    })
    const update = (e) => {
        e.preventDefault();
        console.log(contact);
        const { navigation } = props
        if (contact.name === "") {
            alert("All fields are Mandatory");
            return
        }
        props.updateContactHandler(contact);
        //setContact({name:"", quantity:"", unit_price: ""});
        navigation("/");
    }
    return (
        <div className="ui Main">
            <h2>Edit Medicines</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label> Name </label>
                    <input type='text' name='name' placeholder='Name'
                        onChange={(e) => {
                            setContact((contact) => {
                                return ({
                                    ...contact,
                                    name: e.target.value
                                });
                            })
                        }} value={contact.name}></input>
                </div>

                <div className="field">
                    <label> Quantity </label>
                    <input type='number' name='quantity' min='0' placeholder='Quantity' onChange={(e) => {
                        setContact((contact) => {
                            return ({
                                ...contact,
                                quantity: e.target.value
                            });
                        })
                    }} value={contact.quantity}></input>
                </div>
                <div className="field">
                    <label> Unit_Price </label>
                    <input type='number' min='0' step='.01' name='unit_price' placeholder='Unit Price' onChange={(e) => {
                        setContact((contact) => {
                            return ({
                                ...contact,
                                unit_price: e.target.value
                            });
                        })
                    }} value={contact.unit_price}></input>
                </div>
                <button className="ui button blue">Update </button>
            </form>
        </div>
    )
};
export default function (props) {
    const navigation = useNavigate();
    return <EditContact {...props} navigation={navigation} />;
}
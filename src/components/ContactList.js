import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";


const ContactList = (props) => {
    console.log(props);
    const inputEl= useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            // <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}></ContactCard>
            <tr>
                <td data-label="Name">{contact.name}</td>
                <td data-label="quantity">{contact.quantity}</td>
                <td data-label="unit_price">{contact.unit_price}</td>
                <td data-label="Button"><Link to={`/edit`} state={{ contact: contact }}><i className="edit alternate outline icon" style={{ marginTop: "7px" }} key={contact._id}></i></Link></td>
                <td data-label="Button"><i className="trash alternate outline icon" style={{ color: "red", marginTop: "7px" }}
                    onClick={() => deleteContactHandler(contact._id)} key={contact._id}></i></td>
            </tr>
        );
    });

    const getSearchterm = () => {
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div className="main">
            <h2>
                Medicines List
                <Link to='/add'>
                    <button className="ui button blue right floated">Add Medicine</button>
                </Link>
            </h2>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input type='text' placeholder='Search Medicine' ref={inputEl} className='prompt' value={props.term} onChange={getSearchterm}></input>
                    <i className='search icon'></i>
                </div>
            </div>
            <div className="ui celled list">
                <table class="ui celled table">
                    <thead>
                        <tr><th>Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Update Stock</th>
                            <th>Remove</th>
                        </tr></thead>
                    <tbody>
                        {renderContactList}
                    </tbody></table>
            </div>
        </div>
    );
};

export default ContactList
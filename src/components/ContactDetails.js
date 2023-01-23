import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const ContactDetails= (props) =>{
    const location = useLocation()
    console.log(location)
    return (

        <div className="main">
            <div className="ui card centered">
                <div className="content">
                    <div className="header">{location.state.contact.name}</div>
                    <div className="description">{location.state.contact.email}</div>    
                    </div>
                </div>
            <div className="center aligned ">
            <Link to={`/`}>
            <button className="ui button blue centered">Go Back</button>
            </Link>
            </div>
        </div>
    );
}

export default ContactDetails;
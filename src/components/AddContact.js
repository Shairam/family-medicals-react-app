import React from "react";
import { useNavigate } from 'react-router-dom';


class AddContact extends React.Component{
    state = {
        name:"",
        quantity:"",
        unit_price: ""
    };

    add = (e) => {
        const {navigation} = this.props
        e.preventDefault();
        if (this.state.name === ""){
            alert("All fields are Mandatory");
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name:"", quantity:"", unit_price: ""});
        navigation("/");
    }
    render() {
        return (
        <div className="ui Main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={this.add}>
                <div className="field">
                    <label> Name </label>
                    <input type='text' name='name' placeholder='Name'
                     onChange={(e) => this.setState({name: e.target.value})}></input>
                </div>
            
                <div className="field">
                    <label> Quantity </label>
                    <input type='number' name='quantity' placeholder='Quantity' onChange={(e) => {this.setState({quantity: e.target.value})}}></input>
                </div>
                <div className="field">
                    <label> Quantity </label>
                    <input type='number' name='unit_price' placeholder='Unit Price' onChange={(e) => {this.setState({unit_price: e.target.value})}}></input>
                </div>
                <button className="ui button blue">Add</button>
                </form>
        </div>
    )};
}
export default function(props) {
    const navigation = useNavigate();
    return <AddContact {...props} navigation={navigation} />;
  }
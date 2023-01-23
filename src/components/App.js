import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import ContactList from './ContactList';
import AddContact from './AddContact';
import api from '../apis/contacts'
import React, { useState, useEffect } from 'react';
import ContactDetails from './ContactDetails';
import EditContact from './EditContact';


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const fetchData = async () => {
    const response = await api.get('/api/getAll')
     const data = await response.data;
      setContacts(data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  const addContactHandler = async (contact) => {
    const req = {
      ...contact
    }
    const response = await api.post('/api/post', req);
    console.log(response);
    setContacts([...contacts, response.data])
  };

  const updateContactHandler = async(contact) => {
    const resp = await api.put(`api/update/${contact._id}`,contact )
    const {_id, name, email} = resp.data
    setContacts(
      contacts.map((contact)=>{
        return contact._id === _id ? {...resp.data} : contact;
      })
    );
  }

  const deleteContactHandler = async (id) => {
    const resp = await api.delete(`/api/delete/${id}`);
    let filtered_list =[];
    if (resp.status == 200) {
     filtered_list = contacts.filter((contact)=> {
      return contact._id !== id;
    })
  }

    setContacts(filtered_list);
  }

  const searchHandler = (searchTerm) => {
    console.log(searchTerm);
    setSearchTerm(searchTerm)
    if (searchTerm !== ""){
      const newContactList = contacts.filter((contact)=> {
       return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      });
      console.log(newContactList)
      setSearchResult(newContactList)
    } else {
      setSearchResult(contacts)
    }
  }

  // useEffect(() => {
  //   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retrieveContacts) setContacts(retrieveContacts);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  // }, [contacts]);

  return (
    <div>
      <Header />
      <Router>
      <Routes>
      <Route path='/' element={
        <ContactList contacts={searchTerm < 1 ? contacts : searchResult} getContactId={deleteContactHandler} term={searchTerm} searchKeyword={searchHandler}></ContactList>}/>
      <Route path='/add' element={
        <AddContact addContactHandler={addContactHandler}></AddContact>}/>
        <Route path='/edit' element={
        <EditContact updateContactHandler={updateContactHandler}></EditContact>}/>
      <Route path ='/contact/:id' element={<ContactDetails></ContactDetails>}/>  
      </Routes>
      {/* <AddContact addContactHandler={addContactHandler}></AddContact>
      <ContactList contacts={contacts} getContactId={deleteContactHandler}></ContactList> */}
      </Router>
    </div>
  );
}

export default App;

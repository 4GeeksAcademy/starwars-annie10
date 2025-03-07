import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
   
    const [ name, setName ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ address, setAddress ] = useState('')
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const handleNewContact = (event) => {
        event.preventDefault();
        actions.createContact({ name, phone, email, address })
        navigate("/contact")
    }

    return (
        <form onSubmit={handleNewContact}>
            <div className="mb-3">
                <label forhtml="nameInput" className="form-label">Name</label>
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="nameInput" />
            </div>
            <div className="mb-3">
                <label forhtml="phoneInput" className="form-label">Phone</label>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} type="text" className="form-control" id="phoneInput" />
            </div>
            <div className="mb-3">
                <label forhtml="emailInput" className="form-label">Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" className="form-control" id="emailInput" />
            </div>
            <div className="mb-3">
                <label forhtml="addressInput" className="form-label">address</label>
                <input value={address} onChange={(event) => setAddress(event.target.value)} type="text" className="form-control" id="addressInput" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>)
}
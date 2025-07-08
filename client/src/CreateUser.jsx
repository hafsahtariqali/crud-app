import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser () {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createUser', {name, email, age})
    .then(res => {alert(res.data.message);
      setName("");
      setEmail("");
      setAge("");
      e.target.reset();
      navigate("/")})
    .catch(err => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2 className="text-center my-4 fw-bold">Create User</h2>
          <div className="mb-2">
            <label htmlFor="">Name: </label>
            <input type="text" placeholder="Enter Name" className="form-control" onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="">Email: </label>
            <input type="email" placeholder="Enter Name" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="">Age: </label>
            <input type="text" placeholder="Enter Name" className="form-control" onChange={(e) => setAge(e.target.value)}/>
          </div>
          <button className="btn btn-success" style={{ marginTop: "10px" }}>Create User</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUser;
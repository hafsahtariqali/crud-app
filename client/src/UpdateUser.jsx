import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser () {
  const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/getUser/` + id)
      .then(result => {console.log(result)
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(err => console.log(err));
    }, [])

  const Update = (e) => {
      e.preventDefault();
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/updateUser/`+id, {name, email, age})
      .then(res => {
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
        <form onSubmit={Update}>
          <h2 className="text-center my-4 fw-bold">Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name: </label>
            <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="">Email: </label>
            <input type="email" placeholder="Enter Name" className="form-control" value={email}  onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-2">
            <label htmlFor="">Age: </label>
            <input type="text" placeholder="Enter Name" className="form-control" value={age} onChange={(e) => setAge(e.target.value)}/>
          </div>
          <button className="btn btn-success" style={{ marginTop: "10px" }}>Update User</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser;
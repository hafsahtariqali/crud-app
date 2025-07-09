import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users () {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/`)
    .then(result => setUsers(result.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteUser/${id}`)
    .then(res => {
      console.log(res.data.message);
      window.location.reload() 
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="d-flex flex-column vh-100 bg-primary justify-content-center align-items-center">
      <div className="text-center mb-3">
        <h2 className="fw-bold text-white">Basic CRUD App</h2>
        <p className="small text-white">Manage users with Create, Read, Update, and Delete operations</p>
      </div>
      <div className="w-50 bg-white rounded p-3">
        <Link to='/createUser' className='btn btn-success'>Create +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => {
                return <tr>
                  <td className="align-middle">{user.name}</td>
                  <td className="align-middle">{user.email}</td>
                  <td className="align-middle">{user.age}</td>
                  <td className="align-middle">
                    <Link to={`/updateUser/${user._id}`} className='btn btn-success' style={{ marginRight: "10px" }}>Update</Link>
                    <button type="button" className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users;
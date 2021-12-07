import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("61a5f3da99ca3c5064ba5c6d");
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const items = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    setUsers(items.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1> Register </h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input type="submit" value="Register" className="btn btn-primary" />
    </div>
  );
};

export default Register;

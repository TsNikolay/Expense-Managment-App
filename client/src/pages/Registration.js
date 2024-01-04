import React, { useState } from "react";
import styles from "./Registration.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/UI/Loading";

const Registration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    try {
      setLoading(true);
      await axios.post("/users/registration", formData);
      alert("Registration was successful");
      setLoading(false);
      navigate("/login");
    } catch (exception) {
      setLoading(false);
      console.error("Error during registration:", exception);
      alert(exception);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration page</h1>
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            name="name"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>
        <Link to="/login" className="d-block mb-2">
          <p>Already registered? Log in</p>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;

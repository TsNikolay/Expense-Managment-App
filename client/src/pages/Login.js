import React, { useState, useEffect } from "react";
import styles from "./Registration.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/UI/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", formData);
      setLoading(false);
      alert("Login was successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (exception) {
      setLoading(false);
      alert(exception);
    }
  };

  //Щоб залогінений користувач не міг знову логінитись
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1>Login page</h1>
      {loading && <Loading />}
      <form onSubmit={submitHandler}>
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
        <Link to="/registration" className="d-block mb-2">
          <p>Don't have an account? Sign up</p>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { signUp, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";


const SIgnUp = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };
dispatch(signUp(userData))
dispatch(reset())
    console.log(userData);
  };




    if (user?.token) {
      return <Navigate to="/" />;
    }
 
  return (
    <Container>
      <Wrapper>
        <Header>Sign In</Header>
        <Form onSubmit={onSubmit}>
          <div className="input_field">
            <input
              type="name"
              value={name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="input_field">
            <input
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="input_field">
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <p>already got an account?  <Link to="/signin">sign in</Link></p>
          <button type="submit">Sign Up</button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 30%;
  margin: auto;
`;
const Header = styled.header`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 30px;
`;
const Form = styled.form`
  .input_field {
    margin-bottom: 20px;
    width: 100%;
    input {
      padding: 15px 5px;
      width: 100%;
      outline: none;
      border: 1px solid rgba(107, 106, 106, 0.457);
      border-radius: 4px;
    }
  }

  button {
    display: inline-block;
    padding: 10px 15px;
    font-size: 20px;
    outline: none;
    border: none;
    border-radius: 4px;
    color: #fff;
    background: #2e2e2e;
  }
`;

export default SIgnUp;

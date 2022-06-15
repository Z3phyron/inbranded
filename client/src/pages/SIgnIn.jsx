import React, { useState } from "react";
import styled from "styled-components";
import { Sign_In, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SIgnIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

    const onSubmit = (e) => {
      e.preventDefault();

      const userData = {
        email,
        password,
      };

      dispatch(Sign_In(userData));

    console.log(userData)
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
            <input type="email" value={email} name="email" onChange={handleChange} />
          </div>
          <div className="input_field">
            <input type="password" value={password} name="password" onChange={handleChange} />
          </div>
          <button type="submit">Sign In</button>
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

export default SIgnIn;

import React from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components"
import { SignOut } from '../features/auth/authSlice';

const Navbar = (props) => {
  const dispatch = useDispatch()
  
  const logOut = () => {
    dispatch(SignOut())
    
  }
  return (
    <Container>
      <Logo>Logo</Logo>

      <Links>
        
        <button onClick={logOut}>logout</button>
      </Links>
    </Container>
  );
}

const Container = styled.section`
padding: 0 5%;
display: flex;
justify-content: space-between;
align-items: center;
height: 10vh;
`;
const Logo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 10vh;
`;
const Links = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
height: 10vh;
`;

export default Navbar
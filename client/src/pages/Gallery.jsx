import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Gallery = () => {
  return (
    <Container>
      <Logo>Logo</Logo>

      <Links>Gallery</Links>
    </Container>
  );
};

const Container = styled.section`
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

export default Gallery;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { createDesign, getDesigns } from "../features/design/designSlice";
import DesignList from "../components/DesignList";


const Home = (props) => {
  const { userDesigns, setUserDesigns } = props;
  const [file, setFile] = useState("");

  const { designs } = useSelector((state) => state.design);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append("file", file);
    dispatch(createDesign(fileData));
    dispatch(getDesigns());
    console.log(fileData);
  };

  useEffect(() => {
    dispatch(getDesigns());
  }, []);



  return (
    <Container>
      <form className="add_img" onSubmit={handleSave}>
        <input type="file" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
      <DesignList />
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-gap: 30px;

  padding: 5%;

  .designs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .add_img {
    button {
      outline: none;
      border: none;
      background: #232322;
      color: #fff;
      padding: 10px 20px;
      border-radius: 7px;
    }
  }
`;

export default Home;

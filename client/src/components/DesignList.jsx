import React from "react";
import { useSelector} from "react-redux";
import styled from "styled-components";
import Design from "../components/Design";

const DesignList = (props) => {
  const { designs } = useSelector((state) => state.design);

  return (
    <Container>
      <div className="designs">
        {designs &&
          designs.map((design, index) => (
            <Design design={design} key={index} />
          ))}
      </div>
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

export default DesignList;

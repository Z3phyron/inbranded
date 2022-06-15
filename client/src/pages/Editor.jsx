import React, { useState } from 'react'
import SelectedObjectToolbar from "../components/SelectedObjectToolbar";
import Canvas from "../components/Canvas";
import VerticalToolbar from "../components/VerticalToolbar";
import DownloadAsImage from "../components/DownloadAsImage";
import CanvasDetails from "../components/CanvasDetails";
import ClearCanvas from "../components/ClearCanvas";
import ImageUpload from '../components/ImageUpload';
import styled from 'styled-components';

const Editor = () => {
      const [canvas, setCanvas] = useState("");

      const [canvasWidth, setCanvasWidth] = useState(800);
      const [canvasHeight, setCanvasHeight] = useState(600);
      const [mouseX, setMouseX] = useState(0);
      const [mouseY, setMouseY] = useState(0);
  return (
    <Container>
      <Wrapper>
        <VerticalToolbar
          contents={[
            <ImageUpload />,
            <DownloadAsImage canvas={canvas} />,
            <ClearCanvas />,
          ]}
        />
        <CanvasCont>
          <Canvas
            setCanvas={setCanvas}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            setCanvasWidth={setCanvasWidth}
            setCanvasHeight={setCanvasHeight}
            mouseX={mouseX}
            mouseY={mouseY}
            setMouseX={setMouseX}
            setMouseY={setMouseY}
          />
          <CanvasDetails
            width={canvasWidth}
            height={canvasHeight}
            setWidth={setCanvasWidth}
            setHeight={setCanvasHeight}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </CanvasCont>
        <SelectedObjectToolbar />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5%;
`;
const Wrapper = styled.div`
width: 50%;
margin: auto;
display: grid;
grid-template-columns: 10% auto 10%;
`;


const CanvasCont = styled.div`
display: grid;
grid-gap: 30px;
`;

export default Editor
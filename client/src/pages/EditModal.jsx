import React, { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import getCroppedImg from "../components/CropImage";
import { useSelector, useDispatch } from "react-redux";
import {
  getDesign,
  editDesign,
  getDesigns,
  reset,
} from "../features/design/designSlice";

const EditModal = (props) => {
  const { id, edited, setOpenModal } = props;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const dispatch = useDispatch();
  const { design, isSuccess } = useSelector((state) => state.design);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        design?.image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      const editedDesign = new FormData();
      editedDesign.append("file", croppedImage);
      const id = design?._id;

      const data = { id: design?._id, image: editedDesign };
      console.log(id, editedDesign);
      //send design
      dispatch(editDesign(data));
      dispatch(getDesigns());
      dispatch(reset());

      if (isSuccess) {
        setOpenModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  useEffect(() => {
    dispatch(getDesign(id));
  }, [edited]);

  return (
    <Container>
      <Image>
        <Cropper
          image={design?.image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Image>

      <Settings>
        <div className="input_field">
          <label>Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e, zoom) => setZoom(e.target.value)}
          />
        </div>
        <div className="input_field">
          <label>Rotation</label>
          <input
            type="range"
            value={rotation}
            min={0}
            max={360}
            step={1}
            onChange={(e, rotation) => setRotation(e.target.value)}
          />
        </div>
        <Button onClick={showCroppedImage}>Show cropped image</Button>
      </Settings>
      {/* <img src={croppedImage} alt="" /> */}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  input {
    z-index: 999;
  }
`;
const Image = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
`;
const Settings = styled.div`
  padding: 20px 0;
  width: 500px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  text-align: center;
`;
const Button = styled.div`
  border-radius: 5px;
  background-color: rgb(221, 221, 221);
  width: 100%;
  /* margin-left: auto; */
  padding: 10px;
  color: black;
  text-align: center;
`;

export default EditModal;

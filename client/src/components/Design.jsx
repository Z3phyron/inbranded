import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { TbDotsVertical } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { BiTrashAlt } from "react-icons/bi";
import EditModal from "../pages/EditModal";
import { useDispatch } from "react-redux";
import { getDesign } from "../features/design/designSlice";

const Design = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [edited, setEdited] = useState("");
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { design } = props;
  const handleDrop = () => {
    setDropdown(!dropdown);
  };
  const dispatch = useDispatch();
  const handleModal = useCallback(async (id) => {
    try {
      setOpenModal(true);
      dispatch(getDesign(id));
      setId(id)
      console.log(id);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {" "}
      <DesignCont>
        <Option>
          <div className="option_icon" onClick={handleDrop}>
            <TbDotsVertical />
          </div>
          <div className={dropdown ? "active option_text" : " option_text"}>
            <div className="edit" onClick={() => handleModal(design._id)}>
              <FiEdit /> Edit
            </div>

            <div className="delete">
              <BiTrashAlt /> Delete
            </div>
          </div>
        </Option>
        <img src={design.image} alt="design" />
      </DesignCont>
      {openModal && (
        <Modal>
          <EditModal id={id} edited={edited} setEdited={setEdited} setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};
const DesignCont = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
  }
`;
const Option = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  /* display: none; */
  z-index: 999;

  .option_icon {
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .option_text {
    position: absolute;
    top: 25px;
    right: 5px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    display: none;
    border-radius: 5px;
    padding: 10px;
    transition: 1s ease-in-out;
    width: 70px;
    color: #fff;

    &.active {
      display: grid;

      grid-gap: 10px;
    }
    button {
      padding: 5px;
      border: none;
      background-color: #000;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #fff;

        color: #000;
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .add_img {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    width: 50%;
    padding: 30px;
    margin: auto;
    justify-content: center;
    text-align: center;
    /* color: #fff; */
    display: grid;
    grid-gap: 20px;
  }
`;

export default Design;

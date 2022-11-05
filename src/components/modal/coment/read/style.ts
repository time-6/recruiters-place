import styled from "styled-components";

export const ModalComentReadContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background: rgba(5, 2, 6, 0.8);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  > div {
    position: absolute;
    max-width: 864px;
    width: 100%;
    height: 600px;
    margin: 0 auto;
    padding: 30px 0;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 30px 15px;

    gap: 15px;
  }
`;

export const ComentContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  overflow-y: auto;
  li {
    width: 90%;
    margin: 10px auto;
    border: 2px solid #1da1f2;
    border-radius: 10px;

    display: flex;
    padding: 10px;
  }
`;
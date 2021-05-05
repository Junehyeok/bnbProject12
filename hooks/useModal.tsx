import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const useModal = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    interface IProps {
        children: React.ReactNode;
    }

    const ModalPortal: React.FC<IProps> = ({ children }) => {
        console.log("children");
        console.log(children);
        const ref = useRef<Element | null>();
        const [mounted, setMounted] = useState(false);
        console.log("2");
        useEffect(() => {
            setMounted(true);
            if (document) {
                const dom = document.querySelector("#root-modal");
                ref.current = dom;
            }
        }, []);
        console.log("3 ");
        if (ref.current && mounted && modalOpened) {
            console.log("4");
            return createPortal(
              <Container>
                <div
                  className="modal-background"
                  role="presentation"
                  onClick={closeModal}
                />
                {children}
              </Container>,
              ref.current
            );
          }
          console.log("5");
          return null;
    };
    return {
        openModal,
        closeModal,
        ModalPortal,
      };
};

export default useModal;

import React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
// import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { Draggable } from "react-beautiful-dnd";

export interface ICardProps {
  listId: string;
  cardId: string;
  index: number;
  title: string;
  text: string;
}

const CardWrapper = styled.div`
  margin: 6px auto;
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);

  &:hover {
    cursor: pointer;
  }
`;

const CardBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;

  .MuiSvgIcon-root {
    opacity: 0;
    padding: 4px;
    fill: #777777;
    height: 24px;
    width: 24px;
    border-radius: 3px;
  }

  &:hover .MuiSvgIcon-root {
    opacity: 1;
  }

  .MuiSvgIcon-root:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CardModal = styled.div`
  margin: 50px;
  padding: 30px;
  min-width: 600px;
  min-height: 600px;
  background: #f4f5f7;
  outline: none;
  border: none;
  border-radius: 3px;
`;

const ModalTitle = styled.div`
  margin-bottom: 20px;

  h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333333;
    font-size: 24px;
    font-weight: 600;
  }

  svg {
    cursor: pointer;
  }

  p {
    margin-top: 4px;
    font-size: 15px;
  }
`;

const ModalDescription = styled.div`
  h3 {
    font-weight: 500;
    font-size: 16px;
    margin: 10px 0;
  }

  p {
    margin: 0;
    padding: 10px;
    font-size: 15px;
    min-height: 100px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Card: React.FC<ICardProps> = ({
  listId,
  cardId,
  index,
  title,
  text,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided, snapshot) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardBody onClick={handleOpen}>
            <span>{text}</span>
            {/* <EditIcon /> */}
          </CardBody>
          <StyledModal open={open} onClose={handleClose}>
            <CardModal>
              <ModalTitle>
                <h2>
                  {text}
                  <CloseIcon onClick={handleClose} />
                </h2>
                <p>in list {title}</p>
              </ModalTitle>
              <ModalDescription>
                <h3>Description</h3>
                <p>Add detailed description...</p>
              </ModalDescription>
            </CardModal>
          </StyledModal>
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Card;

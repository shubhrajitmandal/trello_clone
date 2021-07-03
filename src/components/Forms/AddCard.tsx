import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { AppContext } from "../../state/context";
import { addCard } from "../../state/reducer";

export interface IAddCardProps {
  listId: string;
}

const AddCardWrapper = styled.div`
  margin: 10px;
  width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  border-radius: 3px;
`;

const CardHeader = styled.div`
  max-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.h5<{ open: boolean }>`
  width: 100%;
  padding: 6px;
  display: ${(props) => (props.open ? "none" : "flex")};
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #777777;
  cursor: pointer;
  z-index: 2;

  &: hover {
    background: rgba(23, 23, 30, 0.15);
  }
`;

const TitleTextarea = styled.textarea<{ open: boolean }>`
  width: 290px;
  outline: none;
  padding: 5px;
  color: #333333;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  border-radius: 3px;

  &:focus {
    border: 2px solid #0088ff;
    outline: none;
  }
`;

const Popover = styled.div<{ open: boolean }>`
  margin: 0 10px;
  width: 300px;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
  display: ${(props) => (props.open ? "flex" : "none")};
  align-items: center;
  background: #ebecf0;
  color: #777777;
  z-index: 2;
  transition: all 0.2s ease;

  svg {
    margin-left: 10px;
    cursor: pointer;
  }

  svg:hover {
    fill: #333333;
  }
`;

const StyledButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  border: none;
  color: #ffffff;
  background: #0088ff;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
`;

const AddCard: React.FC<IAddCardProps> = ({ listId }) => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const { dispatch } = useContext(AppContext);

  const handleClick = (event: any) => {
    setOpen(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 100);
  };

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    dispatch(addCard(listId, title));
    setOpen(false);
    setTitle("");
  };

  return (
    <AddCardWrapper>
      <CardHeader>
        <Title open={open} onClick={handleClick}>
          <AddIcon />
          Add another Card
        </Title>
      </CardHeader>
      <Popover open={open}>
        <TitleTextarea
          placeholder="Enter a title for this card..."
          open={open}
          value={title}
          ref={ref}
          onChange={(e) => setTitle(e.target.value)}
          onBlurCapture={() => {
            setTimeout(() => {
              setOpen(false);
              setTitle("");
            }, 100);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && title) {
              handleSubmit();
            }
          }}
        />
        <StyledButton disabled={!title} onClick={handleSubmit}>
          Add Card
        </StyledButton>
        <CloseIcon onClick={() => setOpen(false)} />
      </Popover>
    </AddCardWrapper>
  );
};

export default AddCard;

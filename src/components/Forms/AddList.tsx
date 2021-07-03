import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { AppContext } from "../../state/context";
import { addList } from "../../state/reducer";

export interface IAddListProps {}

const AddListWrapper = styled.div`
  margin: 10px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  border-radius: 3px;
  background: #ebecf0;
`;

const ListHeader = styled.div`
  min-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.h5`
  height: 36px;
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  background: #ebecf0;
  color: #777777;
  cursor: pointer;
  z-index: 2;

  &: hover {
    background: rgba(23, 23, 30, 0.15);
  }
`;

const TitleInput = styled.input<{ active: boolean }>`
  width: 290px;
  position: absolute;
  left: 5px;
  border: 2px solid #ebecf0;
  outline: none;
  padding: 5px;
  color: #333333;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  border-radius: 3px;
  z-index: ${(props) => (props.active ? "3" : "-1")};
  opacity: ${(props) => (props.active ? "1" : "0")};

  &:focus {
    border: 2px solid #0088ff;
    outline: none;
  }
`;

const Popover = styled.div<{ open: boolean }>`
  margin: 0 10px;
  width: 300px;
  padding: 5px;
  display: flex;
  align-items: center;
  background: #ebecf0;
  color: #777777;
  transform: ${(props) =>
    props.open ? "translateY(-25%)" : "translateY(-100%)"};
  opacity: ${(props) => (props.open ? "1" : "0")};
  z-index: -2;
  transition: transform 0.3s ease;

  svg {
    cursor: pointer;
  }

  svg:hover {
    fill: #333333;
  }
`;

const StyledButton = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  color: #ffffff;
  background: #0088ff;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
`;

const AddList: React.FC<IAddListProps> = (props) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const { dispatch } = useContext(AppContext);

  const titleInput = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    setActive(!active);
    setOpen(true);
    if (titleInput.current) {
      titleInput.current.focus();
    }
  };

  const handleSubmit = () => {
    dispatch(addList(title));
    setOpen(false);
    setActive(!active);
    setTitle("");
  };

  return (
    <div>
      <AddListWrapper>
        <ListHeader>
          <Title onClick={handleClick}>
            <AddIcon />
            Add another list
          </Title>
          <TitleInput
            type="text"
            placeholder="Enter list title..."
            active={active}
            value={title}
            ref={titleInput}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setOpen(false);
                setActive(false);
                setTitle("");
              }, 100);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && title) {
                handleSubmit();
              }
            }}
          />
        </ListHeader>
      </AddListWrapper>
      <Popover open={open}>
        <StyledButton disabled={!title} onClick={handleSubmit}>
          Add list
        </StyledButton>
        <CloseIcon
          onClick={() => {
            setActive(true);
            setOpen(false);
          }}
        />
      </Popover>
    </div>
  );
};

export default AddList;

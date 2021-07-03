import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Card from "./Card";
import AddCard from "../Forms/AddCard";
import { AppContext } from "../../state/context";
import { ICard } from "../../state/state";
import { editList } from "../../state/reducer";
import { Droppable } from "react-beautiful-dnd";

export interface IListProps {
  listId: string;
  name: string;
  items?: ICard[];
}

const ListWrapper = styled.div`
  margin: 10px;
  padding: 5px 5px 0 5px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #ebecf0;
  border-radius: 3px;
  position: relative;
`;

const ListHeader = styled.div`
  max-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.h5`
  width: 90%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  cursor: pointer;
`;

const TitleInput = styled.input<{ active: boolean }>`
  position: absolute;
  border: 2px solid #ebecf0;
  outline: none;
  padding: 5px;
  color: #333333;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  border-radius: 3px;
  z-index: ${(props) => (props.active ? "2" : "-1")};

  &:focus {
    border: 2px solid #0088ff;
    outline: none;
  }
`;

const ListBody = styled.div`
  min-height: 10px;
  width: 100%;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;

  .MuiSvgIcon-root {
    fill: #767676;
    height: 30px;
    width: 30px;
    border-radius: 3px;
  }

  & :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const List: React.FC<IListProps> = ({ listId, name, items, ...props }) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(name);

  const titleInput = useRef<HTMLInputElement>(null);

  const { dispatch } = useContext(AppContext);

  const handleSubmit = () => {
    dispatch(editList(listId, title));
    setActive(!active);
  };

  return (
    <div>
      <ListWrapper>
        <ListHeader>
          <Title
            onClick={() => {
              setActive(!active);
              if (titleInput.current) {
                titleInput.current.focus();
              }
            }}
          >
            {title}
          </Title>
          <TitleInput
            type="text"
            active={active}
            value={title}
            ref={titleInput}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setActive(!active)}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && title) {
                handleSubmit();
              }
            }}
          />
          <IconWrapper>
            <MoreHorizIcon />
          </IconWrapper>
        </ListHeader>
        <Droppable droppableId={listId}>
          {(provided, snpashot) => (
            <ListBody ref={provided.innerRef} {...provided.droppableProps}>
              {items &&
                items.map(({ id, text }, index) => (
                  <Card
                    key={id}
                    listId={id}
                    cardId={id}
                    index={index}
                    title={name}
                    text={text}
                  />
                ))}
              {provided.placeholder}
            </ListBody>
          )}
        </Droppable>
        <AddCard listId={listId} />
      </ListWrapper>
    </div>
  );
};

export default List;

import React, { useState, useRef } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export interface IListProps {
  name: string;
}

const ListWrapper = styled.div`
  margin: 10px;
  max-width: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #eeeeee;
`;

const ListHeader = styled.div`
  padding: 5px;
  min-height: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.h5<{ active: boolean }>`
  width: 90%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #eeeeee;
  color: #333333;
  cursor: pointer;
`;

const TitleInput = styled.input<{ active: boolean }>`
  position: absolute;
  border: 2px solid #eeeeee;
  outline: none;
  padding: 5px;
  color: #333333;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  border-radius: 4px;
  z-index: ${(props) => (props.active ? "2" : "-1")};

  &:focus {
    border: 2px solid #0088ff;
    outline: none;
  }
`;

const IconWrapper = styled.span`
  margin: auto;
  cursor: pointer;

  .MuiSvgIcon-root {
    fill: #767676;
  }
`;

const List: React.FC<IListProps> = ({ name, ...props }) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(name);

  const titleInput = useRef<HTMLInputElement>(null);

  return (
    <ListWrapper>
      <ListHeader>
        <Title
          active={active}
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
            if (e.keyCode === 13) {
              setActive(!active);
            }
          }}
        />
        <IconWrapper>
          <MoreHorizIcon fontSize="small" />
        </IconWrapper>
      </ListHeader>
    </ListWrapper>
  );
};

export default List;

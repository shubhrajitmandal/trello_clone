import React, { useContext } from "react";
import styled from "styled-components";
import List from "./components/List/List";
import AddList from "./components/Forms/AddList";
import { AppContext } from "./state/context";
import { DragDropContext } from "react-beautiful-dnd";
import { swapWithinList, swapToDifferentList } from "./state/reducer";

interface IAppProps {}

const AppContainer = styled.div`
  overflow: auto;
  display: flex;
  height: 100%;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
`;

const App: React.FC<IAppProps> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { list } = state;

  console.log(list);

  const handleDrag = (result: any) => {
    const { destination, source, draggableId } = result;
    console.log(destination, source, draggableId);

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      dispatch(
        swapWithinList(source.droppableId, source.index, destination.index)
      );
    } else {
      dispatch(
        swapToDifferentList(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index
        )
      );
    }
  };

  return (
    <AppContainer className="App">
      <DragDropContext onDragEnd={handleDrag}>
        <ListContainer>
          {list &&
            list.map(({ id, title, items }) => (
              <List key={id} listId={id} name={title} items={items} />
            ))}
        </ListContainer>
      </DragDropContext>
      <AddList />
    </AppContainer>
  );
};

export default App;

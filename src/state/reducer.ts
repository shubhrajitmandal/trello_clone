import { AppState } from "./state";
import { v4 as uuidv4 } from "uuid";
import {
  stateActions,
  ActionType,
  AddList,
  AddCard,
  EditList,
  SwapWithinList,
  SwapToDifferentList,
} from "./action";

export const appReducer = (state: AppState, action: stateActions): AppState => {
  switch (action.type) {
    case ActionType.AddList:
      return {
        list: [
          ...state.list,
          { id: uuidv4(), title: action.payload, items: [] },
        ],
      };

    case ActionType.EditList:
      return {
        list: state.list.map(({ id, title, items }) =>
          id === action.payload.id
            ? { id, title: action.payload.title, items }
            : { id, title, items }
        ),
      };

    case ActionType.AddCard:
      const { cardTitle, id } = action.payload;
      return {
        list: state.list.map((listItem) =>
          listItem.id === id
            ? {
                ...listItem,
                items: [...listItem.items, { id: uuidv4(), text: cardTitle }],
              }
            : listItem
        ),
      };

    case ActionType.SwapWithinList:
      return {
        list: state.list.map((list) => {
          if (list.id === action.payload.listId) {
            const res = Array.from(list.items);
            const [removed] = res.splice(action.payload.source, 1);
            res.splice(action.payload.destination, 0, removed);
            return {
              ...list,
              items: res,
            };
          } else {
            return list;
          }
        }),
      };

    case ActionType.SwapToDifferentList:
      console.log(action.payload);
      const target = state.list.filter(
        (list) => list.id === action.payload.slist
      )[0].items[action.payload.source];
      return {
        list: state.list.map((list) => {
          if (list.id === action.payload.slist) {
            const res = Array.from(list.items);
            res.splice(action.payload.source, 1);
            return {
              ...list,
              items: res,
            };
          }
          if (list.id === action.payload.dlist) {
            const res = Array.from(list.items);
            res.splice(action.payload.destination, 0, target);
            return {
              ...list,
              items: res,
            };
          } else {
            return list;
          }
        }),
      };

    default:
      return state;
  }
};

export const addList = (title: string): AddList => ({
  type: ActionType.AddList,
  payload: title,
});

export const editList = (id: string, title: string): EditList => ({
  type: ActionType.EditList,
  payload: { id, title },
});

export const addCard = (id: string, cardTitle: string): AddCard => ({
  type: ActionType.AddCard,
  payload: { id, cardTitle },
});

export const swapWithinList = (
  listId: string,
  source: number,
  destination: number
): SwapWithinList => ({
  type: ActionType.SwapWithinList,
  payload: {
    listId,
    source,
    destination,
  },
});

export const swapToDifferentList = (
  slist: string,
  dlist: string,
  source: number,
  destination: number
): SwapToDifferentList => ({
  type: ActionType.SwapToDifferentList,
  payload: {
    slist,
    dlist,
    source,
    destination,
  },
});

export enum ActionType {
  AddList,
  EditList,
  AddCard,
  SwapWithinList,
  SwapToDifferentList,
}

export interface AddList {
  type: ActionType.AddList;
  payload: string;
}

export interface EditList {
  type: ActionType.EditList;
  payload: {
    id: string;
    title: string;
  };
}

export interface AddCard {
  type: ActionType.AddCard;
  payload: {
    id: string;
    cardTitle: string;
  };
}

export interface SwapWithinList {
  type: ActionType.SwapWithinList;
  payload: {
    listId: string;
    source: number;
    destination: number;
  };
}

export interface SwapToDifferentList {
  type: ActionType.SwapToDifferentList;
  payload: {
    slist: string;
    dlist: string;
    source: number;
    destination: number;
  };
}

export type stateActions =
  | AddCard
  | AddList
  | EditList
  | SwapWithinList
  | SwapToDifferentList;

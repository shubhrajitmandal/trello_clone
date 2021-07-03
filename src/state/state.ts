export interface IList {
  id: string;
  title: string;
  items: ICard[];
}

export interface ICard {
  id: string;
  text: string;
  description?: string;
}

export interface AppState {
  list: IList[];
}

export const initialState: AppState = {
  list: [],
};

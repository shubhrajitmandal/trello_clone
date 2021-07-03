import React, { useReducer } from "react";
import { AppState, initialState } from "./state";
import { appReducer } from "./reducer";
import { stateActions } from "./action";

export const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<stateActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

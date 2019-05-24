import produce from "immer";

import { ModalState, ModalActionTypes, TOGGLE_MODAL } from "./types";

const initialState: ModalState = {
  login: false,
  signup: false
};

export function modalReducer(
  state = initialState,
  action: ModalActionTypes
): ModalState {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return produce(state, draftState => {
        draftState[action.payload.name] = action.payload.open;
      });
    }
    default:
      return state;
  }
}

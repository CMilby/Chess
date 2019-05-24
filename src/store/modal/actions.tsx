import { ModalActionTypes, TOGGLE_MODAL, ModalState } from "./types";

export function toggleModal(modal: string, open: boolean): ModalActionTypes {
  return {
    type: TOGGLE_MODAL,
    payload: { name: modal, open }
  };
}

export function toggle(modal: string, state: ModalState) {
  return toggleModal(modal, !state[modal]);
}

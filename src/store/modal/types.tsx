export type ModalState = {
  [name: string]: boolean;
};

export const TOGGLE_MODAL = "TOGGLE_MODAL";

interface ToggleModalAction {
  type: typeof TOGGLE_MODAL;
  payload: { name: string; open: boolean };
}

export type ModalActionTypes = ToggleModalAction;

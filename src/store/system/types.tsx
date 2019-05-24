export interface SystemState {
  logged_in: boolean;
  token: string | null;
  username: string | null;
}

export const UPDATE_SESSION = "UPDATE_SESSION";

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction;

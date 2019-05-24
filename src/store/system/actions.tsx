import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { SystemState, SystemActionTypes, UPDATE_SESSION } from "./types";
import {
  getCurrentUser as APIGetCurrentUser,
  login as APILogin
} from "../../util/APIUtil";

import { ACCESS_TOKEN } from "../../constants";

export function updateSession(newSession: SystemState): SystemActionTypes {
  return {
    type: UPDATE_SESSION,
    payload: newSession
  };
}

export const login = (
  usernameOrEmail: string,
  password: string
): ThunkAction<Promise<any>, {}, {}, SystemActionTypes> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SystemActionTypes>
  ): Promise<any> => {
    return APILogin({
      UsernameOrEmail: usernameOrEmail,
      Password: password
    })
      .then(response => {
        if (!response.Success) {
          return Promise.reject(response.Message);
        }

        let session = {
          logged_in: true,
          token: response.Message,
          username: JSON.parse(response.Payload).Username
        };

        localStorage.setItem(ACCESS_TOKEN, session.token);
        dispatch(updateSession(session));
        return Promise.resolve(session);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export function logout(): SystemActionTypes {
  let session: SystemState = {
    logged_in: false,
    token: null,
    username: null
  };

  localStorage.removeItem(ACCESS_TOKEN);
  return updateSession(session);
}

export const getCurrentUser = (): ThunkAction<
  Promise<any>,
  {},
  {},
  SystemActionTypes
> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SystemActionTypes>
  ): Promise<any> => {
    return APIGetCurrentUser()
      .then(response => {
        let session = {
          logged_in: false,
          token: null as string | null,
          username: null as string | null
        };

        if (response.Success) {
          session.logged_in = true;
          session.token = localStorage.getItem(ACCESS_TOKEN);
          session.username = JSON.parse(response.Payload).username;
        } else {
          if (localStorage.getItem(ACCESS_TOKEN)) {
            localStorage.removeItem(ACCESS_TOKEN);

            Promise.reject(session);
          }
        }

        dispatch(updateSession(session));
        return Promise.resolve(session);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

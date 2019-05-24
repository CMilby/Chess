import { API_BASE_URL, ACCESS_TOKEN, NO_ACCESS_TOKEN } from "../constants";
import axios from "axios";

const request = (
  options: { url: string; method: string; body?: any },
  auth: boolean = true
): Promise<any> => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  if (auth && !localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(NO_ACCESS_TOKEN);
  }

  if (auth) {
    Object.assign(headers, {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    });
  }

  return axios
    .request({
      url: options.url,
      method: options.method,
      data: options.body,
      headers: headers
    })
    .then(function(response) {
      if (response.statusText !== "OK") {
        return Promise.reject(response.data);
      }

      return response.data;
    })
    .catch(function(error) {
      return error;
    });
};

export function login(loginRequest: {
  UsernameOrEmail: string | null;
  Password: string | null;
}): Promise<any> {
  return request(
    {
      url: API_BASE_URL + "/auth/signin",
      method: "POST",
      body: loginRequest
    },
    false
  );
}

export function signup(signupRequest: {
  Username: string;
  Email: String;
  Password: String;
}): Promise<any> {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: signupRequest
  });
}

// export function checkUsernameAvailability(username: string): Promise<any> {
//   return request({
//     url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
//     method: "GET"
//   });
// }

// export function checkEmailAvailability(email: string): Promise<any> {
//   return request({
//     url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
//     method: "GET"
//   });
// }

export function getCurrentUser(): Promise<any> {
  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function sendCreateGameUrl(): Promise<any> {
  return request({
    url: API_BASE_URL + "/game/create/url",
    method: "POST"
  });
}

export function joinGame(id: string): Promise<any> {
  return request({
    url: API_BASE_URL + "/game/join/" + id,
    method: "POST"
  });
}

export function canCurrentPlayerJoinGame(gameId: string): Promise<any> {
  return request({
    url: API_BASE_URL + "/game/can-player-join/" + gameId,
    method: "GET"
  });
}

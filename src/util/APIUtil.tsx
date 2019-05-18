import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
import axios from "axios";

const request = (
  options: { url: string; method: string; body?: any },
  auth: boolean = true
) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  // console.log(headers);

  if (localStorage.getItem(ACCESS_TOKEN) && auth) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  // console.log(headers);

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  // console.log(defaults);
  // console.log(options);

  /*return axios
    .request({
      url: options.url,
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      },
      data: options.body
    })
    .then(response => {
      if (!response.data.success) {
        return Promise.reject(response.data);
      }

      return response.data;
    })
    .catch(function(error) {
      return error;
    });*/

  // console.log("options");
  // console.log(options);
  // return fetch(options.url, options).then(response => {
  //   console.log("response");
  //   console.log(response);
  //   /*response.json().then(json => {
  //     console.log(response);
  //     console.log(json);

  //     return json;
  //   });*/

  //   return response;
  // });

  // console.log("options");
  // console.log(options);
  // return fetch(options.url, options).then(response => {
  //   console.log(response);
  //   return response;
  // });

  return axios
    .request({
      url: options.url,
      method: options.method,
      data: options.body,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
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
}) {
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
}) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: signupRequest
  });
}

export function checkUsernameAvailability(username: string) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: "GET"
  });
}

export function checkEmailAvailability(email: string) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET"
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function getUserProfile(username: string) {
  return request({
    url: API_BASE_URL + "/users/" + username,
    method: "GET"
  });
}

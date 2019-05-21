import { Client } from "@stomp/stompjs";

import { WS_BASE_URL } from "../constants";

export function wsConnet(
  subscribeUrl: string,
  callback: (message: string, client: Client) => void
) {
  let client = new Client();
  client.configure({
    brokerURL: WS_BASE_URL,
    onConnect: () => {
      client.subscribe(subscribeUrl, message => {
        callback(message.body, client);
      });
    },
    debug: str => {
      console.log(str);
    }
  });

  client.activate();
  return client;
}

export function createClient(connected: (client: Client) => void) {
  let client = new Client();
  client.configure({
    brokerURL: WS_BASE_URL,
    onConnect: () => {
      connected(client);
    }
  });
  client.activate();
  return client;
}

export function subscribeToWaitForOpponent(
  gameId: string,
  callback: (message: string, client: Client) => void
) {
  let client = wsConnet("/topic/chess/game/" + gameId + "/join", callback);
  return client;
}

export function subscribeToGame(
  gameId: string,
  callback: (message: string, client: Client) => void
) {
  return wsConnet("/topic/chess/game/" + gameId + "/update", callback);
}

export function sendGameJoined(client: Client, gameId: string, token: string) {
  client.publish({
    destination: "/app/chess/game/join/" + gameId,
    body: token
  });
}

export function sendGameUpdate(client: Client, gameId: string, update: any) {
  client.publish({
    destination: "/app/chess/game/update/" + gameId,
    body: update
  });
}

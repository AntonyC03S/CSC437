import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Traveler } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [type, payload] = message;

  switch (type) {
    case "profile/request": {
      const { userid } = payload;
      if (model.profile?.userid === userid) return model;

      return [
        { ...model, profile: { userid } as Traveler },
        requestProfile(payload, user).then((profile) => [
          "profile/load",
          { userid, profile }
        ])
      ];
    }

    case "profile/load": {
      const { profile } = payload;
      return { ...model, profile };
    }

    // add tour/request, tour/load, profile/save, etc.
    case "profile/save": {
      const { userid } = payload;
      const { onSuccess, onFailure } = callbacks || {};
      return saveProfile(payload, user, callbacks)
        .then((profile) =>
          ["profile/load", {userid, profile}]
    }
    default:
      throw new Error(`Unhandled message "${type}"`);
  }


  
}

function requestProfile(
  payload: { userid: string },
  user: Auth.User
): Promise<Traveler> {
  return fetch(`/api/travelers/${payload.userid}`, {
    headers: Auth.headers(user)
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("No response from server");
    })
    .then((json: unknown) => {
      if (json) return json as Traveler;
      throw new Error("No JSON in response from server");
    });
}

function saveProfile(
  msg: {
    userid: string;
    profile: Traveler;
  },
  user: Auth.User,
  callbacks: Message.Reactions
): Promise<Traveler> {
  return fetch(`/api/travelers/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(
        `Failed to save profile for ${msg.userid}`
      );
    })
    .then((json: unknown) => {
      if (json) {
        if (callbacks.onSuccess) callbacks.onSuccess();
        return json as Traveler;
      }
      throw new Error(
        `No JSON in API response`
      )
    })
    .catch((err) => {
      if (callbacks.onFailure) callbacks.onFailure(err);
      throw err;
    });
}
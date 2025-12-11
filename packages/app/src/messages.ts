import { Traveler } from "server/models";


export type Msg =
  | [
      "profile/save",
      {
        userid: string,
        profile: Traveler
      }, {
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["profile/request", { userid: string }]
  | ["tour/request", { tourid: string }]
  | Cmd;

type Cmd =
  | ["profile/load", { userid: string; profile: Traveler }]
  | ["tour/load", { tourid: string; /* tour: Tour */ }];


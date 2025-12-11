import { Tour, Traveler } from "src/models";


export interface Model {
  tour?: Tour;
  profile?: Traveler;
}

export const init: Model = {};
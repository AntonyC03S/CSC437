import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { TourViewElement } from "./views/tour-view.ts";
import { BlazingHeaderElement } from "./components/blazing-header";
import { HeaderElement } from "./components/header";
import { HomeViewElement } from "./views/home-view";

const routes = [
  {
    path: "/app/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
//   "mu-store": class AppStore
//         extends Store.Provider<Model, Msg>
//     {
//         constructor() {
//         super(update, init, "blazing:auth");
//         }
//     },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
        super(routes, "blazing:history", "blazing:auth");
    }
    },
  "home-view": HomeViewElement,
  "traveler-view": TravelerViewElement
});

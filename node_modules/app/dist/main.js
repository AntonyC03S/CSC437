"use strict";
var import_mustang = require("@calpoly/mustang");
var import_lit = require("lit");
var import_home_view = require("./views/home-view");
const routes = [
  {
    path: "/app/tour/:id",
    view: (params) => import_lit.html`
      <tour-view tour-id=${params.id}></tour-view>
    `
  },
  {
    path: "/app",
    view: () => import_lit.html`
      <landing-view></landing-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];
(0, import_mustang.define)({
  "mu-auth": import_mustang.Auth.Provider,
  "mu-history": import_mustang.History.Provider,
  "mu-switch": class AppSwitch extends import_mustang.Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  },
  "home-view": import_home_view.HomeViewElement
});

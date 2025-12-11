"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var systems_svc_exports = {};
__export(systems_svc_exports, {
  default: () => systems_svc_default
});
module.exports = __toCommonJS(systems_svc_exports);
var import_mongoose = require("mongoose");
const CardDataSchema = new import_mongoose.Schema(
  {
    web_link: { type: String, required: true, trim: true },
    icon_link: { type: String, required: true, trim: true },
    name: { type: String, trim: true }
  },
  { collection: "blz_travelers" }
);
const CardDataModel = (0, import_mongoose.model)(
  "Profile",
  CardDataSchema
);
function index() {
  return CardDataModel.find();
}
function get(userid) {
  return CardDataModel.find({ userid }).then((list) => list[0]).catch(() => {
    throw `${userid} Not Found`;
  });
}
var systems_svc_default = { index, get };

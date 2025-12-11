"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var login_form_exports = {};
__export(login_form_exports, {
  LoginFormElement: () => LoginFormElement
});
module.exports = __toCommonJS(login_form_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_reset_css = __toESM(require("../styles/reset.css.js"));
var import_headings_css = __toESM(require("../styles/headings.css.js"));
class LoginFormElement extends import_lit.LitElement {
  @((0, import_decorators.state)())
  formData = {};
  @((0, import_decorators.property)())
  api;
  @((0, import_decorators.property)())
  redirect = "/";
  @((0, import_decorators.state)())
  error;
  get canSubmit() {
    return Boolean(this.api && this.formData.username && this.formData.password);
  }
  render() {
    return import_lit.html`
      <form
        @change=${(e) => this.handleChange(e)}
        @submit=${(e) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
  }
  static styles = [
    import_reset_css.default.styles,
    import_headings_css.default.styles,
    import_lit.css`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `
  ];
  // more to come...
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginFormElement
});

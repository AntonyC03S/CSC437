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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var header_exports = {};
__export(header_exports, {
  HeaderElement: () => HeaderElement
});
module.exports = __toCommonJS(header_exports);
var import_mustang = require("@calpoly/mustang");
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
class HeaderElement extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.loggedIn = false;
    this._authObserver = new import_mustang.Observer(this, "blazing:auth");
  }
  static {
    this.uses = (0, import_mustang.define)({
      "mu-dropdown": import_mustang.Dropdown.Element
    });
  }
  render() {
    return import_lit.html`
      <header>
        <h1>Mechanical Wiki</h1>
        <dark-mode-switch></dark-mode-switch>
        <nav>

          <mu-dropdown>
            <a slot="actuator">
              Hello, ${this.userid || "User"}
            </a>
            <menu>
              <li>
                ${this.loggedIn ? this.renderSignOutButton() : this.renderSignInButton()}
              </li>
            </menu>
          </mu-dropdown>
        </nav>
      </header>
      </template>`;
  }
  static {
    this.styles = [
      import_lit.css`
    :host {
      display: contents;
    }
    header {
      --color-link: var(--color-link-inverted);

      display: flex;
      flex-wrap: wrap;
      align-items: bottom;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
    }
  `
    ];
  }
  renderSignOutButton() {
    return import_lit.html`
      <button
        @click=${(e) => {
      import_mustang.Events.relay(e, "auth:message", ["auth/signout"]);
    }}
      >
        Sign Out
      </button>
    `;
  }
  renderSignInButton() {
    return import_lit.html`
      <a href="/login.html">
        Sign In…
      </a>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth) => {
      const { user } = auth;
      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = void 0;
      }
    });
  }
}
__decorateClass([
  (0, import_decorators.state)()
], HeaderElement.prototype, "loggedIn", 2);
__decorateClass([
  (0, import_decorators.state)()
], HeaderElement.prototype, "userid", 2);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HeaderElement
});

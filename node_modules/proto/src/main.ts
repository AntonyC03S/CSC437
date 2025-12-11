import { define, Auth } from "@calpoly/mustang";
import { dark_mode_switch_Element } from "./dark_mode_switch.ts";
import { card_Element } from "./cards.ts"
import { HeaderElement } from "./header.js";

define({
  "dark-mode-switch": dark_mode_switch_Element,
  "single-card": card_Element,
  "blz-header": HeaderElement,
  "mu-auth": Auth.Provider
});

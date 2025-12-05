import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class DestinationElement extends LitElement {
  override render() {
    // as before...
  }

  static styles = [
    reset.styles,
    css`
      /* CSS for this component */
    `];
}
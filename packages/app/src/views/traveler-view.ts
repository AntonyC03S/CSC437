import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";


export class TravelerViewElement extends View<Model, Msg> {
  @property({ attribute: "user-id" })
  userid?: string;

  @state()
  get profile(): Traveler | undefined {
    return this.model.profile;
  }

  constructor() {
    super("blazing:model"); // must match <mu-store provides="blazing:model">
  }

  render() {
    const profile = this.profile;

    if (!profile) {
      return html`<p>Loading profile...</p>`;
    }

    return html`
      <h2>${profile.name}</h2>
      <p>User ID: ${profile.userid}</p>
      <!-- other profile fields -->
    `;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === "user-id" && newValue && newValue !== oldValue) {
      this.dispatchMessage([
        "profile/request",
        { userid: newValue }
      ]);
    }
  }
}
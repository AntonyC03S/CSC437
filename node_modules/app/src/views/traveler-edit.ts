import { define, Form, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TravelerEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element, // make sure mu-form is defined
  });

  @property()
  userid?: string;

  @state()
  get profile(): Traveler | undefined {
    return this.model.profile;
  }

  render() {
    return html`
      <main class="page">
        <mu-form
          .init=${this.profile}
          @mu-form:submit=${this.handleSubmit}>
          <!-- Form inputs -->
        </mu-form>
      </main>`;
  }

   handleSubmit(event: Form.SubmitEvent<Profile>) {
  this.dispatchMessage([
    "profile/save",
    {
      userid: this.userid,
      profile: event.detail
    },
    {
      onSuccess: () =>
        History.dispatch(this, "history/navigate", {
          href: `/app/traveler/${this.userid}`
        }),
      onFailure: (error: Error) =>
        console.log("ERROR:", error)
    }
  ]);
}
}
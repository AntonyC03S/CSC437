import {
  Auth,
  Observer
} from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

interface card_data {
    web_link: string
    icon_link: string
    name: string
}


export class card_Element extends LitElement {
  @property()
  src?: string;

  @property()
  name?: string;

  @state()
  private card?: card_data;

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
    this._authObserver.observe((auth: Auth.Model) => {
      this._user= auth.user;
    });
  }

  hydrate(src: string) {
      console.log('blz-robots.hydrate called with src =', src);
      fetch(src)
      .then(res => res.json())
      .then((json: card_data[]) => {
        if(json) {
          this.card = json.find(item => item.name === this.name);
        }
      })
    }

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization:
          `Bearer ${(this._user as Auth.AuthenticatedUser).token}`


      }
    );
  }


  override render() {
    return html`
        <a href=${this.card?.web_link} class="card" @pointermove=${this._onPointerMove}>
          <div class="card-content">
            <div class="card-image">
              <svg class="card_icon">
                <use href=${this.card?.icon_link} />
              </svg>
            </div>
            <div class="card-info-wrapper">
              <div class="card-info">
                <div class="card-info-title">
                  <h3>${this.card?.name}</h3>  
                </div>    
              </div>
            </div>
          </div>
        </a>
    `;
  }

  static styles = [
    reset.styles,
    css`
        :host {
            display: inline-block;
        }
        /*
        https://codepen.io/Hyperplexed/pen/MWQeYLW
        Magical Hover Effect (w/ Tutorial)
        by Hyperplexed
        */



        #cards {
        align-items: center;
        background-color: var(--bg-color);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        max-width: 916px;
        width: calc(100% - 20px);

        }

        #cards:hover > .card::after {
        opacity: 1;
        }

        .card {
        background-color: var(--color-third,0.01);
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        height: 260px;
        flex-direction: column;
        position: relative;
        width: 300px;  
        }

        .card:hover::before {
        opacity: 1;
        }

        .card::before,
        .card::after {
        border-radius: inherit;
        content: "";
        height: 100%;
        left: 0px;
        opacity: 0;
        position: absolute;
        top: 0px;
        transition: opacity 500ms;
        width: 100%;
        }

        .card::before {
        background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y), 
            rgba(255, 255, 255, 0.06),
            transparent 30%
        );
        z-index: 3;
        }

        .card::after {  
        background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y), 
            var(--color-second),
            transparent 40%
        );
        z-index: 1;
        }

        .card > .card-content {
        background-color: var(--card-color);
        border-radius: inherit;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        inset: 1px;
        padding: 10px;
        position: absolute;
        z-index: 2;
        }

        /* -- ↓ ↓ ↓ extra card content styles ↓ ↓ ↓ -- */

        .card h1, h2, h3, h4, span {
        color: var(--color-accent);
        } 


        .card-image {
        align-items: center;
        display: flex;
        height: 140px;
        justify-content: center;
        overflow: hidden;
        }

        .card-image > i {
        font-size: 6em;
        opacity: 0.25;
        }

        .card-info-wrapper {
        align-items: center;
        display: flex;
        flex-grow: 1;
        justify-content: flex-start;
        padding: 0px 20px;
        }

        .card-info {
        align-items: flex-start;
        display: flex;
        gap: 10px;
        }

        .card-info > i {  
        font-size: 1em;
        height: 20px;
        line-height: 20px;
        }

        .card-info-title > h3 {
        font-size: 1.1em;
        line-height: 20px;
        }

        .card-info-title > h4 {
        color: var(--color-accent);
        font-size: 0.85em;
        margin-top: 8px;
        }

        .card_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        /* height: 100vh; */
        width: 100vw; 
        }

        .card_icon{
        --size-icon: 150px;
        display: inline-block;
        height: var(--size-icon);
        width: var(--size-icon);
        margin-top: 20px;
        }
        /* -- ↓ ↓ ↓ some responsiveness ↓ ↓ ↓ -- */

        @media(max-width: 1000px) {
        body {
            align-items: flex-start;  
            overflow: auto;
        }
        
        #cards {    
            max-width: 1000px;
            padding: 10px 0px;
        }
        
        .card {
            flex-shrink: 1;
            width: calc(50% - 4px);
        }
        }

        @media(max-width: 500px) {
        .card {
            height: 180px;
        }
        
        .card-image {
            height: 80px;  
        }
        
        .card-image > i {
            font-size: 3em;
        }
            
        .card-info-wrapper {
            padding: 0px 10px;
        }
        
        .card-info > i { 
            font-size: 0.8em; 
        }
        
        .card-info-title > h3 {
            font-size: 0.9em;
        }

        .card-info-title > h4 {
            font-size: 0.8em;
            margin-top: 4px;
        }
        }

        @media(max-width: 320px) {
        .card {
            width: 100%;
        }
        }



    `];

  private _onPointerMove(e: PointerEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }

}

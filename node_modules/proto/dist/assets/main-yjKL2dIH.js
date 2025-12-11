(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var j,le;class tt extends Error{}tt.prototype.name="InvalidTokenError";function As(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function ws(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return As(t)}catch{return atob(t)}}function Es(r,t){if(typeof r!="string")throw new tt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new tt(`Invalid token specified: missing part #${e+1}`);let i;try{i=ws(s)}catch(n){throw new tt(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new tt(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}function xs(r,t){const e=Le(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Le(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Le(r,i.host)}class Ss extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function He(r="mu:message"){return(t,...e)=>t.dispatchEvent(new Ss(e,r))}class Vt{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${t[0]} message`,t);const e=this._update(t,this._context.value);if(console.log(`Next[${t[0]}] => `,e),!Array.isArray(e))this._context.value=e;else{const[s,...i]=e;this._context.value=s,i.forEach(n=>n.then(o=>{o.length&&this.consume(o)}))}}}const Ht="mu:auth:jwt",je=class Ie extends Vt{constructor(t,e){super((s,i)=>this.update(s,i),t,Ie.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":{const{token:i,redirect:n}=t[1];return[Cs(i),Ut(n)]}case"auth/signout":return[Os(e.user),Ut(this._redirectForLogin)];case"auth/redirect":return[e,Ut(this._redirectForLogin,{next:window.location.href})];default:const s=t[0];throw new Error(`Unhandled Auth message "${s}"`)}}};je.EVENT_TYPE="auth:message";let Ps=je;const ks=He(Ps.EVENT_TYPE);function Ut(r,t){return new Promise((e,s)=>{if(r){const i=window.location.href,n=new URL(r,i);t&&Object.entries(t).forEach(([o,l])=>n.searchParams.set(o,l)),console.log("Redirecting to ",r),window.location.assign(n)}e([])})}class mt{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(Ht),t}}class yt extends mt{constructor(t){super();const e=Es(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new yt(t);return localStorage.setItem(Ht,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(Ht);return t?yt.authenticate(t):new mt}}function Cs(r){return{user:yt.authenticate(r),token:r}}function Os(r){return{user:r&&r.authenticated?mt.deauthenticate(r):r,token:""}}function Ts(r,t,e){const s=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});r.dispatchEvent(s)}function jt(r,t,e){const s=r.target;Ts(s,t,e)}function ce(r,t="*"){return r.composedPath().find(i=>{const n=i;return n.tagName&&n.matches(t)})||void 0}function qt(r,...t){const e=r.map((i,n)=>n?[t[n-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const Rs=new DOMParser;function N(r,...t){const e=t.map(l),s=r.map((a,p)=>{if(p===0)return[a];const f=e[p-1];return f instanceof Node?[`<ins id="mu-html-${p-1}"></ins>`,a]:[f,a]}).flat().join(""),i=Rs.parseFromString(s,"text/html"),n=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,p)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${p}`);if(f){const u=f.parentNode;u?.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${p}`)}}),o;function l(a,p){if(a===null)return"";switch(typeof a){case"string":return he(a);case"bigint":case"boolean":case"number":case"symbol":return he(a.toString());case"object":if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(l);return f.replaceChildren(...u),f}return a instanceof Node?a:new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function he(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Et(r,t={mode:"open"}){const e=r.attachShadow(t),s={template:i,styles:n};return s;function i(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}j=class extends HTMLElement{constructor(){super(),this._state={},Et(this).template(j.template).styles(j.styles),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),jt(r,"mu-form:submit",this._state)}),this.submitSlot&&this.submitSlot.addEventListener("slotchange",()=>{var r,t;for(const e of((r=this.submitSlot)==null?void 0:r.assignedNodes())||[])(t=this.form)==null||t.insertBefore(e,this.submitSlot)})}set init(r){this._state=r||{},Ns(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}get submitSlot(){var r;const t=(r=this.shadowRoot)==null?void 0:r.querySelector('slot[name="submit"]');return t||null}},j.template=N`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,j.styles=qt`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `;function Ns(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":i instanceof Date?o.value=i.toISOString().substr(0,10):o.value=i;break;default:o.value=i;break}}}return r}const ze=class De extends Vt{constructor(t){super((e,s)=>this.update(e,s),t,De.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];return Ms(s,i)}case"history/redirect":{const{href:s,state:i}=t[1];return Ls(s,i)}}}};ze.EVENT_TYPE="history:message";let Us=ze;function Ms(r,t={}){return history.pushState(t,"",r),{location:document.location,state:history.state}}function Ls(r,t={}){return history.replaceState(t,"",r),{location:document.location,state:history.state}}const Hs=He(Us.EVENT_TYPE);class _t{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new ue(this._provider,t);this._effects.push(i),e(i)}else xs(this._target,this._contextLabel).then(i=>{const n=new ue(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class ue{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const Ve=class qe extends HTMLElement{constructor(){super(),this._state={},this._user=new mt,this._authObserver=new _t(this,"blazing:auth"),Et(this).template(qe.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;js(i,this._state,e,this.authorization).then(n=>Z(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},Z(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&de(this.src,this.authorization).then(e=>{this._state=e,Z(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&de(this.src,this.authorization).then(i=>{this._state=i,Z(i,this)});break;case"new":s&&(this._state={},Z({},this));break}}};Ve.observedAttributes=["src","new","action"];Ve.template=N`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function de(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function Z(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function js(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const Is=class Be extends Vt{constructor(t,e){super(e,t,Be.EVENT_TYPE,!1)}};Is.EVENT_TYPE="mu:message";const pt=globalThis,Bt=pt.ShadowRoot&&(pt.ShadyCSS===void 0||pt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ft=Symbol(),pe=new WeakMap;let Fe=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Bt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=pe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pe.set(e,t))}return t}toString(){return this.cssText}};const zs=r=>new Fe(typeof r=="string"?r:r+"",void 0,Ft),Ds=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Fe(e,r,Ft)},Vs=(r,t)=>{if(Bt)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=pt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},fe=Bt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return zs(e)})(r):r;const{is:qs,defineProperty:Bs,getOwnPropertyDescriptor:Fs,getOwnPropertyNames:Ws,getOwnPropertySymbols:Ys,getPrototypeOf:Js}=Object,B=globalThis,me=B.trustedTypes,Ks=me?me.emptyScript:"",ye=B.reactiveElementPolyfillSupport,et=(r,t)=>r,gt={toAttribute(r,t){switch(t){case Boolean:r=r?Ks:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Wt=(r,t)=>!qs(r,t),_e={attribute:!0,type:String,converter:gt,reflect:!1,useDefault:!1,hasChanged:Wt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),B.litPropertyMetadata??(B.litPropertyMetadata=new WeakMap);let z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_e){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Bs(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Fs(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_e}static _$Ei(){if(this.hasOwnProperty(et("elementProperties")))return;const t=Js(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(et("properties"))){const e=this.properties,s=[...Ws(e),...Ys(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(fe(i))}else t!==void 0&&e.push(fe(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Vs(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:gt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s,i;const n=this.constructor,o=n._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const l=n.getPropertyOptions(o),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((s=l.converter)==null?void 0:s.fromAttribute)!==void 0?l.converter:gt;this._$Em=o,this[o]=a.fromAttribute(e,l.type)??((i=this._$Ej)==null?void 0:i.get(o))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??Wt)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[et("elementProperties")]=new Map,z[et("finalized")]=new Map,ye?.({ReactiveElement:z}),(B.reactiveElementVersions??(B.reactiveElementVersions=[])).push("2.1.0");const $t=globalThis,vt=$t.trustedTypes,ge=vt?vt.createPolicy("lit-html",{createHTML:r=>r}):void 0,We="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Ye="?"+x,Zs=`<${Ye}>`,U=document,it=()=>U.createComment(""),rt=r=>r===null||typeof r!="object"&&typeof r!="function",Yt=Array.isArray,Qs=r=>Yt(r)||typeof r?.[Symbol.iterator]=="function",Mt=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,ve=/>/g,C=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,Ae=/"/g,Je=/^(?:script|style|textarea|title)$/i,Xs=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),X=Xs(1),F=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),we=new WeakMap,T=U.createTreeWalker(U,129);function Ke(r,t){if(!Yt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(t):t}const Gs=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=Q;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===Q?f[1]==="!--"?o=$e:f[1]!==void 0?o=ve:f[2]!==void 0?(Je.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=C):f[3]!==void 0&&(o=C):o===C?f[0]===">"?(o=i??Q,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?C:f[3]==='"'?Ae:be):o===Ae||o===be?o=C:o===$e||o===ve?o=Q:(o=C,i=void 0);const h=o===C&&r[l+1].startsWith("/>")?" ":"";n+=o===Q?a+Zs:u>=0?(s.push(p),a.slice(0,u)+We+a.slice(u)+x+h):a+x+(u===-2?l:h)}return[Ke(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let It=class Ze{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Gs(t,e);if(this.el=Ze.createElement(p,s),T.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=T.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(We)){const c=f[o++],h=i.getAttribute(u).split(x),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?ei:d[1]==="?"?si:d[1]==="@"?ii:xt}),i.removeAttribute(u)}else u.startsWith(x)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Je.test(i.tagName)){const u=i.textContent.split(x),c=u.length-1;if(c>0){i.textContent=vt?vt.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],it()),T.nextNode(),a.push({type:2,index:++n});i.append(u[c],it())}}}else if(i.nodeType===8)if(i.data===Ye)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(x,u+1))!==-1;)a.push({type:7,index:n}),u+=x.length-1}n++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}};function W(r,t,e=r,s){var i,n;if(t===F)return t;let o=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const l=rt(t)?void 0:t._$litDirective$;return o?.constructor!==l&&((n=o?._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=W(r,o._$AS(r,t.values),o,s)),t}let ti=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);T.currentNode=i;let n=T.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new Jt(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new ri(n,this,t)),this._$AV.push(p),a=s[++l]}o!==a?.index&&(n=T.nextNode(),o++)}return T.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Jt=class Qe{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),rt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==F&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Qs(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&rt(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=It.createElement(Ke(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new ti(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=we.get(t.strings);return e===void 0&&we.set(t.strings,e=new It(t)),e}k(t){Yt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Qe(this.O(it()),this.O(it()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},xt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=W(this,t,e,0),o=!rt(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=W(this,l[s+a],e,a),p===F&&(p=this._$AH[a]),o||(o=!rt(p)||p!==this._$AH[a]),p===$?t=$:t!==$&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ei=class extends xt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},si=class extends xt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},ii=class extends xt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=W(this,t,e,0)??$)===F)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},ri=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}};const Ee=$t.litHtmlPolyfillSupport;Ee?.(It,Jt),($t.litHtmlVersions??($t.litHtmlVersions=[])).push("3.3.0");const ni=(r,t,e)=>{const s=e?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const n=e?.renderBefore??null;s._$litPart$=i=new Jt(t.insertBefore(it(),n),n,void 0,e??{})}return i._$AI(r),i};const nt=globalThis;let V=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ni(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return F}};V._$litElement$=!0,V.finalized=!0,(le=nt.litElementHydrateSupport)==null||le.call(nt,{LitElement:V});const xe=nt.litElementPolyfillSupport;xe?.({LitElement:V});(nt.litElementVersions??(nt.litElementVersions=[])).push("4.2.0");const oi={attribute:!0,type:String,converter:gt,reflect:!1,hasChanged:Wt},ai=(r=oi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Xe(r){return(t,e)=>typeof e=="object"?ai(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function Ge(r){return Xe({...r,state:!0,attribute:!1})}function li(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function ci(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ts={};(function(r){var t=(function(){var e=function(u,c,h,d){for(h=h||{},d=u.length;d--;h[u[d]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,d,y,m,_,Ct){var A=_.length-1;switch(m){case 1:return new y.Root({},[_[A-1]]);case 2:return new y.Root({},[new y.Literal({value:""})]);case 3:this.$=new y.Concat({},[_[A-1],_[A]]);break;case 4:case 5:this.$=_[A];break;case 6:this.$=new y.Literal({value:_[A]});break;case 7:this.$=new y.Splat({name:_[A]});break;case 8:this.$=new y.Param({name:_[A]});break;case 9:this.$=new y.Optional({},[_[A-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let d=function(y,m){this.message=y,this.hash=m};throw d.prototype=Error,new d(c,h)}},parse:function(c){var h=this,d=[0],y=[null],m=[],_=this.table,Ct="",A=0,ne=0,gs=2,oe=1,$s=m.slice.call(arguments,1),g=Object.create(this.lexer),P={yy:{}};for(var Ot in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Ot)&&(P.yy[Ot]=this.yy[Ot]);g.setInput(c,P.yy),P.yy.lexer=g,P.yy.parser=this,typeof g.yylloc>"u"&&(g.yylloc={});var Tt=g.yylloc;m.push(Tt);var vs=g.options&&g.options.ranges;typeof P.yy.parseError=="function"?this.parseError=P.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var bs=function(){var H;return H=g.lex()||oe,typeof H!="number"&&(H=h.symbols_[H]||H),H},b,k,w,Rt,L={},ut,E,ae,dt;;){if(k=d[d.length-1],this.defaultActions[k]?w=this.defaultActions[k]:((b===null||typeof b>"u")&&(b=bs()),w=_[k]&&_[k][b]),typeof w>"u"||!w.length||!w[0]){var Nt="";dt=[];for(ut in _[k])this.terminals_[ut]&&ut>gs&&dt.push("'"+this.terminals_[ut]+"'");g.showPosition?Nt="Parse error on line "+(A+1)+`:
`+g.showPosition()+`
Expecting `+dt.join(", ")+", got '"+(this.terminals_[b]||b)+"'":Nt="Parse error on line "+(A+1)+": Unexpected "+(b==oe?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(Nt,{text:g.match,token:this.terminals_[b]||b,line:g.yylineno,loc:Tt,expected:dt})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+k+", token: "+b);switch(w[0]){case 1:d.push(b),y.push(g.yytext),m.push(g.yylloc),d.push(w[1]),b=null,ne=g.yyleng,Ct=g.yytext,A=g.yylineno,Tt=g.yylloc;break;case 2:if(E=this.productions_[w[1]][1],L.$=y[y.length-E],L._$={first_line:m[m.length-(E||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(E||1)].first_column,last_column:m[m.length-1].last_column},vs&&(L._$.range=[m[m.length-(E||1)].range[0],m[m.length-1].range[1]]),Rt=this.performAction.apply(L,[Ct,ne,A,P.yy,w[1],y,m].concat($s)),typeof Rt<"u")return Rt;E&&(d=d.slice(0,-1*E*2),y=y.slice(0,-1*E),m=m.slice(0,-1*E)),d.push(this.productions_[w[1]][0]),y.push(L.$),m.push(L._$),ae=_[d[d.length-2]][d[d.length-1]],d.push(ae);break;case 3:return!0}}return!0}},p=(function(){var u={EOF:1,parseError:function(h,d){if(this.yy.parser)this.yy.parser.parseError(h,d);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,d=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var y=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),d.length-1&&(this.yylineno-=d.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:d?(d.length===y.length?this.yylloc.first_column:0)+y[y.length-d.length].length-d[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var d,y,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),y=c[0].match(/(?:\r\n?|\n).*/g),y&&(this.yylineno+=y.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:y?y[y.length-1].length-y[y.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],d=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),d)return d;if(this._backtrack){for(var _ in m)this[_]=m[_];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,d,y;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),_=0;_<m.length;_++)if(d=this._input.match(this.rules[m[_]]),d&&(!h||d[0].length>h[0].length)){if(h=d,y=_,this.options.backtrack_lexer){if(c=this.test_match(d,m[_]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[y]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,d,y,m){switch(y){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u})();a.lexer=p;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f})();typeof ci<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(ts);function I(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var es={Root:I("Root"),Concat:I("Concat"),Literal:I("Literal"),Splat:I("Splat"),Param:I("Param"),Optional:I("Optional")},ss=ts.parser;ss.yy=es;var hi=ss,ui=Object.keys(es);function di(r){return ui.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var is=di,pi=is,fi=/[\-{}\[\]+?.,\\\^$|#\s]/g;function rs(r){this.captures=r.captures,this.re=r.re}rs.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var mi=pi({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(fi,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new rs({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),yi=mi,_i=is,gi=_i({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),$i=gi,vi=hi,bi=yi,Ai=$i;ct.prototype=Object.create(null);ct.prototype.match=function(r){var t=bi.visit(this.ast),e=t.match(r);return e||!1};ct.prototype.reverse=function(r){return Ai.visit(this.ast,r)};function ct(r){var t;if(this?t=this:t=Object.create(ct.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=vi.parse(r),t}var wi=ct,Ei=wi,xi=Ei;const Si=li(xi);var Pi=Object.defineProperty,ns=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Pi(t,e,i),i};const os=class extends V{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>X` <h1>Not Found</h1> `,this._cases=t.map(i=>({...i,route:new Si(i.path)})),this._historyObserver=new _t(this,e),this._authObserver=new _t(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),X` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(ks(this,"auth/redirect"),X` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):X` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),X` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){Hs(this,"history/redirect",{href:t})}};os.styles=Ds`
    :host,
    main {
      display: contents;
    }
  `;let as=os;ns([Ge()],as.prototype,"_user");ns([Ge()],as.prototype,"_match");const ls=class zt extends HTMLElement{constructor(){if(super(),Et(this).template(zt.template).styles(zt.styles),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};ls.template=N` <template>
    <slot name="actuator"><button>Menu</button></slot>
    <div id="panel">
      <slot></slot>
    </div>
  </template>`;ls.styles=qt`
    :host {
      position: relative;
    }
    #is-shown {
      display: none;
    }
    #panel {
      display: none;

      position: absolute;
      right: 0;
      margin-top: var(--size-spacing-small);
      width: max-content;
      padding: var(--size-spacing-small);
      border-radius: var(--size-radius-small);
      background: var(--color-background-card);
      color: var(--color-text);
      box-shadow: var(--shadow-popover);
    }
    :host([open]) #panel {
      display: block;
    }
  `;const cs=class Dt extends HTMLElement{constructor(){super(),this._array=[],Et(this).template(Dt.template).styles(Dt.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(hs("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{ce(t,"button.add")?jt(t,"input-array:add"):ce(t,"button.remove")&&jt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],ki(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};cs.template=N`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;cs.styles=qt`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;function ki(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(hs(e)))}function hs(r,t){const e=r===void 0?N`<input />`:N`<input value="${r}" />`;return N`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function Ci(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Oi=Object.defineProperty,Ti=Object.getOwnPropertyDescriptor,Ri=(r,t,e,s)=>{for(var i=Ti(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Oi(t,e,i),i};class Ni extends V{constructor(t){super(),this._pending=[],this._observer=new _t(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate(),this._lastModel=this._context.value;else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Ri([Xe()],Ni.prototype,"model");const ft=globalThis,Kt=ft.ShadowRoot&&(ft.ShadyCSS===void 0||ft.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zt=Symbol(),Se=new WeakMap;let us=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Zt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Kt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Se.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Se.set(e,t))}return t}toString(){return this.cssText}};const Ui=r=>new us(typeof r=="string"?r:r+"",void 0,Zt),Qt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce(((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1]),r[0]);return new us(e,r,Zt)},Mi=(r,t)=>{if(Kt)r.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const s=document.createElement("style"),i=ft.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Pe=Kt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Ui(e)})(r):r;const{is:Li,defineProperty:Hi,getOwnPropertyDescriptor:ji,getOwnPropertyNames:Ii,getOwnPropertySymbols:zi,getPrototypeOf:Di}=Object,St=globalThis,ke=St.trustedTypes,Vi=ke?ke.emptyScript:"",qi=St.reactiveElementPolyfillSupport,st=(r,t)=>r,bt={toAttribute(r,t){switch(t){case Boolean:r=r?Vi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Xt=(r,t)=>!Li(r,t),Ce={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:Xt};Symbol.metadata??=Symbol("metadata"),St.litPropertyMetadata??=new WeakMap;let D=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ce){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Hi(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=ji(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ce}static _$Ei(){if(this.hasOwnProperty(st("elementProperties")))return;const t=Di(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(st("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(st("properties"))){const e=this.properties,s=[...Ii(e),...zi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Pe(i))}else t!==void 0&&e.push(Pe(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mi(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:bt).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:bt;this._$Em=i;const l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){const i=this.constructor,n=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??Xt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,n]of s){const{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[st("elementProperties")]=new Map,D[st("finalized")]=new Map,qi?.({ReactiveElement:D}),(St.reactiveElementVersions??=[]).push("2.1.1");const Gt=globalThis,At=Gt.trustedTypes,Oe=At?At.createPolicy("lit-html",{createHTML:r=>r}):void 0,ds="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,ps="?"+S,Bi=`<${ps}>`,M=document,ot=()=>M.createComment(""),at=r=>r===null||typeof r!="object"&&typeof r!="function",te=Array.isArray,Fi=r=>te(r)||typeof r?.[Symbol.iterator]=="function",Lt=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,Re=/>/g,O=RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ne=/'/g,Ue=/"/g,fs=/^(?:script|style|textarea|title)$/i,Wi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),ms=Wi(1),Y=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Me=new WeakMap,R=M.createTreeWalker(M,129);function ys(r,t){if(!te(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oe!==void 0?Oe.createHTML(t):t}const Yi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=G;for(let l=0;l<e;l++){const a=r[l];let p,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===G?f[1]==="!--"?o=Te:f[1]!==void 0?o=Re:f[2]!==void 0?(fs.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=O):f[3]!==void 0&&(o=O):o===O?f[0]===">"?(o=i??G,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?O:f[3]==='"'?Ue:Ne):o===Ue||o===Ne?o=O:o===Te||o===Re?o=G:(o=O,i=void 0);const h=o===O&&r[l+1].startsWith("/>")?" ":"";n+=o===G?a+Bi:u>=0?(s.push(p),a.slice(0,u)+ds+a.slice(u)+S+h):a+S+(u===-2?l:h)}return[ys(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class lt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[p,f]=Yi(t,e);if(this.el=lt.createElement(p,s),R.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=R.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ds)){const c=f[o++],h=i.getAttribute(u).split(S),d=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:d[2],strings:h,ctor:d[1]==="."?Ki:d[1]==="?"?Zi:d[1]==="@"?Qi:Pt}),i.removeAttribute(u)}else u.startsWith(S)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(fs.test(i.tagName)){const u=i.textContent.split(S),c=u.length-1;if(c>0){i.textContent=At?At.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],ot()),R.nextNode(),a.push({type:2,index:++n});i.append(u[c],ot())}}}else if(i.nodeType===8)if(i.data===ps)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(S,u+1))!==-1;)a.push({type:7,index:n}),u+=S.length-1}n++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function J(r,t,e=r,s){if(t===Y)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl;const n=at(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=J(r,i._$AS(r,t.values),i,s)),t}class Ji{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);R.currentNode=i;let n=R.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new ht(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Xi(n,this,t)),this._$AV.push(p),a=s[++l]}o!==a?.index&&(n=R.nextNode(),o++)}return R.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class ht{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),at(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&at(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=lt.createElement(ys(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const n=new Ji(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=Me.get(t.strings);return e===void 0&&Me.set(t.strings,e=new lt(t)),e}k(t){te(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new ht(this.O(ot()),this.O(ot()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Pt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=J(this,t,e,0),o=!at(t)||t!==this._$AH&&t!==Y,o&&(this._$AH=t);else{const l=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=J(this,l[s+a],e,a),p===Y&&(p=this._$AH[a]),o||=!at(p)||p!==this._$AH[a],p===v?t=v:t!==v&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ki extends Pt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class Zi extends Pt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class Qi extends Pt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??v)===Y)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Xi{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const Gi=Gt.litHtmlPolyfillSupport;Gi?.(lt,ht),(Gt.litHtmlVersions??=[]).push("3.3.1");const tr=(r,t,e)=>{const s=e?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const n=e?.renderBefore??null;s._$litPart$=i=new ht(t.insertBefore(ot(),n),n,void 0,e??{})}return i._$AI(r),i};const ee=globalThis;class q extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=tr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}q._$litElement$=!0,q.finalized=!0,ee.litElementHydrateSupport?.({LitElement:q});const er=ee.litElementPolyfillSupport;er?.({LitElement:q});(ee.litElementVersions??=[]).push("4.2.1");const sr={attribute:!0,type:String,converter:bt,reflect:!1,hasChanged:Xt},ir=(r=sr,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function kt(r){return(t,e)=>typeof e=="object"?ir(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function rr(r){return kt({...r,state:!0,attribute:!1})}const nr=Qt`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,_s={styles:nr};var or=Object.defineProperty,ar=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&or(t,e,i),i};const ie=class ie extends q{render(){return ms`
      <label class="switch" id="darkmode-label">
        <input checked="true" id="checkbox" type="checkbox" />
        <span class="slider">
          <div class="star star_1"></div>
          <div class="star star_2"></div>
          <div class="star star_3"></div>
          <svg viewBox="0 0 16 16" class="cloud_1 cloud">
            <path
              transform="matrix(.77976 0 0 .78395-299.99-418.63)"
              fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
            ></path>
          </svg>
        </span>
      </label>
    `}firstUpdated(){const t=this.renderRoot.querySelector("#checkbox");if(!t)return;const e=()=>{document.body.classList.toggle("dark-mode",t.checked)};t.addEventListener("change",e);const s=window.matchMedia("(prefers-color-scheme: dark)"),i=n=>{const o=("matches"in n,n.matches);t.checked=o,document.body.classList.toggle("dark-mode",o)};i(s),s.addEventListener("change",i)}};ie.styles=[_s.styles,Qt`
        :host {
            display: inline-block;
        }
        /* Theme Switch (https://uiverse.io/JustCode14/red-dingo-61) */
        /* The switch - the box around the slider */
        .switch {
        font-size: 17px;
        position: fixed;
        top: 30px;
        right: 10px;
        display: inline-block;
        width: 4em;
        height: 2.2em;
        border-radius: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Hide default HTML checkbox */
        .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        }

        /* The slider */
        .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #2a2a2a;
        transition: 0.4s;
        border-radius: 30px;
        overflow: hidden;
        }

        .slider:before {
        position: absolute;
        content: "";
        height: 1.2em;
        width: 1.2em;
        border-radius: 20px;
        left: 0.5em;
        bottom: 0.5em;
        transition: 0.4s;
        transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
        box-shadow: inset 8px -4px 0px 0px #fff;
        }

        .switch input:checked + .slider {
        background-color: #00a6ff;
        }

        .switch input:checked + .slider:before {
        transform: translateX(1.8em);
        box-shadow: inset 15px -4px 0px 15px #ffcf48;
        }

        .star {
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        width: 5px;
        transition: all 0.4s;
        height: 5px;
        }

        .star_1 {
        left: 2.5em;
        top: 0.5em;
        }

        .star_2 {
        left: 2.2em;
        top: 1.2em;
        }

        .star_3 {
        left: 3em;
        top: 0.9em;
        }

        .switch input:checked ~ .slider .star {
        opacity: 0;
        }

        .cloud {
        width: 3.5em;
        position: absolute;
        bottom: -1.4em;
        left: -1.1em;
        opacity: 0;
        transition: all 0.4s;
        }

        .switch input:checked ~ .slider .cloud {
        opacity: 1;
        }
    `];let wt=ie;ar([kt()],wt.prototype,"href");var lr=Object.defineProperty,se=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&lr(t,e,i),i};const re=class re extends q{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(t){console.log("blz-robots.hydrate called with src =",t),fetch(t).then(e=>e.json()).then(e=>{e&&(this.card=e.find(s=>s.name===this.name))})}render(){return ms`
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
    `}_onPointerMove(t){const e=t.currentTarget,s=e.getBoundingClientRect(),i=t.clientX-s.left,n=t.clientY-s.top;e.style.setProperty("--mouse-x",`${i}px`),e.style.setProperty("--mouse-y",`${n}px`)}};re.styles=[_s.styles,Qt`
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



    `];let K=re;se([kt()],K.prototype,"src");se([kt()],K.prototype,"name");se([rr()],K.prototype,"card");Ci({"dark-mode-switch":wt,"single-card":K});

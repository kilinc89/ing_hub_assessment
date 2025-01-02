// src/components/app-main.js
import { LitElement, html, css } from 'lit';
import { initRouter } from '../router/router.js';
import './nav-menu.js';
import './language-switcher.js';

export class AppMain extends LitElement {
    firstUpdated() {
        const routerOutlet = this.shadowRoot.getElementById('outlet');
        initRouter(routerOutlet);
    }



    static styles = css`
    /* Basic styling */
  `;

    render() {
        return html`
      <language-switcher @language-changed=${() => this.requestUpdate()}></language-switcher>
      <nav-menu></nav-menu>
      <div id="outlet"></div>
    `;
    }
}
customElements.define('app-main', AppMain);

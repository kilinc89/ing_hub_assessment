// src/components/app-main.js
import { LitElement, html, css } from 'lit';
import { initRouter } from '../router/router.js';
import './nav-menu.js';
import './language-switcher.js';

export class AppMain extends LitElement {

    static styles = css`
    /* Basic styling */
        :host {
        display: block;
        min-height: 100vh;
        background-color: #f9f9f9; /* Set your desired background color */
        }
    `;

    firstUpdated() {
        const routerOutlet = this.shadowRoot.getElementById('outlet');
        initRouter(routerOutlet);
    }



    render() {
        return html`
     
      <nav-menu></nav-menu>
      <div id="outlet"></div>
    `;
    }
}
customElements.define('app-main', AppMain);

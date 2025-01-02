// src/components/nav-menu.js
import { LitElement, html, css } from 'lit';
import { t } from '../utils/i18n.js';

export class NavMenu extends LitElement {
    static styles = css`
    nav {
      display: flex; 
      gap: 1rem;
    }
    a {
      text-decoration: none;
      color: var(--app-link-color, #f60);
    }
  `;

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('language-changed', () => {
            console.log('language-changed');
            this.requestUpdate();
        });
    }

    render() {
        return html`
      <nav>
        <a href="/list">${t('actions.search')}</a>
        <a href="/add">${t('actions.addNew')}</a>
      </nav>
    `;
    }
}
customElements.define('nav-menu', NavMenu);

// src/components/nav-menu.js
import { LitElement, html, css } from 'lit';
import { t } from '../utils/i18n.js';
import './language-switcher.js';
export class NavMenu extends LitElement {
    static styles = css`
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
    }

    a {
      text-decoration: none;
      color: #f60;
      font-weight: bold;
      margin: 0 1rem;
    }

    a:hover {
      color: #e55;
    }

    .nav-left, .nav-right {
      display: flex;
      align-items: center;
    }

    .nav-right {
      gap: 1rem;
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
        <div class="nav-left">
         
        </div>
        <div class="nav-right">
        <a href="/list">${t('actions.employees')}</a>
        <a href="/add">${t('actions.addNew')}</a>
        <language-switcher @language-changed=${() => this.requestUpdate()}></language-switcher>
        </div>
      </nav>
    `;
    }
}
customElements.define('nav-menu', NavMenu);

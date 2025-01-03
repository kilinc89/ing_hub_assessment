import { LitElement, html, css } from 'lit';
import { setLanguage } from '../utils/i18n.js';

export class LanguageSwitcher extends LitElement {
    static styles = css`
        select {
            margin: 0.5rem;
            padding: 0.5rem;
        }
    `;

    handleLanguageChange(event) {
        setLanguage(event.target.value);
        this.dispatchEvent(new CustomEvent('language-changed', { bubbles: true, composed: true }));
    }

    render() {
        return html`
            <select @change=${this.handleLanguageChange}>
                <option value="en">English</option>
                <option value="tr">Turkish</option>
            </select>
        `;
    }
}

customElements.define('language-switcher', LanguageSwitcher); 
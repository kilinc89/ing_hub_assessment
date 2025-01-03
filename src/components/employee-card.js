import { LitElement, html, css } from 'lit';
import { t } from '../utils/i18n.js';

export class EmployeeCard extends LitElement {
    static properties = {
        employee: { type: Object }
    };

    static styles = css`
    .card {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }

    .card-header {
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    .card-content {
      flex-grow: 1;
    }

    .card-content div {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .card-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }

    .card-actions a, .card-actions button {
      background-color: #f60;
      color: white;
      border: none;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      flex: 1;
      margin: 0 0.25rem;
    }

    .card-actions button:hover, .card-actions a:hover {
      background-color: #e55;
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
        const { employee } = this;
        return html`
      <div class="card">
        <div class="card-header">${employee.firstName} ${employee.lastName}</div>
        <div class="card-content">
          <div>${employee.department} - ${employee.position}</div>
          <div>${employee.email}</div>
          <div>${employee.phone}</div>
        </div>
        <div class="card-actions">
          <a href="/edit/${employee.id}">${t('actions.edit')}</a>
          <button @click=${() => this._deleteEmployee()}>${t('actions.delete')}</button>
        </div>
      </div>
    `;
    }

    _deleteEmployee() {
        this.dispatchEvent(new CustomEvent('delete-employee', { detail: this.employee }));
    }
}

customElements.define('employee-card', EmployeeCard); 
import { LitElement, html, css } from 'lit';
import { t } from '../utils/i18n.js';
import { Router } from '@vaadin/router';

export class EmployeeTable extends LitElement {
    static properties = {
        employees: { type: Array }
    };

    static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
      color: #515269;
    }

    th {
      background-color: #f9f9f9;
      font-weight: bold;
      color: #f60;
    }

    td:first-child, td:nth-child(2) {
      font-weight: 500;
      color: #000;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    a, button {
      background-color: #f60;
      color: white;
      border: none;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
    }

    button:hover, a:hover {
      background-color: #e55;
    }

    @media (max-width: 768px) {
      .collapse {
        display: none;
      }
    }
  `;


    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('language-changed', () => {
            this.requestUpdate();
        });
    }

    deleteEmployee(emp) {
        this.dispatchEvent(new CustomEvent('delete-employee', { detail: emp }));
    }

    chooseDepartment(department) {
        return department === "Analytics" ? t('departments.analytics') : t('departments.tech');
    }

    choosePosition(position) {
        return position === "Junior" ? t('positions.junior') : position === "Medior" ? t('positions.medior') : t('positions.senior');
    }

    render() {
        return html`
      <table>
        <thead>
          <tr>
            <th>${t('labels.firstName')}</th>
            <th>${t('labels.lastName')}</th>
            <th class="collapse">${t('labels.dateOfEmployment')}</th>
            <th class="collapse">${t('labels.dateOfBirth')}</th>
            <th class="collapse">${t('labels.phone')}</th>
            <th class="collapse">${t('labels.email')}</th>
            <th class="collapse">${t('labels.department')}</th>
            <th class="collapse">${t('labels.position')}</th>
            <th>${t('actions.edit')}</th>
            <th>${t('actions.delete')}</th>
          </tr>
        </thead>
        <tbody>
          ${this.employees.map(emp => html`
            <tr>
              <td>${emp.firstName}</td>
              <td>${emp.lastName}</td>
              <td class="collapse">${emp.dateOfEmployment}</td>
              <td class="collapse">${emp.dateOfBirth}</td>
              <td class="collapse">${emp.phone}</td>
              <td class="collapse">${emp.email}</td>
              <td class="collapse">${this.chooseDepartment(emp.department)}</td>
              <td class="collapse">${this.choosePosition(emp.position)}</td>
              <td>
      
                 <button @click=${() => Router.go('/edit/' + emp.id)}>${t('actions.edit')}</button>
              </td>
              <td>
                <button @click=${() => this.deleteEmployee(emp)}>${t('actions.delete')}</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
    }

}

customElements.define('employee-table', EmployeeTable); 
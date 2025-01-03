import { LitElement, html, css } from 'lit';
import { t } from '../utils/i18n.js';

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
    }

    th {
      background-color: #f9f9f9;
      font-weight: bold;
      color: #f60;
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
  `;

    render() {
        return html`
      <table>
        <thead>
          <tr>
            <th>${t('labels.firstName')}</th>
            <th>${t('labels.lastName')}</th>
            <th>${t('labels.dateOfEmployment')}</th>
            <th>${t('labels.dateOfBirth')}</th>
            <th>${t('labels.phone')}</th>
            <th>${t('labels.email')}</th>
            <th>${t('labels.department')}</th>
            <th>${t('labels.position')}</th>
            <th>${t('actions.edit')}</th>
            <th>${t('actions.delete')}</th>
          </tr>
        </thead>
        <tbody>
          ${this.employees.map(emp => html`
            <tr>
              <td>${emp.firstName}</td>
              <td>${emp.lastName}</td>
              <td>${emp.dateOfEmployment}</td>
              <td>${emp.dateOfBirth}</td>
              <td>${emp.phone}</td>
              <td>${emp.email}</td>
              <td>${emp.department}</td>
              <td>${emp.position}</td>
              <td>
                <a href="/edit/${emp.id}">${t('actions.edit')}</a>
              </td>
              <td>
                <button @click=${() => this._deleteEmployee(emp)}>${t('actions.delete')}</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
    }

    _deleteEmployee(emp) {
        this.dispatchEvent(new CustomEvent('delete-employee', { detail: emp }));
    }
}

customElements.define('employee-table', EmployeeTable); 
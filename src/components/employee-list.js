// src/components/employee-list.js
import { LitElement, html, css } from 'lit';
import { store } from '../store/store.js';
import { t } from '../utils/i18n.js';
import './pagination.js';

export class EmployeeList extends LitElement {
  static properties = {
    viewMode: { type: String },
    employees: { type: Array },
    currentPage: { type: Number },
    pageSize: { type: Number },
    searchTerm: { type: String }
  };

  constructor() {
    super();
    this.viewMode = 'table';
    this.employees = store.getState().employees || [];
    this.currentPage = 1;
    this.pageSize = 5;
    this.searchTerm = '';

    store.subscribe(() => {
      this.employees = store.getState().employees;
    });
  }

  static styles = css`
    body {
      font-family: Arial, sans-serif;
      color: #333;
    }

    .top-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      padding: 0.5rem;
    }

    .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    button {
      background-color: #f60;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      margin-left: 0.5rem;
    }

    button:hover {
      background-color: #e55;
    }

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

    .card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .card {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .card-actions {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
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
    }

    .card-actions button:hover, .card-actions a:hover {
      background-color: #e55;
    }
  `;

  get filteredEmployees() {
    return this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredEmployees.slice(startIndex, startIndex + this.pageSize);
  }

  handleSearch(e) {
    this.searchTerm = e.target.value;
    this.currentPage = 1;
  }

  changeViewMode(mode) {
    this.viewMode = mode;
  }

  handlePageChange(e) {
    this.currentPage = e.detail;
  }

  deleteEmployee(emp) {
    const confirmed = window.confirm(`${t('actions.confirm')} \n${emp.firstName} ${emp.lastName}`);
    if (confirmed) {
      store.dispatch({ type: 'DELETE_EMPLOYEE', payload: { id: emp.id } });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', () => {
      console.log('language-changed');
      this.requestUpdate();
    });
  }

  renderTable() {
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
          ${this.paginatedEmployees.map(emp => html`
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
                <button @click=${() => this.deleteEmployee(emp)}>${t('actions.delete')}</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  renderList() {
    return html`
      <div class="card-container">
        ${this.paginatedEmployees.map(emp => html`
          <div class="card">
            <div class="card-header">${emp.firstName} ${emp.lastName}</div>
            <div>${emp.department} - ${emp.position}</div>
            <div>${emp.email}</div>
            <div>${emp.phone}</div>
            <div class="card-actions">
              <a href="/edit/${emp.id}">${t('actions.edit')}</a>
              <button @click=${() => this.deleteEmployee(emp)}>${t('actions.delete')}</button>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div>
        <div class="top-container">
          <input type="text" .value=${this.searchTerm} @input=${this.handleSearch} placeholder="${t('actions.search')}..."/>
          <div class="button-container">
            <button @click=${() => this.changeViewMode('table')}>${t('views.table')}</button>
            <button @click=${() => this.changeViewMode('list')}>${t('views.list')}</button>
          </div>
        </div>

        ${this.viewMode === 'table' ? this.renderTable() : this.renderList()}

        <pagination-component
          .currentPage=${this.currentPage}
          .totalPages=${Math.ceil(this.filteredEmployees.length / this.pageSize)}
          @page-changed=${this.handlePageChange}
        ></pagination-component>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);

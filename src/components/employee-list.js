// src/components/employee-list.js
import { LitElement, html, css } from 'lit';
import { store } from '../store/store.js';
import { t } from '../utils/i18n.js';

export class EmployeeList extends LitElement {
  static properties = {
    viewMode: { type: String }, // 'table' or 'list'
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

    // Listen to store changes
    store.subscribe(() => {
      this.employees = store.getState().employees;
    });
  }

  static styles = css`
    /* basic styling for table/list, pagination, etc. */
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
    this.currentPage = 1; // reset to first page
  }

  changeViewMode(mode) {
    this.viewMode = mode;
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredEmployees.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
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
      <ul>
        ${this.paginatedEmployees.map(emp => html`
          <li>
            <div>${emp.firstName} ${emp.lastName}</div>
            <div>${emp.department} - ${emp.position}</div>
            <div>
              <a href="/edit/${emp.id}">${t('actions.edit')}</a>
              <button @click=${() => this.deleteEmployee(emp)}>${t('actions.delete')}</button>
            </div>
          </li>
        `)}
      </ul>
    `;
  }

  render() {
    return html`
      <div>
        <!-- Search Box -->
        <input type="text" .value=${this.searchTerm} @input=${this.handleSearch} placeholder="${t('actions.search')}..."/>

        <!-- Toggle View Mode -->
        <button @click=${() => this.changeViewMode('table')}>Table</button>
        <button @click=${() => this.changeViewMode('list')}>List</button>

        <!-- The actual employee data display -->
        ${this.viewMode === 'table' ? this.renderTable() : this.renderList()}

        <!-- Pagination -->
        <div class="pagination">
          <button @click=${this.prevPage} ?disabled=${this.currentPage === 1}>Previous</button>
          <span>Page ${this.currentPage}</span>
          <button 
            @click=${this.nextPage} 
            ?disabled=${this.currentPage * this.pageSize >= this.filteredEmployees.length}
          >
            Next
          </button>
        </div>
      </div>
    `;
  }
}
customElements.define('employee-list', EmployeeList);

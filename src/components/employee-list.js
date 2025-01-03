// src/components/employee-list.js
import { LitElement, html, css } from 'lit';
import { store } from '../store/store.js';
import { t } from '../utils/i18n.js';
import './pagination.js';
import './employee-card.js';
import './employee-table.js';
import './confirmation-modal.js';

export class EmployeeList extends LitElement {
  static properties = {
    viewMode: { type: String },
    employees: { type: Array },
    currentPage: { type: Number },
    pageSize: { type: Number },
    searchTerm: { type: String },
    showModal: { type: Boolean },
    modalMessage: { type: String },
    modalTitle: { type: String },
    employeeToDelete: { type: Object }
  };

  constructor() {
    super();
    this.viewMode = 'table';
    this.employees = store.getState().employees || [];
    this.currentPage = 1;
    this.pageSize = 5;
    this.searchTerm = '';
    this.showModal = false;
    this.modalMessage = '';
    this.modalTitle = '';
    this.employeeToDelete = null;

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
      padding: 0.5rem 1rem;;

    }

    .content-container {
      padding: 1rem;
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

    .card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    @media (max-width: 600px) {
      .card-container {
        grid-template-columns: 1fr;
      }
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
    this.employeeToDelete = emp;
    this.modalTitle = t('actions.confirmDelete');
    this.modalMessage = `${emp.firstName} ${emp.lastName}`;
    this.showModal = true;
  }

  _handleConfirmDelete() {
    if (this.employeeToDelete) {
      store.dispatch({ type: 'DELETE_EMPLOYEE', payload: { id: this.employeeToDelete.id } });
      this.employeeToDelete = null;
    }
    this.showModal = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', () => {
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <div >
        <div class="top-container">
          <input type="text" .value=${this.searchTerm} @input=${this.handleSearch} placeholder="${t('actions.search')}..."/>
          <div class="button-container">
            <button @click=${() => this.changeViewMode('table')}>${t('views.table')}</button>
            <button @click=${() => this.changeViewMode('list')}>${t('views.list')}</button>
          </div>
        </div>

        <div class="content-container">

          ${this.viewMode === 'table'
        ? html`<employee-table .employees=${this.paginatedEmployees} @delete-employee=${(e) => this.deleteEmployee(e.detail)}></employee-table>`
        : html`<div class="card-container">
                    ${this.paginatedEmployees.map(emp => html`
                      <employee-card .employee=${emp} @delete-employee=${(e) => this.deleteEmployee(e.detail)}></employee-card>
                    `)}
                  </div>`}
        </div>

      

        <pagination-component
          .currentPage=${this.currentPage}
          .totalPages=${Math.ceil(this.filteredEmployees.length / this.pageSize)}
          @page-changed=${this.handlePageChange}
        ></pagination-component>

        <confirmation-modal
          .open=${this.showModal}
          .message=${this.modalMessage}
          .title=${this.modalTitle}
          @confirm=${this._handleConfirmDelete}
          @cancel=${() => (this.showModal = false)}
        ></confirmation-modal>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);

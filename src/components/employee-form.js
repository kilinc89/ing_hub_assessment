// src/components/employee-form.js
import { LitElement, html, css } from 'lit';
import { store, addEmployee, updateEmployee } from '../store/store.js';
import { t } from '../utils/i18n.js';
import { Router } from '@vaadin/router';

export class EmployeeForm extends LitElement {


  static properties = {
    employeeId: { type: String },
    employee: { type: Object }
  };

  static styles = css`
    form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    input, select {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
    }

    button {
      grid-column: span 2;
      background-color: #f60;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background-color: #e55;
    }
  `;

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: 'Analytics',
      position: 'Junior'
    };
  }

  onBeforeEnter(location) {
    const params = location.params;
    this.employeeId = params.id;
    if (this.employeeId) {
      const state = store.getState();
      this.employee = state.employees.find(e => e.id === this.employeeId) || this.employee;
    }
  }



  updateField(e, field) {
    this.employee = { ...this.employee, [field]: e.target.value };
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.employee.firstName || !this.employee.lastName) {
      alert('Please fill required fields.');
      return;
    }

    const confirmed = window.confirm(`${t('actions.confirm')}`);
    if (!confirmed) return;

    if (this.employeeId) {
      store.dispatch(updateEmployee({ ...this.employee }));
    } else {
      const newEmployee = { ...this.employee, id: Date.now().toString() };
      store.dispatch(addEmployee(newEmployee));
    }

    Router.go('/list');
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <label>${t('labels.firstName')}</label>
        <input 
          type="text" 
          .value=${this.employee.firstName} 
          @input=${(e) => this.updateField(e, 'firstName')} 
          required 
        />

        <label>${t('labels.lastName')}</label>
        <input 
          type="text" 
          .value=${this.employee.lastName} 
          @input=${(e) => this.updateField(e, 'lastName')} 
          required 
        />

        <label>${t('labels.dateOfEmployment')}</label>
        <input 
          type="date" 
          .value=${this.employee.dateOfEmployment} 
          @input=${(e) => this.updateField(e, 'dateOfEmployment')} 
          required 
        />

        <label>${t('labels.dateOfBirth')}</label>
        <input 
          type="date" 
          .value=${this.employee.dateOfBirth} 
          @input=${(e) => this.updateField(e, 'dateOfBirth')} 
          required 
        />

        <label>${t('labels.phone')}</label>
        <input 
          type="text" 
          .value=${this.employee.phone} 
          @input=${(e) => this.updateField(e, 'phone')} 
          pattern="^[+0-9\\s\\-()]+$"
        />

        <label>${t('labels.email')}</label>
        <input 
          type="email" 
          .value=${this.employee.email} 
          @input=${(e) => this.updateField(e, 'email')} 
          required 
        />

        <label>${t('labels.department')}</label>
        <select 
          .value=${this.employee.department} 
          @change=${(e) => this.updateField(e, 'department')}
        >
          <option value="Analytics">${t('departments.analytics')}</option>
          <option value="Tech">${t('departments.tech')}</option>
        </select>

        <label>${t('labels.position')}</label>
        <select 
          .value=${this.employee.position} 
          @change=${(e) => this.updateField(e, 'position')}
        >
          <option value="Junior">${t('positions.junior')}</option>
          <option value="Medior">${t('positions.medior')}</option>
          <option value="Senior">${t('positions.senior')}</option>
        </select>

        <button type="submit">
          ${this.employeeId ? t('actions.edit') : t('actions.addNew')}
        </button>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);

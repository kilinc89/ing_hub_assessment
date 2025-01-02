import { LitElement, html, css } from 'lit';

export class EmployeeList extends LitElement {
    static properties = {
        employees: { type: Array },
        viewMode: { type: String },
        currentPage: { type: Number },
        itemsPerPage: { type: Number },
        searchQuery: { type: String }
    };

    static styles = css`
    // ... styles remain the same ...
  `;

    constructor() {
        super();
        this.employees = [];
        this.viewMode = 'table';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.searchQuery = '';

        // Subscribe to store changes
        this._unsubscribe = store.subscribe(() => {
            const state = store.getState();
            this.employees = state.employees;
            this.requestUpdate();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Cleanup subscription when component is removed
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    // ... rest of the component code remains the same ...
}

customElements.define('employee-list', EmployeeList);
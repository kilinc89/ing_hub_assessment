import { EmployeeList } from '../src/components/employee-list.js';
import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import { store } from '../src/store/store.js';

suite('employee-list', () => {
    const mockEmployees = [
        { id: 1, firstName: 'Alice', lastName: 'Johnson', department: 'Tech' },
        { id: 2, firstName: 'Bob', lastName: 'Smith', department: 'Sales' },
        { id: 3, firstName: 'Charlie', lastName: 'Brown', department: 'HR' },
    ];

    let storeStub;

    setup(() => {
        // Stub the store to provide mock employees
        storeStub = sinon.stub(store, 'getState').returns({
            employees: mockEmployees,
        });
    });

    teardown(() => {
        storeStub.restore();
    });

    test('is defined', () => {
        const el = document.createElement('employee-list');
        assert.instanceOf(el, EmployeeList);
    });

    test('renders search input and buttons', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const searchInput = el.shadowRoot.querySelector('input[type="text"]');
        const buttons = el.shadowRoot.querySelectorAll('button');

        assert.isNotNull(searchInput, 'Search input is rendered');
        assert.equal(buttons.length, 2, 'Two buttons are rendered (table and list view)');
    });

    test('filters employees based on search term', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const searchInput = el.shadowRoot.querySelector('input[type="text"]');

        searchInput.value = 'Alice';
        searchInput.dispatchEvent(new Event('input'));

        assert.equal(el.filteredEmployees.length, 1, 'Filters employees correctly based on search term');
        assert.equal(el.filteredEmployees[0].firstName, 'Alice', 'Filtered employee is Alice');
    });

    test('switches view mode between table and list', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);

        // Change to list view and wait for updates
        el.changeViewMode('list');
        await el.updateComplete;

        const cardContainer = el.shadowRoot.querySelector('.card-container');
        assert.isNotNull(cardContainer, 'Card container is rendered in list view');

        // Change to table view and wait for updates
        el.changeViewMode('table');
        await el.updateComplete;

        const employeeTable = el.shadowRoot.querySelector('employee-table');
        assert.isNotNull(employeeTable, 'Employee table is rendered in table view');
    });


    test('handles pagination correctly', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const pagination = el.shadowRoot.querySelector('pagination-component');

        pagination.dispatchEvent(new CustomEvent('page-changed', { detail: 2 }));
        assert.equal(el.currentPage, 2, 'Current page is updated to 2');
    });

    test('opens confirmation modal on delete', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        el.deleteEmployee(mockEmployees[0]);

        assert.isTrue(el.showModal, 'Confirmation modal is shown');
        assert.equal(el.modalMessage, 'Alice Johnson', 'Correct employee name is shown in the modal');
    });

    test('deletes employee on confirmation', async () => {
        const dispatchSpy = sinon.spy(store, 'dispatch');
        const el = await fixture(html`<employee-list></employee-list>`);

        el.deleteEmployee(mockEmployees[0]);
        el._handleConfirmDelete();

        assert.isTrue(dispatchSpy.calledOnce, 'Dispatch is called');
        assert.deepEqual(dispatchSpy.args[0][0], { type: 'DELETE_EMPLOYEE', payload: { id: 1 } }, 'Correct employee is deleted');

        dispatchSpy.restore();
    });

    test('responds to language-changed event', async () => {
        const el = await fixture(html`<employee-list></employee-list>`);
        const requestUpdateSpy = sinon.spy(el, 'requestUpdate');

        window.dispatchEvent(new Event('language-changed'));

        assert.isTrue(requestUpdateSpy.calledOnce, 'requestUpdate is called when language-changed event is fired');
    });
});

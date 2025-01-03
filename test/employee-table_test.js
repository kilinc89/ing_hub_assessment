import { EmployeeTable } from '../src/components/employee-table.js';
import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import { Router } from '@vaadin/router';

suite('employee-table', () => {
    const mockEmployees = [
        {
            id: 1,
            firstName: 'Alice',
            lastName: 'Johnson',
            dateOfEmployment: '2020-01-01',
            dateOfBirth: '1990-01-01',
            phone: '+123456789',
            email: 'alice.johnson@example.com',
            department: 'Analytics',
            position: 'Junior',
        },
        {
            id: 2,
            firstName: 'Bob',
            lastName: 'Smith',
            dateOfEmployment: '2019-05-15',
            dateOfBirth: '1985-06-20',
            phone: '+987654321',
            email: 'bob.smith@example.com',
            department: 'Tech',
            position: 'Senior',
        },
    ];

    test('is defined', () => {
        const el = document.createElement('employee-table');
        assert.instanceOf(el, EmployeeTable);
    });

    test('renders employee data in table', async () => {
        const el = await fixture(html`<employee-table .employees=${mockEmployees}></employee-table>`);
        const rows = el.shadowRoot.querySelectorAll('tbody tr');

        assert.equal(rows.length, mockEmployees.length, 'Correct number of rows are rendered');
        assert.include(rows[0].textContent, 'Alice', 'First row includes correct employee data');
        assert.include(rows[1].textContent, 'Bob', 'Second row includes correct employee data');
    });

    test('renders correct department and position', async () => {
        const el = await fixture(html`<employee-table .employees=${mockEmployees}></employee-table>`);
        const rows = el.shadowRoot.querySelectorAll('tbody tr');

        const aliceRow = rows[0];
        const bobRow = rows[1];

        assert.include(aliceRow.textContent, 'Junior', 'Alice has the correct position rendered');
        assert.include(bobRow.textContent, 'Senior', 'Bob has the correct position rendered');
        assert.include(aliceRow.textContent, 'Analytics', 'Alice has the correct department rendered');
        assert.include(bobRow.textContent, 'Tech', 'Bob has the correct department rendered');
    });

    test('navigates to edit page on edit button click', async () => {
        const routerSpy = sinon.spy(Router, 'go');
        const el = await fixture(html`<employee-table .employees=${mockEmployees}></employee-table>`);
        const editButton = el.shadowRoot.querySelector('tbody tr button');

        editButton.click();

        assert.isTrue(routerSpy.calledOnce, 'Router.go was called once');
        assert.isTrue(routerSpy.calledWith('/edit/1'), 'Router.go was called with the correct URL');

        routerSpy.restore();
    });

    test('dispatches delete-employee event on delete button click', async () => {
        const el = await fixture(html`<employee-table .employees=${mockEmployees}></employee-table>`);
        const deleteButton = el.shadowRoot.querySelectorAll('tbody tr button')[1]; // Second button (delete)

        setTimeout(() => deleteButton.click());
        const event = await oneEvent(el, 'delete-employee');

        assert.deepEqual(event.detail, mockEmployees[0], 'delete-employee event is dispatched with correct employee data');
    });


    test('responds to language-changed event', async () => {
        const el = await fixture(html`<employee-table .employees=${[]}></employee-table>`); // Initialize employees as an empty array
        const requestUpdateSpy = sinon.spy(el, 'requestUpdate');

        window.dispatchEvent(new Event('language-changed'));

        assert.isTrue(requestUpdateSpy.calledOnce, 'requestUpdate is called when language-changed event is fired');
    });

});

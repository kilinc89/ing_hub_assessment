import { EmployeeCard } from '../src/components/employee-card.js';
import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('employee-card', () => {
    const mockEmployee = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        department: 'Engineering',
        position: 'Software Engineer',
        email: 'john.doe@example.com',
        phone: '+123456789'
    };

    test('is defined', () => {
        const el = document.createElement('employee-card');
        assert.instanceOf(el, EmployeeCard);
    });

    test('renders employee details correctly', async () => {
        const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
        const cardHeader = el.shadowRoot.querySelector('.card-header');
        const cardContent = el.shadowRoot.querySelector('.card-content');

        assert.equal(cardHeader.textContent, 'John Doe', 'Card header displays employee name');
        assert.include(cardContent.textContent, 'Engineering - Software Engineer', 'Card content includes department and position');
        assert.include(cardContent.textContent, 'john.doe@example.com', 'Card content includes email');
        assert.include(cardContent.textContent, '+123456789', 'Card content includes phone');
    });

    test('renders actions correctly', async () => {
        const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
        const actions = el.shadowRoot.querySelector('.card-actions');
        const editLink = actions.querySelector('a');
        const deleteButton = actions.querySelector('button');

        assert.isNotNull(editLink, 'Edit link is rendered');
        assert.isNotNull(deleteButton, 'Delete button is rendered');
        assert.equal(editLink.getAttribute('href'), '/edit/1', 'Edit link points to the correct URL');
    });

    test('dispatches delete-employee event on delete button click', async () => {
        const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
        const deleteButton = el.shadowRoot.querySelector('button');

        setTimeout(() => deleteButton.click());
        const event = await oneEvent(el, 'delete-employee');

        assert.equal(event.detail, mockEmployee, 'delete-employee event is dispatched with the correct detail');
    });

    test('applies default styles', async () => {
        const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
        const card = el.shadowRoot.querySelector('.card');
        const cardStyle = getComputedStyle(card);

        assert.equal(cardStyle.backgroundColor, 'rgb(255, 255, 255)', 'Card has white background');
        assert.equal(cardStyle.borderRadius, '8px', 'Card has correct border radius');
        assert.equal(cardStyle.padding, '16px', 'Card has correct padding');
    });

});

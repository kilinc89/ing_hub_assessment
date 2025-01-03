import { EmployeeForm } from '../src/components/employee-form.js';
import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import { store } from '../src/store/store.js';
import { t } from '../src/utils/i18n.js';

suite('employee-form', () => {
    const mockEmployee = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+123456789',
        email: 'john.doe@example.com',
        department: 'Tech',
        position: 'Senior'
    };

    let storeStub;

    setup(() => {
        // Stub the store to prevent state mutation in tests
        storeStub = sinon.stub(store, 'getState').returns({
            employees: [mockEmployee]
        });
    });

    teardown(() => {
        storeStub.restore();
    });

    test('is defined', () => {
        const el = document.createElement('employee-form');
        assert.instanceOf(el, EmployeeForm);
    });

    test('renders the form with initial values', async () => {
        const el = await fixture(html`<employee-form .employee=${mockEmployee}></employee-form>`);
        const inputs = el.shadowRoot.querySelectorAll('input, select');

        assert.equal(inputs[0].value, mockEmployee.firstName, 'First name input has correct value');
        assert.equal(inputs[1].value, mockEmployee.lastName, 'Last name input has correct value');
        assert.equal(inputs[2].value, mockEmployee.dateOfEmployment, 'Date of employment input has correct value');
        assert.equal(inputs[3].value, mockEmployee.dateOfBirth, 'Date of birth input has correct value');
        assert.equal(inputs[4].value, mockEmployee.phone, 'Phone input has correct value');
        assert.equal(inputs[5].value, mockEmployee.email, 'Email input has correct value');
        assert.equal(inputs[6].value, mockEmployee.department, 'Department select has correct value');
        assert.equal(inputs[7].value, mockEmployee.position, 'Position select has correct value');
    });

    test('validates form correctly', async () => {
        const el = await fixture(html`<employee-form></employee-form>`);

        const validateFormSpy = sinon.spy(el, 'validateForm');
        const form = el.shadowRoot.querySelector('form');

        // Simulate form submission
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);

        await aTimeout(0); // Allow any async work to complete

        assert.isTrue(validateFormSpy.calledOnce, 'validateForm was called');
        assert.isFalse(el.validateForm(), 'validateForm returns false when form is incomplete');
        assert.isTrue(el.showError, 'Error modal is shown for incomplete form');
    });



    test('handles confirm action in modal', async () => {
        const el = await fixture(html`<employee-form .employee=${mockEmployee}></employee-form>`);
        el.showModal = true;
        const dispatchSpy = sinon.spy(store, 'dispatch');
        const confirmEvent = new CustomEvent('confirm');

        const modal = el.shadowRoot.querySelector('confirmation-modal');
        modal.dispatchEvent(confirmEvent);

        assert.isTrue(dispatchSpy.called, 'store.dispatch is called to update or add employee');
    });

    test('shows error modal for invalid email', async () => {
        const el = await fixture(html`<employee-form></employee-form>`);
        el.employee = { ...mockEmployee, email: 'invalid_email' };

        const form = el.shadowRoot.querySelector('form');
        const submitEvent = new Event('submit');
        form.dispatchEvent(submitEvent);

        await aTimeout(0); // Wait for validation

        assert.isTrue(el.showError, 'Error modal is shown');
        assert.equal(el.errorMessage, t('validation.phoneExists'), 'Correct error message is shown for invalid email');
    });

    test('reacts to language-changed event', async () => {
        const el = await fixture(html`<employee-form></employee-form>`);
        const requestUpdateSpy = sinon.spy(el, 'requestUpdate');

        window.dispatchEvent(new Event('language-changed'));

        assert.isTrue(requestUpdateSpy.calledOnce, 'requestUpdate is called when language-changed event is fired');
    });
});

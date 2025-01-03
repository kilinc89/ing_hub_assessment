import { ErrorModal } from '../src/components/error-modal.js';
import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('error-modal', () => {
    test('is defined', () => {
        const el = document.createElement('error-modal');
        assert.instanceOf(el, ErrorModal);
    });

    test('renders correctly with default properties', async () => {
        const el = await fixture(html`<error-modal></error-modal>`);
        const modal = el.shadowRoot.querySelector('.error-modal');

        assert.isNotNull(modal, 'Error modal is rendered');
        assert.isFalse(modal.classList.contains('open'), 'Modal is not open by default');
        assert.equal(el.message, '', 'Message is empty by default');
    });

    test('renders with correct message and open state', async () => {
        const el = await fixture(html`<error-modal open message="Test error"></error-modal>`);
        const modal = el.shadowRoot.querySelector('.error-modal');
        const messageDiv = modal.querySelector('.message');

        assert.isTrue(modal.classList.contains('open'), 'Modal is open when the open property is true');
        assert.equal(messageDiv.textContent, 'Test error', 'Correct message is rendered');
    });

    test('closes modal after 5 seconds', async () => {
        const el = await fixture(html`<error-modal open message="Auto-close test"></error-modal>`);
        assert.isTrue(el.open, 'Modal is open initially');

        await aTimeout(5000);
        assert.isFalse(el.open, 'Modal is closed after 5 seconds');
    });

    test('dispatches "close-error-modal" event on close button click', async () => {
        const el = await fixture(html`<error-modal open message="Close test"></error-modal>`);
        const closeButton = el.shadowRoot.querySelector('.close-button');

        setTimeout(() => closeButton.click());
        const event = await oneEvent(el, 'close-error-modal');

        assert.isOk(event, 'close-error-modal event is dispatched');
        assert.isFalse(el.open, 'Modal is closed after button click');
    });

    test('dispatches "close-error-modal" event after auto-close', async () => {
        const el = await fixture(html`<error-modal open message="Auto-close event test"></error-modal>`);

        const event = new Promise((resolve) => el.addEventListener('close-error-modal', resolve));
        await aTimeout(5000);

        const result = await event;
        assert.isOk(result, 'close-error-modal event is dispatched after auto-close');
        assert.isFalse(el.open, 'Modal is closed after auto-close');
    });
});

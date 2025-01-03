/**
 * @license
 * Copyright
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { ConfirmationModal } from '../src/components/confirmation-modal.js';
import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('confirmation-modal', () => {
  test('is defined', () => {
    const el = document.createElement('confirmation-modal');
    assert.instanceOf(el, ConfirmationModal);
  });

  test('has default properties', async () => {
    const el = await fixture(html`<confirmation-modal></confirmation-modal>`);
    assert.equal(el.open, false, 'open defaults to false');
    assert.equal(el.message, '', 'message defaults to an empty string');
    assert.equal(el.title, '', 'title defaults to an empty string');
  });

  test('modal is hidden by default', async () => {
    const el = await fixture(html`<confirmation-modal></confirmation-modal>`);
    const modal = el.shadowRoot.querySelector('.modal');
    assert.isFalse(modal.classList.contains('open'), 'Modal does not have the "open" class');
    // You can also check computed styles or other attributes if needed.
  });

  test('modal is visible when open is true, title and message are shown', async () => {
    const el = await fixture(html`
      <confirmation-modal open title="Confirm Action" message="Are you sure?">
      </confirmation-modal>
    `);
    const modal = el.shadowRoot.querySelector('.modal');
    const title = el.shadowRoot.querySelector('.modal-title');
    const message = el.shadowRoot.querySelector('.modal-message');

    assert.isTrue(modal.classList.contains('open'), 'Modal has the "open" class');
    assert.equal(title.textContent, 'Confirm Action', 'Correct title is rendered');
    assert.equal(message.textContent, 'Are you sure?', 'Correct message is rendered');
  });

  test('dispatches "confirm" event on confirm button click', async () => {
    const el = await fixture(html`<confirmation-modal open></confirmation-modal>`);
    const confirmButton = el.shadowRoot.querySelector('button.confirm');

    setTimeout(() => confirmButton.click());
    const event = await oneEvent(el, 'confirm');

    assert.isOk(event, 'Received the "confirm" event');
  });

  test('dispatches "cancel" event on cancel button click', async () => {
    const el = await fixture(html`<confirmation-modal open></confirmation-modal>`);
    const cancelButton = el.shadowRoot.querySelector('button.cancel');

    setTimeout(() => cancelButton.click());
    const event = await oneEvent(el, 'cancel');

    assert.isOk(event, 'Received the "cancel" event');
  });
});

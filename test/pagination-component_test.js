/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { Pagination } from '../src/components/pagination.js';
import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('pagination-component', () => {
  test('is defined', () => {
    const el = document.createElement('pagination-component');
    assert.instanceOf(el, Pagination);
  });

  test('has default currentPage=1 and totalPages=1', async () => {
    const el = await fixture(html`<pagination-component></pagination-component>`);
    assert.equal(el.currentPage, 1);
    assert.equal(el.totalPages, 1);
  });

  test('renders correct default UI', async () => {
    const el = await fixture(html`<pagination-component></pagination-component>`);

    // Since this is a Lit component, we access its shadowRoot for rendered elements
    const shadow = el.shadowRoot;

    const span = shadow.querySelector('span');
    assert.include(span.textContent, 'Page 1 of 1', 'Displays "Page 1 of 1" by default');

    const [prevBtn, nextBtn] = shadow.querySelectorAll('button');
    assert.isTrue(prevBtn.disabled, 'Previous button is disabled when currentPage = 1');
    assert.isTrue(nextBtn.disabled, 'Next button is disabled when totalPages = 1');
  });

  test('updates text when currentPage and totalPages change', async () => {
    const el = await fixture(html`<pagination-component currentPage="2" totalPages="5"></pagination-component>`);
    const span = el.shadowRoot.querySelector('span');
    assert.include(span.textContent, 'Page 2 of 5');
  });

  test('next button increments currentPage and dispatches "page-changed"', async () => {
    const el = await fixture(html`<pagination-component currentPage="1" totalPages="3"></pagination-component>`);
    const nextButton = el.shadowRoot.querySelector('button:last-of-type');

    // Listen for the custom event
    setTimeout(() => nextButton.click());
    const event = await oneEvent(el, 'page-changed');

    assert.equal(event.detail, 2, 'The "page-changed" event should detail the new page (2)');
    assert.equal(el.currentPage, 2, 'Clicking the Next button increments the currentPage property');
  });

  test('prev button decrements currentPage and dispatches "page-changed"', async () => {
    const el = await fixture(html`<pagination-component currentPage="3" totalPages="5"></pagination-component>`);
    const prevButton = el.shadowRoot.querySelector('button:first-of-type');

    // Listen for the custom event
    setTimeout(() => prevButton.click());
    const event = await oneEvent(el, 'page-changed');

    assert.equal(event.detail, 2, 'The "page-changed" event should detail the new page (2)');
    assert.equal(el.currentPage, 2, 'Clicking the Prev button decrements the currentPage property');
  });

  test('disables prev button when on the first page', async () => {
    const el = await fixture(html`<pagination-component currentPage="1" totalPages="5"></pagination-component>`);
    const prevButton = el.shadowRoot.querySelector('button:first-of-type');
    assert.isTrue(prevButton.disabled, 'Previous button should be disabled when on page 1');
  });

  test('disables next button when on the last page', async () => {
    const el = await fixture(html`<pagination-component currentPage="5" totalPages="5"></pagination-component>`);
    const nextButton = el.shadowRoot.querySelector('button:last-of-type');
    assert.isTrue(nextButton.disabled, 'Next button should be disabled when on the last page');
  });
});

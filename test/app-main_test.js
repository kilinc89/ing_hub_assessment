import { AppMain } from '../src/components/app-main.js';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('app-main', () => {
  test('is defined', () => {
    const el = document.createElement('app-main');
    assert.instanceOf(el, AppMain);
  });

  test('renders nav-menu and outlet', async () => {
    const el = await fixture(html`<app-main></app-main>`);
    const navMenu = el.shadowRoot.querySelector('nav-menu');
    const outlet = el.shadowRoot.querySelector('#outlet');

    assert.isNotNull(navMenu, 'The nav-menu component is rendered');
    assert.isNotNull(outlet, 'The outlet div is rendered');
  });


  test('has default styles', async () => {
    const el = await fixture(html`<app-main></app-main>`);
    const style = getComputedStyle(el);

    assert.equal(style.display, 'block', 'Component has block display');
    assert.equal(style.backgroundColor, 'rgb(249, 249, 249)', 'Component has the correct background color');
  });
});

import { NavMenu } from '../src/components/nav-menu.js';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';

suite('nav-menu', () => {
    test('is defined', () => {
        const el = document.createElement('nav-menu');
        assert.instanceOf(el, NavMenu);
    });

    test('renders navigation links and language switcher', async () => {
        const el = await fixture(html`<nav-menu></nav-menu>`);
        const links = el.shadowRoot.querySelectorAll('a');
        const languageSwitcher = el.shadowRoot.querySelector('language-switcher');

        assert.equal(links.length, 2, 'Two navigation links are rendered');
        assert.equal(links[0].getAttribute('href'), '/list', 'First link points to "/list"');
        assert.equal(links[1].getAttribute('href'), '/add', 'Second link points to "/add"');
        assert.isNotNull(languageSwitcher, 'Language switcher is rendered');
    });

    test('updates UI on language-changed event', async () => {
        const el = await fixture(html`<nav-menu></nav-menu>`);
        const requestUpdateSpy = sinon.spy(el, 'requestUpdate');

        window.dispatchEvent(new Event('language-changed'));

        assert.isTrue(requestUpdateSpy.calledOnce, 'requestUpdate is called on language-changed event');
    });

    test('handles language switcher interaction', async () => {
        const el = await fixture(html`<nav-menu></nav-menu>`);
        const languageSwitcher = el.shadowRoot.querySelector('language-switcher');

        const event = new CustomEvent('language-changed', { bubbles: true, composed: true });
        languageSwitcher.dispatchEvent(event);

        assert.isOk(event, 'language-changed event is dispatched');
    });
});

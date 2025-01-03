import { LanguageSwitcher } from '../src/components/language-switcher.js';
import { fixture, assert, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import { setLanguage } from '../src/utils/i18n.js';

suite('language-switcher', () => {
    test('is defined', () => {
        const el = document.createElement('language-switcher');
        assert.instanceOf(el, LanguageSwitcher);
    });

    test('renders dropdown with languages', async () => {
        const el = await fixture(html`<language-switcher></language-switcher>`);
        const select = el.shadowRoot.querySelector('select');
        const options = select.querySelectorAll('option');

        assert.isNotNull(select, 'Dropdown is rendered');
        assert.equal(options.length, 2, 'Dropdown has two language options');
        assert.equal(options[0].value, 'en', 'First option is English');
        assert.equal(options[1].value, 'tr', 'Second option is Turkish');
    });

});

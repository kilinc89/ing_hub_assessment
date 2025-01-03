import { initRouter } from '../src/router/router.js'
import { Router } from '@vaadin/router';
import { fixture, assert } from '@open-wc/testing';
import sinon from 'sinon';

suite('router', () => {
    let outlet;

    setup(async () => {
        outlet = await fixture('<div></div>');
    });

    teardown(() => {
        // Clear the router instance to avoid side effects

    });

    test('initializes router with correct routes', () => {
        const routerSpy = sinon.spy(Router.prototype, 'setRoutes');
        initRouter(outlet);

        assert.isTrue(routerSpy.calledOnce, 'setRoutes was called once');
        const routes = routerSpy.getCall(0).args[0];

        assert.equal(routes.length, 5, 'Correct number of routes defined');
        assert.deepEqual(
            routes.map((route) => route.path),
            ['/', '/list', '/add', '/edit/:id', '(.*)'],
            'Routes have the correct paths'
        );

        routerSpy.restore();
    });


});

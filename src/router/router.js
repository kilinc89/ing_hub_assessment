// src/router/router.js
import { Router } from '@vaadin/router';
import '../components/app-main.js';
import '../components/employee-list.js';
import '../components/employee-form.js';  // create/edit

export const initRouter = (outlet) => {
    const router = new Router(outlet);
    router.setRoutes([
        { path: '/', component: 'employee-list' },
        { path: '/list', component: 'employee-list' },
        { path: '/add', component: 'employee-form' },
        {
            path: '/edit/:id',
            component: 'employee-form'
        },
        // fallback
        { path: '(.*)', component: 'employee-list' }
    ]);
};

// src/store/store.js
import { createStore } from 'redux';

const initialState = {
    employees: Array.from({ length: 15 }, (_, i) => ({
        id: i.toString(),
        firstName: `Employee${i + 1}`,
        lastName: `LastName${i + 1}`,
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '123-456-7890',
        email: `employee${i + 1}@example.com`,
        department: 'Analytics',
        position: 'Junior'
    }))
};

function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };
        case 'UPDATE_EMPLOYEE': {
            const updated = state.employees.map(e =>
                e.id === action.payload.id ? { ...action.payload } : e
            );
            return { ...state, employees: updated };
        }
        case 'DELETE_EMPLOYEE': {
            const filtered = state.employees.filter(e => e.id !== action.payload.id);
            return { ...state, employees: filtered };
        }
        default:
            return state;
    }
}

export const store = createStore(employeeReducer);

// Action creators
export const addEmployee = (employee) => ({ type: 'ADD_EMPLOYEE', payload: employee });
export const updateEmployee = (employee) => ({ type: 'UPDATE_EMPLOYEE', payload: employee });
export const deleteEmployee = (employee) => ({ type: 'DELETE_EMPLOYEE', payload: employee });

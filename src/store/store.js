// src/store/store.js
import { createStore } from 'redux';

// Load initial state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('employeeState');
        if (serializedState === null) {
            return {
                employees: []
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state:', err);
        return undefined;
    }
};

// Save state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('employeeState', serializedState);
    } catch (err) {
        console.error('Error saving state:', err);
    }
};

const initialState = loadState();

function employeeReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            newState = {
                ...state,
                employees: [...state.employees, action.payload]
            };
            break;
        case 'UPDATE_EMPLOYEE': {
            const updated = state.employees.map(e =>
                e.id === action.payload.id ? { ...action.payload } : e
            );
            newState = { ...state, employees: updated };
            break;
        }
        case 'DELETE_EMPLOYEE': {
            const filtered = state.employees.filter(e => e.id !== action.payload.id);
            newState = { ...state, employees: filtered };
            break;
        }
        default:
            return state;
    }

    // Save to localStorage after each state change
    saveState(newState);
    return newState;
}

export const store = createStore(employeeReducer);

// Action creators
export const addEmployee = (employee) => ({ type: 'ADD_EMPLOYEE', payload: employee });
export const updateEmployee = (employee) => ({ type: 'UPDATE_EMPLOYEE', payload: employee });
export const deleteEmployee = (employee) => ({ type: 'DELETE_EMPLOYEE', payload: employee });

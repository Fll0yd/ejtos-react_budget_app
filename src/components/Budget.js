import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, currency, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState('');

    useEffect(() => {
        setNewBudget(budget);
    }, [budget]);

    const handleBudgetChange = (event) => {
        const updatedBudget = parseInt(event.target.value);
        setNewBudget(updatedBudget);

        if (updatedBudget > 20000) {
            setError('Budget cannot exceed £20,000.');
        } else if (updatedBudget < expensesTotal()) {
            setError('Budget cannot be lower than the total allocated spending.');
        } else {
            setError('');
        }
    };

    const expensesTotal = () => {
        return expenses.reduce((total, expense) => total + expense.cost, 0);
    };

    const handleSave = () => {
        if (newBudget > 20000) {
            setError('Budget cannot exceed £20,000.');
            return;
        }

        if (newBudget < expensesTotal()) {
            setError('Budget cannot be lower than the total allocated spending.');
            return;
        }

        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    };

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget ({currency}): {newBudget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                style={{ marginLeft: '10px' }}
            />
            <button className="btn btn-primary" onClick={handleSave} style={{ marginLeft: '10px' }}>
                Save
            </button>
            {error && <p style={{ color: 'red', marginLeft: '10px' }}>{error}</p>}

            {/* Currency Dropdown */}
            <div className="dropdown" style={{ marginLeft: '10px' }}>
                <label htmlFor="currency">Currency:</label>
                <select
                    id="currency"
                    value={currency}
                    onChange={handleCurrencyChange}
                    className="btn btn-secondary dropdown-toggle"
                >
                    <option value="£">£ Pound</option>
                    <option value="$">$ Dollar</option>
                    <option value="€">€ Euro</option>
                    <option value="₹">₹ Rupee</option>
                </select>
            </div>
        </div>
    );
};

export default Budget;

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = () => {
    const { dispatch, remaining, currency } = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');
    const [error, setError] = useState('');

    const submitEvent = () => {
        // Validate the cost to ensure it's a positive number and doesn't exceed remaining budget
        const allocatedAmount = parseFloat(cost);

        if (isNaN(allocatedAmount) || allocatedAmount <= 0) {
            setError('Please enter a valid positive number for the allocation.');
            return;
        }

        if (allocatedAmount > remaining) {
            setError(`The allocated amount ${currency}${allocatedAmount} exceeds the remaining budget ${currency}${remaining}.`);
            return;
        }

        // Prepare expense object based on selected department and action
        const expense = {
            name: name,
            cost: allocatedAmount,
        };

        // Dispatch appropriate action based on the selected action (Add or Reduce)
        if (action === 'Reduce') {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }

        // Clear form inputs and error state after successful submission
        setName('');
        setCost('');
        setAction('');
        setError('');
    };

    return (
        <div>
            <div className='row'>
                <div className='input-group mb-3' style={{ marginLeft: '2rem' }}>
                    <div className='input-group-prepend'>
                        <label className='input-group-text' htmlFor='inputGroupSelect01'>
                            Department
                        </label>
                    </div>
                    <select
                        className='custom-select'
                        id='inputGroupSelect01'
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option defaultValue>Choose...</option>
                        <option value='Marketing'>Marketing</option>
                        <option value='Sales'>Sales</option>
                        <option value='Finance'>Finance</option>
                        <option value='HR'>HR</option>
                        <option value='IT'>IT</option>
                        <option value='Admin'>Admin</option>
                    </select>

                    <div className='input-group-prepend' style={{ marginLeft: '2rem' }}>
                        <label className='input-group-text' htmlFor='inputGroupSelect02'>
                            Action
                        </label>
                    </div>
                    <select
                        className='custom-select'
                        id='inputGroupSelect02'
                        onChange={(event) => setAction(event.target.value)}
                    >
                        <option defaultValue value='Add'>
                            Add
                        </option>
                        <option value='Reduce'>Reduce</option>
                    </select>

                    <div className='input-group-prepend'>
                        <span className='input-group-text'>{currency}</span>
                    </div>
                    <input
                        required
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '1rem', width: '100px' }} // Adjust styling for spacing
                        onChange={(event) => setCost(event.target.value)}
                    />

                    <button className='btn btn-primary' onClick={submitEvent} style={{ marginLeft: '1rem' }}>
                        Save
                    </button>
                </div>
                {error && <p style={{ color: 'red', marginLeft: '2rem' }}>{error}</p>}
            </div>
        </div>
    );
};

export default AllocationForm;

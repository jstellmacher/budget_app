import React, { useState, useEffect } from 'react';

const BudgetForm = ({ onSave, initialData }) => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('One-time');
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if (initialData) {
            setCategory(initialData.category);
            setAmount(initialData.amount);
            setDate(initialData.date);
            setDescription(initialData.description || '');
            setFrequency(initialData.frequency || 'One-time');
            setPaymentMethod(initialData.paymentMethod || '');
        } else {
            setCategory('');
            setAmount('');
            setDate('');
            setDescription('');
            setFrequency('One-time');
            setPaymentMethod('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount <= 0) {
            alert('Amount must be a positive number');
            return;
        }
        const newItem = {
            category,
            amount: parseFloat(amount),
            date,
            description,
            frequency,
            paymentMethod,
        };
        onSave(newItem);
        // Reset the form fields
        setCategory('');
        setAmount('');
        setDate('');
        setDescription('');
        setFrequency('One-time');
        setPaymentMethod('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-lg bg-white">
            <h2 className="text-lg font-bold mb-2">{initialData ? 'Update' : 'Add'} Budget Item</h2>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mb-2 p-2 border rounded w-full"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="mb-2 p-2 border rounded w-full"
                min="0" // Prevent negative numbers
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mb-2 p-2 border rounded w-full"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 p-2 border rounded w-full"
            />
            <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="mb-2 p-2 border rounded w-full"
            >
                <option value="One-time">One-time</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
            </select>
            <input
                type="text"
                placeholder="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-2 p-2 border rounded w-full"
            />
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
                {initialData ? 'Update' : 'Add'} Item
            </button>
        </form>
    );
};

export default BudgetForm;

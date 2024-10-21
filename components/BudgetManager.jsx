// components/BudgetManager.js
import React, { useEffect, useState } from 'react';
import BudgetTable from './BudgetTable';
import BudgetForm from './BudgetForm';

const BudgetManager = () => {
    const [budgetData, setBudgetData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/budgetData.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBudgetData(data);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        fetchData();
    }, []);

    const handleBudgetChange = async (item, index) => {
        if (index === null) {
            await addBudgetItem(item);
        } else {
            await updateBudgetItem(item, index);
        }
    };

    const addBudgetItem = async (newItem) => {
        try {
            const response = await fetch('/api/budget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            const savedItem = await response.json();
            setBudgetData((prev) => [...prev, savedItem]);
        } catch (error) {
            console.error('Error adding budget item:', error);
        }
    };

    const updateBudgetItem = async (updatedItem, index) => {
        try {
            const response = await fetch(`/api/budget/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            const savedItem = await response.json();
            setBudgetData((prev) =>
                prev.map((item, i) => (i === index ? savedItem : item))
            );
            setEditingIndex(null);
        } catch (error) {
            console.error('Error updating budget item:', error);
        }
    };

    const deleteBudgetItem = async (index) => {
        try {
            await fetch(`/api/budget/${index}`, { method: 'DELETE' });
            setBudgetData((prev) => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting budget item:', error);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    return (
        <div>
            <BudgetForm
                onSave={handleBudgetChange}
                initialData={editingIndex !== null ? budgetData[editingIndex] : null}
            />
            <BudgetTable
                budgetData={budgetData}
                onEdit={handleEdit}
                onDelete={deleteBudgetItem}
            />
        </div>
    );
};

export default BudgetManager;

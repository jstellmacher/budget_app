// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import BudgetChart from './BudgetChart';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/budgetData.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <BudgetChart budgetData={data} />
        </div>
    );
};

export default Dashboard;

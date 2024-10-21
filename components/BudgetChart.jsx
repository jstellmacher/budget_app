// components/BudgetChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetChart = ({ budgetData }) => {
    // Process data for the chart
    const categories = Array.from(new Set(budgetData.map(item => item.category))); // Unique categories
    const amounts = categories.map(category =>
        budgetData
            .filter(item => item.category === category)
            .reduce((sum, item) => sum + parseFloat(item.amount), 0) // Sum amounts by category
    );

    // Chart data configuration
    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Expenses by Category',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color of the bars
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Budget Expenses',
            },
        },
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Expense Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BudgetChart;

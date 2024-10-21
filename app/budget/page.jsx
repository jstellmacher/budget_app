'use client';
import React from 'react';
import BudgetManager from '../../components/BudgetManager';

const BudgetPage = () => {
    return (
        <div>
            <h1 className="text-xl font-bold">Budget Overview</h1>
            <BudgetManager />
        </div>
    );
};

export default BudgetPage;

// src/app/api/expenses/route.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/budgetData.json');

export async function GET() {
    const jsonData = await fs.promises.readFile(filePath);
    return new Response(jsonData, { status: 200 });
}

export async function POST(req) {
    const data = await req.json();
    const jsonData = await fs.promises.readFile(filePath);
    const expenses = JSON.parse(jsonData);

    // Add the new expense
    expenses.push({ id: Date.now(), ...data });

    // Write the updated data back to the JSON file
    await fs.promises.writeFile(filePath, JSON.stringify(expenses, null, 2));

    return new Response('Expense added!', { status: 201 });
}

export async function PUT(req) {
    const updatedExpense = await req.json();
    const jsonData = await fs.promises.readFile(filePath);
    const expenses = JSON.parse(jsonData);

    // Find and update the expense
    const index = expenses.findIndex(exp => exp.id === updatedExpense.id);
    if (index !== -1) {
        expenses[index] = updatedExpense;
        await fs.promises.writeFile(filePath, JSON.stringify(expenses, null, 2));
        return new Response('Expense updated!', { status: 200 });
    }

    return new Response('Expense not found', { status: 404 });
}

export async function DELETE(req) {
    const { id } = await req.json();
    const jsonData = await fs.promises.readFile(filePath);
    const expenses = JSON.parse(jsonData);

    // Remove the expense
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    await fs.promises.writeFile(filePath, JSON.stringify(updatedExpenses, null, 2));

    return new Response('Expense deleted!', { status: 200 });
}

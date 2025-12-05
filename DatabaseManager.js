const fs = require('fs-extra');
const path = require('path');

class DatabaseManager {
    constructor() {
        this.dataPath = path.join(__dirname, 'data', 'expenses.json');
        this.expenses = [];
        this.categories = [];
        this.initializeDatabase();
    }

    async initializeDatabase() {
        try {
            await fs.ensureDir(path.dirname(this.dataPath));
            
            if (await fs.pathExists(this.dataPath)) {
                const data = await fs.readJson(this.dataPath);
                this.expenses = data.expenses || [];
                this.categories = data.categories || [];
            } else {
                await this.saveToFile();
            }
        } catch (error) {
            console.error('Error initializing database:', error);
            this.expenses = [];
            this.categories = [];
        }
    }

    async saveToFile() {
        try {
            await fs.writeJson(this.dataPath, {
                expenses: this.expenses,
                categories: this.categories,
                lastUpdated: new Date().toISOString()
            }, { spaces: 2 });
        } catch (error) {
            console.error('Error saving to file:', error);
        }
    }

    async saveExpense(expense) {
        this.expenses.push(expense);
        await this.saveToFile();
        console.log(`[БД] Збережено витрату #${expense.id}`);
        return expense;
    }

    async updateExpense(id, updatedData) {
        const index = this.expenses.findIndex(exp => exp.id === id);
        if (index !== -1) {
            this.expenses[index] = { ...this.expenses[index], ...updatedData };
            await this.saveToFile();
            console.log(`[БД] Оновлено витрату #${id}`);
            return this.expenses[index];
        }
        return null;
    }

    async deleteExpense(id) {
        const index = this.expenses.findIndex(exp => exp.id === id);
        if (index !== -1) {
            const deleted = this.expenses.splice(index, 1)[0];
            await this.saveToFile();
            console.log(`[БД] Видалено витрату #${id}`);
            return deleted;
        }
        return null;
    }

    getExpenses() {
        return [...this.expenses];
    }

    getExpenseById(id) {
        return this.expenses.find(exp => exp.id === id);
    }

    getExpensesByCategory(categoryId) {
        return this.expenses.filter(exp => exp.category.id === categoryId);
    }

    async addCategory(category) {
        this.categories.push(category);
        await this.saveToFile();
        return category;
    }

    getCategories() {
        return [...this.categories];
    }

    getCategoryById(id) {
        return this.categories.find(cat => cat.id === id);
    }
}

module.exports = DatabaseManager;
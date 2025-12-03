class DatabaseManager {
    constructor() {
        this.expenses = [];
    }
    saveExpense(expense) {
        this.expenses.push(expense);
        console.log(`[БД] Збережено витрату #${expense.id}`);
    }
    getExpenses() {
        return this.expenses;
    }
}
module.exports = DatabaseManager;
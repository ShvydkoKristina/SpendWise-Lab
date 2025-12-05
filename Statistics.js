class Statistics {
    constructor(databaseManager) {
        this.db = databaseManager;
    }

    calculateTotal(expenses = null) {
        const list = expenses || this.db.getExpenses();
        return list.reduce((sum, item) => sum + item.amount, 0);
    }

    calculateAverage(expenses = null) {
        const list = expenses || this.db.getExpenses();
        return list.length === 0 ? 0 : this.calculateTotal(list) / list.length;
    }

    calculateTotalByCategory(categoryId) {
        const categoryExpenses = this.db.getExpensesByCategory(categoryId);
        return this.calculateTotal(categoryExpenses);
    }

    getMonthlySpending() {
        const expenses = this.db.getExpenses();
        const monthly = {};
        
        expenses.forEach(expense => {
            const month = expense.date.substring(0, 7); // YYYY-MM
            if (!monthly[month]) {
                monthly[month] = 0;
            }
            monthly[month] += expense.amount;
        });

        return monthly;
    }

    getTopCategories(limit = 5) {
        const categories = this.db.getCategories();
        const result = categories.map(category => ({
            category: category.name,
            total: this.calculateTotalByCategory(category.id),
            color: category.color
        }));

        return result
            .sort((a, b) => b.total - a.total)
            .slice(0, limit);
    }

    getSpendingTrend() {
        const monthly = this.getMonthlySpending();
        const months = Object.keys(monthly).sort();
        
        if (months.length < 2) return null;

        const trend = {};
        for (let i = 1; i < months.length; i++) {
            const current = monthly[months[i]];
            const previous = monthly[months[i - 1]];
            const change = previous === 0 ? 0 : ((current - previous) / previous) * 100;
            trend[months[i]] = {
                amount: current,
                change: parseFloat(change.toFixed(2))
            };
        }

        return trend;
    }
}

module.exports = Statistics;
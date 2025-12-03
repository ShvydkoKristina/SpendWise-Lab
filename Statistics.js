class Statistics {
    constructor(databaseManager) {
        this.db = databaseManager;
    }
    calculateTotal() {
        return this.db.getExpenses().reduce((sum, item) => sum + item.amount, 0);
    }
    calculateAverage() {
        const list = this.db.getExpenses();
        return list.length === 0 ? 0 : this.calculateTotal() / list.length;
    }
}
module.exports = Statistics;
class Expense {
    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }
    getInfo() {
        return `${this.date} | ${this.amount} грн | ${this.category.name} | ${this.description}`;
    }
}
module.exports = Expense;
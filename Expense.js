class Expense {
    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = parseFloat(amount);
        this.category = category;
        this.description = description;
        this.createdAt = new Date().toISOString();
    }

    getInfo() {
        return `${this.date} | ${this.amount} грн | ${this.category.name} | ${this.description}`;
    }

    toJSON() {
        return {
            id: this.id,
            date: this.date,
            amount: this.amount,
            category: {
                id: this.category.id,
                name: this.category.name,
                color: this.category.color
            },
            description: this.description,
            createdAt: this.createdAt
        };
    }
}

module.exports = Expense;
const Category = require("./Category");
const Expense = require("./Expense");
const DatabaseManager = require("./DatabaseManager");
const Statistics = require("./Statistics");

console.log("--- SpendWise System Started ---");

const db = new DatabaseManager();
const stats = new Statistics(db);

const food = new Category(1, "Їжа", "Green");
const transport = new Category(2, "Транспорт", "Blue");

db.saveExpense(new Expense(101, "2025-10-01", 150, food, "Обід"));
db.saveExpense(new Expense(102, "2025-10-02", 40, transport, "Автобус"));

console.log("\n--- Статистика ---");
console.log("Всього витрачено: " + stats.calculateTotal() + " грн");
console.log("Середній чек: " + stats.calculateAverage() + " грн");

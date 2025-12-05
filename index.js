const Category = require('./Category');
const Expense = require('./Expense');
const DatabaseManager = require('./DatabaseManager');
const Statistics = require('./Statistics');
const { v4: uuidv4 } = require('uuid');
const chalk = require('chalk');

console.log(chalk.blue.bold("--- SpendWise System Started ---\n"));

async function runApplication() {
    const db = new DatabaseManager();
    const stats = new Statistics(db);

    // Wait for database initialization
    await new Promise(resolve => setTimeout(resolve, 100));

    // Add default categories if none exist
    if (db.getCategories().length === 0) {
        const food = new Category(1, "Їжа", "#4CAF50");
        const transport = new Category(2, "Транспорт", "#2196F3");
        const entertainment = new Category(3, "Розваги", "#9C27B0");
        const utilities = new Category(4, "Комунальні", "#FF9800");
        const shopping = new Category(5, "Шопінг", "#E91E63");

        await db.addCategory(food);
        await db.addCategory(transport);
        await db.addCategory(entertainment);
        await db.addCategory(utilities);
        await db.addCategory(shopping);

        console.log(chalk.green("✓ Створено стандартні категорії"));
    }

    // Add sample expenses if none exist
    if (db.getExpenses().length === 0) {
        const categories = db.getCategories();
        
        const sampleExpenses = [
            new Expense(uuidv4(), '2025-10-01', 150, categories[0], "Обід у ресторані"),
            new Expense(uuidv4(), '2025-10-02', 40, categories[1], "Автобус"),
            new Expense(uuidv4(), '2025-10-03', 300, categories[2], "Кіно"),
            new Expense(uuidv4(), '2025-10-04', 1200, categories[3], "Комунальні послуги"),
            new Expense(uuidv4(), '2025-10-05', 500, categories[4], "Одяг"),
            new Expense(uuidv4(), '2025-10-06', 80, categories[0], "Продукти"),
            new Expense(uuidv4(), '2025-10-07', 60, categories[1], "Таксі"),
        ];

        for (const expense of sampleExpenses) {
            await db.saveExpense(expense);
        }

        console.log(chalk.green("✓ Додано зразкові витрати"));
    }

    // Display statistics
    console.log(chalk.yellow.bold("\n--- Статистика ---"));
    
    const allExpenses = db.getExpenses();
    console.log(chalk.white(`Загальна кількість витрат: ${allExpenses.length}`));
    console.log(chalk.white(`Всього витрачено: ${stats.calculateTotal().toFixed(2)} грн`));
    console.log(chalk.white(`Середній чек: ${stats.calculateAverage().toFixed(2)} грн`));

    // Display by category
    console.log(chalk.yellow.bold("\n--- Витрати за категоріями ---"));
    const categories = db.getCategories();
    categories.forEach(category => {
        const total = stats.calculateTotalByCategory(category.id);
        if (total > 0) {
            console.log(chalk.hex(category.color)(`${category.name}: ${total.toFixed(2)} грн`));
        }
    });

    // Monthly spending
    console.log(chalk.yellow.bold("\n--- Помісячні витрати ---"));
    const monthly = stats.getMonthlySpending();
    Object.entries(monthly).forEach(([month, amount]) => {
        console.log(chalk.cyan(`${month}: ${amount.toFixed(2)} грн`));
    });

    // Top categories
    console.log(chalk.yellow.bold("\n--- Топ категорій ---"));
    const topCategories = stats.getTopCategories(3);
    topCategories.forEach((item, index) => {
        console.log(`${index + 1}. ${item.category}: ${item.total.toFixed(2)} грн`);
    });

    // Spending trend
    console.log(chalk.yellow.bold("\n--- Тренд витрат ---"));
    const trend = stats.getSpendingTrend();
    if (trend) {
        Object.entries(trend).forEach(([month, data]) => {
            const changeColor = data.change >= 0 ? chalk.red : chalk.green;
            const changeSymbol = data.change >= 0 ? '↑' : '↓';
            console.log(`${month}: ${data.amount.toFixed(2)} грн (${changeColor(`${changeSymbol} ${Math.abs(data.change)}%`)})`);
        });
    } else {
        console.log(chalk.gray("Недостатньо даних для аналізу тренду"));
    }

    // Display all expenses
    console.log(chalk.yellow.bold("\n--- Всі витрати ---"));
    allExpenses.forEach(expense => {
        console.log(chalk.white(`• ${expense.getInfo()}`));
    });

    console.log(chalk.blue.bold("\n--- SpendWise System Ready ---"));
    console.log(chalk.gray("Дані збережено у: data/expenses.json"));

    // Example of CRUD operations
    console.log(chalk.yellow.bold("\n--- Демонстрація CRUD ---"));
    
    // Create new expense
    const newExpense = new Expense(
        uuidv4(),
        '2025-10-08',
        200,
        categories[0],
        "Нова витрата"
    );
    await db.saveExpense(newExpense);
    console.log(chalk.green("✓ Створено нову витрату"));

    // Update expense
    if (allExpenses.length > 0) {
        await db.updateExpense(allExpenses[0].id, { amount: 999 });
        console.log(chalk.green("✓ Оновлено витрату"));
    }

    // Delete expense
    if (allExpenses.length > 1) {
        await db.deleteExpense(allExpenses[1].id);
        console.log(chalk.green("✓ Видалено витрату"));
    }

    // Final statistics
    console.log(chalk.yellow.bold("\n--- Фінальна статистика ---"));
    console.log(chalk.white(`Загальна сума: ${stats.calculateTotal().toFixed(2)} грн`));
    console.log(chalk.white(`Кількість записів: ${db.getExpenses().length}`));
}

// Run the application
runApplication().catch(error => {
    console.error(chalk.red("Помилка:", error));
});
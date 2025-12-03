class Category {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
    getInfo() {
        return `Категорія: ${this.name}`;
    }
}
module.exports = Category;
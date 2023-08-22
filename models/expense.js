const db = require("../config/db");

class Expense {
  constructor(amount, desc, category) {
    this.amount = amount;
    this.desc = desc;
    this.category = category;
  }

  save() {
    let sql = `INSERT INTO expenses(
      amount,
      description,
      category
    )
    values(
      '${this.amount}',
      '${this.desc}',
      '${this.category}'
    )`;

    return db.execute(sql);
  }

  static fetchAll() {
    let sql = `SELECT * FROM expenses`;
    return db.execute(sql);
  }

  static deleteExpense(id) {
    let sql = `DELETE FROM expenses WHERE id=${id};`;
    return db.execute(sql);
  }
}

module.exports = Expense;

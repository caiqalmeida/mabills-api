const getExpenses = "SELECT * FROM expenses";

const getExpenseById = "SELECT * FROM expenses WHERE id = $1";

const addExpense =
  "INSERT INTO expenses (DATE, CATEGORY, DESCRIPTION, TOTAL_VALUE) VALUES ($1, $2, $3, $4)";

const deleteExpense = "DELETE FROM expenses WHERE id = $1";

const updateExpense =
  "UPDATE expenses SET DATE = $1, CATEGORY = $2, DESCRIPTION = $3, TOTAL_VALUE = $4 WHERE id = $5";

export default {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
